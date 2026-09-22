"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from "firebase/firestore";
import { registrationSchema } from "@/lib/schema";

export async function submitRegistration(data: z.infer<typeof registrationSchema>) {
  try {
    // 1. Server-side validation
    const parsedData = registrationSchema.parse(data);

    // 2. Determine registration type
    const isFree = parsedData.allHaveMuLearn && parsedData.allHaveKarma;
    const registrationType = isFree ? "FREE" : "PAID";

    // 3. Re-verify eligibility rules
    if (isFree) {
      if (parsedData.members.some((m) => !m.muid || m.muid.trim() === "")) {
        return { success: false, error: "MUIDs are required for free registration" };
      }
    } else {
      if (!parsedData.paymentId || parsedData.paymentId.trim() === "") {
        return { success: false, error: "Payment transaction ID is required for paid registration" };
      }
    }

    // ── DEADLINE CHECK ──────────────────────────────────────────────
    const DEADLINE = new Date("2026-09-23T23:59:59+05:30");
    if (new Date() > DEADLINE) {
      return { success: false, error: "DEADLINE_PASSED" };
    }

    // ── TEAM CAP + SEQUENTIAL ID (single read) ───────────────────────
    const MAX_TEAMS = 30;
    let nextIdNum = 101;
    try {
      const allRegs = await getDocs(collection(db, "registrations"));

      // Cap check
      if (allRegs.size >= MAX_TEAMS) {
        return { success: false, error: "CAPACITY_FULL" };
      }

      // Sequential ID: find highest existing PRISM number
      allRegs.forEach((doc) => {
        const rid = doc.data().registrationId as string | undefined;
        if (rid && rid.startsWith("PRISM")) {
          const n = parseInt(rid.replace("PRISM", ""), 10);
          if (!isNaN(n) && n >= 101 && n >= nextIdNum) {
            nextIdNum = n + 1;
          }
        }
      });
    } catch (e) {
      console.warn("Could not read registrations for cap/ID check (Firestore rules may block reads). Proceeding with fallback ID.", e);
      // If reads are blocked by rules, we still allow registration to proceed.
      // nextIdNum stays 101 for the very first registration.
    }
    const regId = `PRISM${nextIdNum}`;

    // 4. Prepare team members documents
    const membersData = parsedData.members.map((m, idx) => ({
      memberNumber: idx + 1,
      role: idx === 0 ? "Team Leader" : `Team Member ${idx + 1}`,
      fullName: m.fullName,
      email: m.email,
      phone: m.phone,
      college: m.college,
      experienceLevel: m.experienceLevel,
      muid: isFree ? m.muid : null,
    }));

    // 5. Save registration document to Firebase Firestore 'registrations' collection
    await addDoc(collection(db, "registrations"), {
      registrationId: regId,
      teamName: parsedData.teamName,
      teamSize: parsedData.teamSize,
      registrationType: registrationType,
      mulearnEligible: parsedData.allHaveMuLearn,
      karmaEligible: parsedData.allHaveKarma,
      domain: parsedData.domain,
      paymentTransactionId: isFree ? null : parsedData.paymentId,
      members: membersData,
      createdAt: serverTimestamp(),
      createdAtIso: new Date().toISOString(),
    });

    return { success: true, registrationId: regId, teamName: parsedData.teamName, registrationType };
  } catch (err: any) {
    console.error("Firebase Registration Error:", err);
    if (err instanceof z.ZodError) {
      return { success: false, error: "Validation failed on the server." };
    }
    return { success: false, error: "Failed to save registration to database. Please check connection." };
  }
}
