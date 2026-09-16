"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="w-full py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-sm text-neutral-300 font-medium transition-colors"
    >
      Download / Print Summary
    </button>
  );
}
