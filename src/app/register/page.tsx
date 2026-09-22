"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { registrationSchema, type RegistrationFormData } from "@/lib/schema";
import { EVENT_CONFIG } from "@/config/event";
import { Input } from "@/components/ui/Input";
import { submitRegistration } from "@/app/actions/register";
import { Loader2, CheckCircle2, ChevronRight, ChevronLeft, Shield, Brain, BookOpen, HeartPulse, QrCode, MessageCircle, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "Team Setup", short: "Team" },
  { id: 2, title: "Members", short: "Members" },
  { id: 3, title: "μLEARN", short: "μLEARN" },
  { id: 4, title: "Karma", short: "Karma" },
  { id: 5, title: "Verification", short: "MUIDs" },
  { id: 6, title: "Domain", short: "Domain" },
  { id: 7, title: "Payment", short: "Payment" },
  { id: 8, title: "Review", short: "Review" },
];

const DOMAIN_ICONS: Record<string, React.ReactNode> = {
  "cybersecurity": <Shield className="w-4 h-4" />,
  "mental-health": <Brain className="w-4 h-4" />,
  "education": <BookOpen className="w-4 h-4" />,
  "healthcare": <HeartPulse className="w-4 h-4" />,
};

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
      {children}{required && <span className="text-violet-500 ml-0.5">*</span>}
    </label>
  );
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-7">
      <h2 className="text-xl font-bold text-white">{children}</h2>
      {sub && <p className="text-xs text-neutral-500 mt-1">{sub}</p>}
    </div>
  );
}

