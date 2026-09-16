"use server";

import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { cookies } from "next/headers";

async function checkAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin_auth");
  if (!auth || auth.value !== "true") throw new Error("Unauthorized");
}

export async function getDashboardStats() {
  await checkAuth();

  try {
    const querySnapshot = await getDocs(collection(db, "registrations"));
    let free = 0;
    let paid = 0;
    let members = 0;
    const domains: Record<string, number> = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.registrationType === "FREE") free++;
      else paid++;
      members += Number(data.teamSize || 0);
      if (data.domain) {
        domains[data.domain] = (domains[data.domain] || 0) + 1;
      }
    });

    return {
      total: querySnapshot.size,
      free,
      paid,
      members,
      domains,
    };
  } catch (error) {
    console.error("Firebase getDashboardStats error:", error);
    return { total: 0, free: 0, paid: 0, members: 0, domains: {} };
  }
}

export async function getRegistrations() {
  await checkAuth();

  try {
    const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
    let querySnapshot;
    try {
      querySnapshot = await getDocs(q);
    } catch {
      // Fallback without orderBy in case index is pending
      querySnapshot = await getDocs(collection(db, "registrations"));
    }

    const list: any[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      list.push({
        id: doc.id,
        registration_id: data.registrationId,
        team_name: data.teamName,
        team_size: data.teamSize,
        domain: data.domain,
        registration_type: data.registrationType,
        payment_transaction_id: data.paymentTransactionId,
        created_at: data.createdAtIso || new Date().toISOString(),
      });
    });

    return list;
  } catch (error) {
    console.error("Firebase getRegistrations error:", error);
    return [];
  }
}

export async function getRegistrationDetails(id: string) {
  await checkAuth();

  try {
    const q = query(collection(db, "registrations"), where("registrationId", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    const registration = {
      id: doc.id,
      registration_id: data.registrationId,
      team_name: data.teamName,
      team_size: data.teamSize,
      domain: data.domain,
      registration_type: data.registrationType,
      mulearn_eligible: data.mulearnEligible,
      karma_eligible: data.karmaEligible,
      payment_transaction_id: data.paymentTransactionId,
      created_at: data.createdAtIso || new Date().toISOString(),
    };

    const members = (data.members || []).map((m: any, idx: number) => ({
      id: `${doc.id}-${idx}`,
      role: m.role,
      full_name: m.fullName,
      email: m.email,
      phone: m.phone,
      college: m.college,
      experience_level: m.experienceLevel,
      muid: m.muid,
    }));

    return { registration, members };
  } catch (error) {
    console.error("Firebase getRegistrationDetails error:", error);
    return null;
  }
}
