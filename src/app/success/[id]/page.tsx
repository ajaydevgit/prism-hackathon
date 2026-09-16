import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PrintButton } from "@/components/ui/PrintButton";
import { CheckCircle, MessageCircle } from "lucide-react";
import { EVENT_CONFIG } from "@/config/event";

export const revalidate = 0;

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ t?: string; r?: string }>;
}) {
  const { id } = await params;
  const { t, r } = await searchParams;

  const teamName = t ? decodeURIComponent(t) : "YOUR TEAM";
  const registrationType = r === "FREE" ? "FREE" : "PAID";

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="z-10 bg-[#111116] border border-white/10 rounded-2xl p-8 md:p-12 max-w-lg w-full text-center shadow-2xl flex flex-col items-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Registration Complete</h1>
        <p className="text-neutral-400 mb-8 leading-relaxed">
          Your team has been successfully registered for {EVENT_CONFIG.name}.
        </p>

        <div className="w-full space-y-4 mb-8">
          <div className="p-4 bg-[#0B0B0F] border border-white/5 rounded-lg flex flex-col items-center">
            <span className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Registration ID</span>
            <span className="text-xl font-mono text-violet-400">{id}</span>
          </div>

          <div className="p-4 bg-[#0B0B0F] border border-white/5 rounded-lg flex flex-col items-center">
            <span className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Team Name</span>
            <span className="text-lg text-white font-semibold">{teamName}</span>
          </div>

          <div className="p-4 bg-[#0B0B0F] border border-white/5 rounded-lg flex flex-col items-center">
            <span className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Registration Type</span>
            <span className={`text-lg font-bold ${registrationType === "FREE" ? "text-green-400" : "text-white"}`}>
              {registrationType === "FREE"
                ? "✅ FREE REGISTRATION (μLEARN)"
                : `STANDARD REGISTRATION — ₹${EVENT_CONFIG.registrationFee}`}
            </span>
          </div>
        </div>

        {/* WhatsApp Community Announcement Banner */}
        <div className="w-full p-4 bg-[#0d1f14] border border-emerald-500/30 rounded-xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
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
            className="w-full sm:w-auto px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors text-center inline-flex items-center justify-center gap-1.5 shrink-0"
          >
            Join WhatsApp
          </a>
        </div>

        <div className="w-full flex flex-col gap-3">
          <PrintButton />
          <Button variant="ghost" asChild className="w-full">
            <Link href="/">Back to PRISM</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
