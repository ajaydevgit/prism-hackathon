import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-700/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed inset-0 z-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 text-center max-w-lg">
        {/* Prism Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.4)]">
            <span className="text-white text-2xl font-black">P</span>
          </div>
        </div>

        {/* 404 */}
        <p className="text-[120px] md:text-[160px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 select-none mb-2">
          404
        </p>

        <h1 className="text-2xl md:text-3xl font-black text-white mb-4">
          Dimension Not Found
        </h1>
        <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-10">
          Looks like you wandered into an unknown dimension. This page doesn&apos;t exist — but PRISM does!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3.5 rounded-full bg-white text-black text-sm font-bold hover:bg-neutral-200 transition-all hover:scale-105"
          >
            Back to PRISM
          </Link>
          <Link
            href="/register"
            className="px-8 py-3.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-bold hover:bg-violet-500/20 transition-all"
          >
            Register Your Team
          </Link>
        </div>
      </div>

      {/* Footer tag */}
      <p className="absolute bottom-8 text-xs text-neutral-700 tracking-widest uppercase">
        PRISM · Through the Dimensions · Hackathon &apos;26
      </p>
    </div>
  );
}