function YesNoCard({ selected, title, sub, onClick }: { selected: boolean; title: string; sub: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-left p-4 rounded-xl border transition-all duration-200",
        selected
          ? "border-violet-500 bg-violet-500/10 shadow-[0_0_0_1px_rgb(139,92,246,0.3)]"
          : "border-white/[0.08] bg-[#0f0f14] hover:border-white/20"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
          selected ? "border-violet-500" : "border-neutral-600"
        )}>
          {selected && <div className="w-2 h-2 rounded-full bg-violet-500"></div>}
        </div>
        <div>
          <p className={cn("text-sm font-semibold", selected ? "text-white" : "text-neutral-300")}>{title}</p>
          <p className="text-xs text-neutral-500">{sub}</p>
        </div>
      </div>
    </button>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      teamName: "",
      teamSize: 2,
      members: [
        { fullName: "", email: "", phone: "", college: "", experienceLevel: "Beginner", muid: "" },
        { fullName: "", email: "", phone: "", college: "", experienceLevel: "Beginner", muid: "" },
      ],
      allHaveMuLearn: false,
      allHaveKarma: false,
      domain: "",
      paymentId: "",
      declarations: [false, false, false, false],
    },
    mode: "onChange",
  });

  const { watch, setValue, trigger, formState: { errors } } = form;
  const values = watch();
  const isFree = values.allHaveMuLearn && values.allHaveKarma;

  const getVisibleSteps = () => {
    const base = [1, 2, 3];
    if (values.allHaveMuLearn) {
      base.push(4);
      if (values.allHaveKarma) base.push(5);
    }
    base.push(6, 7, 8);
    return base;
  };

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (currentStep === 1) fieldsToValidate = ["teamName", "teamSize"];
    else if (currentStep === 2) fieldsToValidate = values.members.flatMap((_, i) =>
      [`members.${i}.fullName`, `members.${i}.email`, `members.${i}.phone`, `members.${i}.college`, `members.${i}.experienceLevel`]
    );
    else if (currentStep === 5 && isFree) fieldsToValidate = values.members.map((_, i) => `members.${i}.muid`);
    else if (currentStep === 6) fieldsToValidate = ["domain"];
    else if (currentStep === 7 && !isFree) fieldsToValidate = ["paymentId"];

    const isValid = await trigger(fieldsToValidate as any);
    if (!isValid) return;

    if (currentStep === 3 && !values.allHaveMuLearn) { setCurrentStep(6); return; }
    if (currentStep === 4 && !values.allHaveKarma) { setCurrentStep(6); return; }
    setCurrentStep((p) => p + 1);
  };

  const prevStep = () => {
    if (currentStep === 6) {
      if (!values.allHaveMuLearn) { setCurrentStep(3); return; }
      if (!values.allHaveKarma) { setCurrentStep(4); return; }
      setCurrentStep(5); return;
    }
    setCurrentStep((p) => p - 1);
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      // 15-second timeout to prevent infinite stuck spinner if database is unreachable
      const timeoutPromise = new Promise<{ success: false; error: string }>((_, reject) =>
        setTimeout(() => reject(new Error("Connection timed out. Please verify your Firebase configuration.")), 15000)
      );

      const result = await Promise.race([
        submitRegistration(data),
        timeoutPromise,
      ]) as { success: boolean; registrationId?: string; teamName?: string; registrationType?: string; error?: string };

      if (result.success && result.registrationId) {
        const params = new URLSearchParams({
          t: result.teamName || "",
          r: result.registrationType || "",
        });
        router.push(`/success/${result.registrationId}?${params.toString()}`);
      } else {
        const errMsg = result.error || "Failed to complete registration.";
        if (errMsg === "DEADLINE_PASSED") {
          setSubmitError("⏰ Registration closed! The deadline was September 23, 2026.");
        } else if (errMsg === "CAPACITY_FULL") {
          setSubmitError("🚫 All 30 team slots are filled! Registrations are now closed.");
        } else {
          setSubmitError(errMsg);
        }
      }
    } catch (err: any) {
      console.error("Submission failed:", err);
      setSubmitError(err?.message || "Failed to connect to database. Please check your Firebase setup.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const visibleSteps = getVisibleSteps();
  const currentIdx = visibleSteps.indexOf(currentStep);
  const progress = ((currentIdx + 1) / visibleSteps.length) * 100;

  const renderStep = () => {
    switch (currentStep) {
      // ── STEP 1 ──────────────────────────────────
      case 1: return (
        <motion.div key={1} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          <SectionTitle sub="Give your team a name and choose the number of members.">Team Setup</SectionTitle>

          {/* Deadline & Cap Info Banner */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 flex items-center gap-3 bg-amber-950/20 border border-amber-500/20 rounded-xl px-4 py-3">
              <span className="text-amber-400 text-lg shrink-0">⏰</span>
              <div>
                <p className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Registration Deadline</p>
                <p className="text-xs text-amber-200/80 font-semibold">23 September 2026</p>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-3 bg-violet-950/20 border border-violet-500/20 rounded-xl px-4 py-3">
              <span className="text-violet-400 text-lg shrink-0">🎯</span>
              <div>
                <p className="text-[11px] font-bold text-violet-300 uppercase tracking-wider">Limited Slots</p>
                <p className="text-xs text-violet-200/80 font-semibold">Maximum 30 Teams Only</p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <FieldLabel required>Team Name</FieldLabel>
              <Input {...form.register("teamName")} placeholder="e.g. Neural Ninjas" error={errors.teamName?.message} />
            </div>
            <div>
              <FieldLabel required>Team Size</FieldLabel>
              <div className="grid grid-cols-3 gap-3 mt-1">
                {[2, 3, 4].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setValue("teamSize", size);
                      const m = [...values.members];
                      if (size > m.length) for (let i = m.length; i < size; i++) m.push({ fullName: "", email: "", phone: "", college: "", experienceLevel: "Beginner", muid: "" });
                      else m.length = size;
                      setValue("members", m);
                    }}
                    className={cn(
                      "py-4 rounded-xl border text-sm font-bold transition-all",
                      values.teamSize === size
                        ? "border-violet-500 bg-violet-500/10 text-white shadow-[0_0_0_1px_rgba(139,92,246,0.3)]"
                        : "border-white/[0.08] bg-[#0f0f14] text-neutral-400 hover:border-white/20 hover:text-white"
                    )}
                  >
                    <p className="text-xl font-black text-inherit">{size}</p>
                    <p className="text-[10px] uppercase tracking-widest mt-0.5">Members</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      );

      // ── STEP 2 ──────────────────────────────────
      case 2: return (
        <motion.div key={2} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          <SectionTitle sub="Provide details for all team members.">Team Members</SectionTitle>
          <div className="space-y-5">
            {values.members.map((_, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-white/[0.07] bg-[#0f0f14]">
                <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-4">
                  {idx === 0 ? "Team Leader" : `Member ${idx + 1}`}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <FieldLabel required>Full Name</FieldLabel>
                    <Input {...form.register(`members.${idx}.fullName` as const)} placeholder="Full name" error={errors.members?.[idx]?.fullName?.message} />
                  </div>
                  <div>
                    <FieldLabel required>Email</FieldLabel>
                    <Input type="email" {...form.register(`members.${idx}.email` as const)} placeholder="email@example.com" error={errors.members?.[idx]?.email?.message} />
                  </div>
                  <div>
                    <FieldLabel required>Phone</FieldLabel>
                    <Input {...form.register(`members.${idx}.phone` as const)} placeholder="+91 98765 43210" error={errors.members?.[idx]?.phone?.message} />
                  </div>
                  <div>
                    <FieldLabel required>College / Institution</FieldLabel>
                    <Input {...form.register(`members.${idx}.college` as const)} placeholder="College name" error={errors.members?.[idx]?.college?.message} />
                  </div>
                  <div className="sm:col-span-2">
                    <FieldLabel required>Experience Level</FieldLabel>
                    <select
                      {...form.register(`members.${idx}.experienceLevel` as const)}
                      className="w-full h-11 rounded-md border border-white/10 bg-[#0B0B0F] px-3 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      );

      // ── STEP 3 ──────────────────────────────────
      case 3: return (
        <motion.div key={3} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          <SectionTitle sub="This applies to your entire team.">μLEARN Eligibility</SectionTitle>
          <p className="text-sm text-neutral-300 mb-5">Do <strong>ALL</strong> team members have a μLEARN account?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <YesNoCard selected={values.allHaveMuLearn === true} title="Yes, all have μLEARN" sub="Everyone has an active μLEARN account" onClick={() => setValue("allHaveMuLearn", true)} />
            <YesNoCard selected={values.allHaveMuLearn === false} title="No, not all" sub="At least one member doesn't have μLEARN" onClick={() => setValue("allHaveMuLearn", false)} />
          </div>
        </motion.div>
      );

      // ── STEP 4 ──────────────────────────────────
      case 4: return (
        <motion.div key={4} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          <SectionTitle sub="Minimum 12,000 Karma required for free registration.">Karma Eligibility</SectionTitle>
          <p className="text-sm text-neutral-300 mb-5">Do <strong>ALL</strong> team members have 12,000+ μLEARN Karma?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <YesNoCard selected={values.allHaveKarma === true} title="Yes, 12,000+ Karma" sub="All members meet the threshold" onClick={() => setValue("allHaveKarma", true)} />
            <YesNoCard selected={values.allHaveKarma === false} title="No, below threshold" sub="At least one member is below 12,000" onClick={() => setValue("allHaveKarma", false)} />
          </div>
          {values.allHaveKarma === true && (
            <div className="mt-4 p-3.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span><strong>Exclusive perk unlocked!</strong> Your team qualifies for FREE Registration. Verify your MUIDs next.</span>
            </div>
          )}
        </motion.div>
      );

      // ── STEP 5 ──────────────────────────────────
      case 5: return (
        <motion.div key={5} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          <SectionTitle sub="Your MUIDs will be verified by the organizers.">μLEARN Verification</SectionTitle>
          <div className="space-y-3">
            {values.members.map((m, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-[#0f0f14] border border-white/[0.07]">
                <div className="w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <span className="text-violet-400 text-xs font-bold">{idx + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">{idx === 0 ? "Leader" : `Member ${idx + 1}`}</p>
                  <p className="text-xs text-neutral-400 truncate">{m.fullName || "—"}</p>
                </div>
                <div className="flex-1">
                  <Input placeholder="Enter MUID" {...form.register(`members.${idx}.muid` as const)} error={errors.members?.[idx]?.muid?.message} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      );

      // ── STEP 6 ──────────────────────────────────
      case 6: return (
        <motion.div key={6} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          <SectionTitle sub="Select one primary domain for your team's project.">Problem Domain</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EVENT_CONFIG.domains.map((domain) => (
              <button
                key={domain.id}
                type="button"
                onClick={() => setValue("domain", domain.name)}
                className={cn(
                  "text-left p-4 rounded-xl border transition-all duration-200",
                  values.domain === domain.name
                    ? "border-violet-500 bg-violet-500/10 shadow-[0_0_0_1px_rgba(139,92,246,0.3)]"
                    : "border-white/[0.08] bg-[#0f0f14] hover:border-white/20"
                )}
              >
                <div className={cn("p-2 rounded-lg w-fit mb-2.5", values.domain === domain.name ? "bg-violet-500/20 text-violet-400" : "bg-white/5 text-neutral-500")}>
                  {DOMAIN_ICONS[domain.id]}
                </div>
                <p className={cn("text-sm font-bold mb-1", values.domain === domain.name ? "text-white" : "text-neutral-300")}>{domain.name}</p>
                <p className="text-xs text-neutral-500 leading-relaxed">{domain.description}</p>
              </button>
            ))}
          </div>
          {errors.domain && <p className="text-red-400 text-xs mt-3">{errors.domain.message}</p>}
        </motion.div>
      );

      // ── STEP 7 ──────────────────────────────────
      case 7: return (
        <motion.div key={7} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          <SectionTitle>{isFree ? "Free Registration" : "Standard Registration"}</SectionTitle>
          {isFree ? (
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-green-300">μLEARN Eligibility Verified</p>
                  <p className="text-xs text-green-500/80 mt-0.5">Your team qualifies for free registration. No payment required.</p>
                </div>
              </div>
              <div className="p-5 rounded-xl bg-[#0f0f14] border border-white/[0.07]">
                <p className="text-3xl font-black text-white">₹0</p>
                <p className="text-xs text-neutral-500 mt-1">μLEARN AEC exclusive perk — all members verified with 12,000+ Karma</p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#0f0f14] border border-white/[0.07] flex items-center justify-between">
                <div>
                  <p className="text-2xl font-black text-white">₹200 <span className="text-xs font-normal text-neutral-500">/ team</span></p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Standard Registration Fee</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-bold tracking-wider uppercase">
                  UPI Payment
                </div>
              </div>

              {/* QR Code Scanner Card */}
              <div className="p-5 rounded-2xl bg-[#0e0e14] border border-white/10 text-center flex flex-col items-center">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-violet-400 uppercase tracking-wider mb-3">
                  <QrCode className="w-4 h-4" />
                  Scan QR with any UPI App
                </div>

                <div className="p-3 bg-white rounded-2xl shadow-xl shadow-violet-950/20 border border-neutral-200">
                  <img
                    src="/payment-qr.jpg"
                    alt="PRISM Hackathon UPI QR Code"
                    className="w-[220px] h-[220px] rounded-lg object-contain block mx-auto"
                  />
                </div>

                <p className="text-xs text-neutral-400 mt-3 font-medium">
                  Scan via GPay, PhonePe, Paytm or any UPI App to pay <strong className="text-white">₹200</strong>
                </p>

                <div className="mt-4 w-full flex items-center justify-between bg-[#050505] rounded-xl px-4 py-2.5 border border-white/5">
                  <span className="text-[11px] text-neutral-500 font-medium">UPI ID</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-neutral-300">Google Pay UPI</span>
                    <button
                      type="button"
                      onClick={() => alert("Please scan the QR code above using your UPI app.")}
                      className="text-[10px] font-bold text-violet-400 hover:text-violet-300 uppercase tracking-wider"
                    >
                      Scan QR
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <FieldLabel required>Transaction / UTR Reference ID</FieldLabel>
                <Input {...form.register("paymentId")} placeholder="Enter 12-digit UTR / Reference number" error={errors.paymentId?.message} />
                <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                  After paying ₹200 via the QR code, copy the 12-digit UTR / Reference ID from your UPI app transaction receipt and paste it here.
                </p>
              </div>

              {/* WhatsApp Callout after Payment */}
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-neutral-300">Join the official WhatsApp group for announcements</span>
                </div>
                <a
                  href="https://chat.whatsapp.com/ECg5GigsLaFGz21WMASu37"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 whitespace-nowrap"
                >
                  Join Link →
                </a>
              </div>
            </div>
          )}
        </motion.div>
      );

      // ── STEP 8 ──────────────────────────────────
      case 8: return (
        <motion.div key={8} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          <SectionTitle sub="Verify everything before you submit.">Final Review</SectionTitle>
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-[#0f0f14] border border-white/[0.07]">
                <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-1">Team</p>
                <p className="text-sm font-bold text-white">{values.teamName}</p>
                <p className="text-xs text-neutral-500">{values.teamSize} members</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0f0f14] border border-white/[0.07]">
                <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-1">Domain</p>
                <p className="text-sm font-bold text-violet-400">{values.domain}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0f0f14] border border-white/[0.07]">
                <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-1">Registration</p>
                <p className={cn("text-sm font-bold", isFree ? "text-green-400" : "text-white")}>{isFree ? "FREE" : "₹200"}</p>
                <p className="text-xs text-neutral-500">{isFree ? "μLEARN verified" : values.paymentId ? `Txn: ${values.paymentId}` : "Paid"}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0f0f14] border border-white/[0.07]">
                <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-1">μLEARN</p>
                <p className="text-sm font-bold text-white">{values.allHaveMuLearn ? "All have" : "Not all"}</p>
                <p className="text-xs text-neutral-500">{values.allHaveKarma ? "12k+ Karma ✓" : "—"}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#0f0f14] border border-white/[0.07]">
              <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-3">Members</p>
              <div className="space-y-2">
                {values.members.map((m, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/[0.05] last:border-0">
                    <div>
                      <p className="text-xs font-semibold text-white">{m.fullName || "—"}</p>
                      <p className="text-[10px] text-neutral-600">{m.college}</p>
                    </div>
                    {isFree && m.muid && <p className="text-[10px] font-mono text-violet-400">{m.muid}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WhatsApp Group Announcement Banner */}
          <div className="p-4 rounded-xl bg-[#0d1f14] border border-emerald-500/30 mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-300">Official PRISM WhatsApp Community</p>
                <p className="text-[11px] text-neutral-400">Join for live notifications, hackathon schedules, and team updates.</p>
                <p className="text-[10px] text-emerald-500/80 italic mt-0.5">This is the official group for participants only.</p>
              </div>
            </div>
            <a
              href="https://chat.whatsapp.com/ECg5GigsLaFGz21WMASu37"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
            >
              Join WhatsApp
            </a>
          </div>

          {/* Guidelines Reminder */}
          <div className="p-4 rounded-xl bg-violet-950/30 border border-violet-500/20 mb-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 mt-0.5">
                <ScrollText className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-violet-300 mb-0.5">Official Hackathon Guidelines</p>
                <p className="text-[11px] text-neutral-400 leading-relaxed">Please read and understand all rules before submitting. By checking the box below, you confirm you have read and agree to the official guidelines.</p>
                <a
                  href="/guidelines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Read Full Guidelines →
                </a>
              </div>
            </div>
          </div>

          {/* Declarations */}
          <div className="mb-5">
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3">Consent & Declarations</p>
            <div className="rounded-xl border border-white/5 bg-[#0a0a10] overflow-hidden divide-y divide-white/5">
              {[
                { id: 0, text: "I confirm all team information submitted is accurate." },
                { id: 1, text: "I confirm the μLEARN information and MUIDs are accurate." },
                { id: 2, text: "I understand μLEARN eligibility may be verified by organizers." },
                { id: 3, text: <> I have read and agree to the <a href="/guidelines" target="_blank" className="text-violet-400 hover:underline font-semibold">Official Guidelines</a> of {EVENT_CONFIG.name}.</> },
              ].map((decl) => (
                <label key={decl.id} className="flex items-center gap-4 px-4 py-3.5 cursor-pointer group hover:bg-white/[0.02] transition-colors">
                  <div className="relative shrink-0">
                    <input
                      type="checkbox"
                      {...form.register(`declarations.${decl.id}` as const)}
                      className="peer appearance-none w-5 h-5 rounded border border-white/20 bg-[#0B0B0F] checked:bg-violet-600 checked:border-violet-500 transition-colors cursor-pointer"
                    />
                    <svg className="absolute top-1 left-1 w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors leading-relaxed">{decl.text}</span>
                </label>
              ))}
            </div>
          </div>
          {errors.declarations && <p className="text-red-400 text-xs mt-1">{errors.declarations.message}</p>}
          {submitError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs mt-3">{submitError}</div>
          )}
        </motion.div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 z-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-700/10 blur-[100px] pointer-events-none z-0" />

      {/* Navbar */}
      <header className="w-full px-8 py-5 flex justify-between items-center z-30 sticky top-0 backdrop-blur-lg bg-[#050505]/70 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
            <span className="text-white text-[10px] font-black">P</span>
          </div>
          <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase hover:text-white transition-colors">PRISM</span>
        </Link>
        <div className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest text-right leading-relaxed">
          PRISM · Through the Dimensions <br />
          <span className="text-neutral-700">Hackathon '26 Registration</span>
        </div>
      </header>

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
        {/* Left: Progress sidebar */}
        <aside className="lg:w-52 shrink-0">
          <div className="lg:sticky lg:top-24">
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
              {visibleSteps.map((s, i) => (
                <div key={s} className={cn("flex items-center gap-2 shrink-0")}>
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all shrink-0",
                    s === currentStep ? "bg-violet-600 border-violet-500 text-white" :
                    s < currentStep ? "bg-violet-500/20 border-violet-500/40 text-violet-400" :
                    "bg-transparent border-white/10 text-neutral-600"
                  )}>
                    {s < currentStep ? "✓" : i + 1}
                  </div>
                  <span className={cn("text-xs font-medium hidden lg:block transition-colors", s === currentStep ? "text-white" : s < currentStep ? "text-neutral-500" : "text-neutral-700")}>
                    {STEPS[s - 1].title}
                  </span>
                </div>
              ))}
            </div>
            {/* Progress bar on desktop */}
            <div className="hidden lg:block mt-6">
              <div className="h-0.5 bg-white/5 rounded-full">
                <div className="h-0.5 bg-violet-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-[10px] text-neutral-600 mt-2">{Math.round(progress)}% complete</p>
            </div>
          </div>
        </aside>

        {/* Right: Form card */}
        <div className="flex-1 min-w-0">
          <div className="p-6 md:p-8 rounded-2xl bg-[#0f0f14] border border-white/[0.07]">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>

              {/* Nav buttons */}
              <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/[0.07]">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-white transition-colors disabled:opacity-40"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Back
                  </button>
                ) : <div />}

                {currentStep < 8 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={isSubmitting}
                    className="flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-colors disabled:opacity-40"
                  >
                    Continue <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 text-sm font-bold px-7 py-3 rounded-full bg-white text-black hover:bg-neutral-100 transition-colors disabled:opacity-40 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                  >
                    {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : "Submit Registration"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
