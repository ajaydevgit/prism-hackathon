"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PrismCanvas = dynamic(() => import("./PrismCanvas"), { ssr: false });

export default function HeroCanvas() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full h-full">
      <PrismCanvas scrollY={scrollY} />
    </div>
  );
}
