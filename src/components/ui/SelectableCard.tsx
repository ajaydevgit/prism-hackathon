import * as React from "react"
import { cn } from "@/lib/utils"

interface SelectableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  selected: boolean;
  title: string;
  description?: string;
}

export function SelectableCard({
  selected,
  title,
  description,
  className,
  ...props
}: SelectableCardProps) {
  return (
    <div
      className={cn(
        "relative cursor-pointer rounded-xl border p-6 transition-all duration-300 ease-in-out hover:-translate-y-1",
        selected
          ? "border-violet-500 bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
          : "border-white/10 bg-[#111116] hover:border-white/30 hover:bg-white/[0.02]",
        className
      )}
      {...props}
    >
      <h4 className={cn("text-xl font-medium", selected ? "text-violet-400" : "text-white")}>
        {title}
      </h4>
      {description && (
        <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
