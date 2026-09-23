"use client";

import Link from "next/link";
import { EVENT_CONFIG } from "@/config/event";
import { ArrowUpRight, ArrowRight, Shield, Brain, BookOpen, HeartPulse, Sparkles, CheckCircle2, Clock, Users, Trophy, Phone, Mail, MapPin, MessageCircle, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import HeroCanvas from "@/components/3d/HeroCanvas";
import { ScrollReveal, ParallaxSection } from "@/components/ui/ScrollReveal";

const ORGANIZERS = [
  { 
    name: "μLEARN AEC", 
    tag: "Coordinator", 
    desc: "A vibrant peer-to-peer student tech culture at AEC driving grassroots learning, discovery, hackathons, and real tech career trajectories.",
    symbol: "μ"
  },
  { 
    name: "IEDC AEC", 
    tag: "Coordinator", 
    desc: "Innovation and Entrepreneurship Development Centre at AEC nurturing budding founders, startup ideation, and disruptive ventures.",
    symbol: "I"
  },
  { 
    name: "IEEE AEC", 
    tag: "Coordinator", 
    desc: "The IEEE student branch at AEC fostering global technological standards, engineering rigor, and groundbreaking innovation.",
    symbol: "E"
  },
];

const ENQUIRIES = [
  {
    name: "Dr. Shihabudeen H",
    role: "Faculty Coordinator",
    phone: "+91 94002 68086",
    callUrl: "tel:+919400268086",
  },
  {
    name: "Ajaydev A",
    role: "Student Coordinator",
    phone: "+91 98953 44059",
    callUrl: "tel:+919895344059",
  },
  {
    name: "Jeevan Abhilash",
    role: "Student Coordinator",
    phone: "+91 94978 67771",
    callUrl: "tel:+9497867771",
  },
  {
    name: "Abin V J",
    role: "Student Coordinator",
    phone: "+91 70122 19519",
    callUrl: "tel:+917012219519",
  },
  {
    name: "Kripa Mathew",
    role: "Student Coordinator",
    phone: "+91 81295 00411",
    callUrl: "tel:+918129500411",
  },
];

const DOMAIN_ICONS: Record<string, React.ReactNode> = {
  "cybersecurity": <Shield className="w-8 h-8" />,
  "mental-health": <Brain className="w-8 h-8" />,
  "education": <BookOpen className="w-8 h-8" />,
  "healthcare": <HeartPulse className="w-8 h-8" />,
};

export default function Home() {
  const isClosed = true; // Hardcoded to FORCE close registrations

  return (
    <main className="min-h-screen flex flex-col relative bg-[#050505] selection:bg-violet-500/30">

      {/* Futuristic grid background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Global glows */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-violet-700/10 rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* ═══════════════════════════════ NAVBAR ═══════════════════════════════ */}
      <header className="w-full px-8 py-5 flex justify-between items-center z-40 sticky top-0 backdrop-blur-xl bg-[#050505]/75 border-b border-white/5 transition-all">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 via-purple-600 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <span className="text-white text-xs font-black tracking-tighter">P</span>
          </div>
          <div>
            <span className="text-sm font-black tracking-widest text-white uppercase block">PRISM</span>
            <span className="text-[9px] tracking-widest text-neutral-500 uppercase block font-semibold">Hackathon '26</span>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
          <Link href="#about" className="hover:text-white transition-colors">About</Link>
          <Link href="#domains" className="hover:text-white transition-colors">Domains</Link>
          <Link href="#guidelines" className="hover:text-violet-400 text-violet-300 transition-colors">Guidelines</Link>
          <Link href="#organizers" className="hover:text-white transition-colors">Coordinators</Link>
          <Link href="#enquiries" className="hover:text-white transition-colors">Enquiries</Link>
          <Link href="#register" className="hover:text-white transition-colors">Register</Link>
        </nav>
        {isClosed ? (
          <div className="flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-full bg-neutral-800 text-neutral-400 cursor-not-allowed">
            Closed
          </div>
        ) : (
          <Link
            href="/register"
            className="flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-all shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:scale-105"
          >
            Register Team
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </header>

      {/* ═══════════════════════════════ HERO SECTION (ENLARGED) ═══════════════════════════════ */}
      <section className="relative z-10 flex items-center min-h-[105vh] py-20 px-8 md:px-16 max-w-[1440px] mx-auto w-full">
        {/* Left — text */}
        <div className="flex-1 max-w-2xl py-12">
          <ScrollReveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping"></span>
              <span className="text-violet-300 text-xs font-semibold tracking-widest uppercase">
                AEC Flagship Hackathon · Tech for Tomorrow
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.2}>
            <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tight leading-[0.85] text-white mb-4">
              PRISM
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-neutral-200 to-blue-300 uppercase mb-8">
              Through the Dimensions
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl mb-12">
              A premier 24-hour intercollegiate hackathon exploring next-generation technological solutions across cybersecurity, mental health, education, and healthcare. Built for creators, visionaries, and engineers.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-14">
              {isClosed ? (
                <div className="flex items-center justify-center gap-2.5 bg-neutral-800 text-neutral-400 px-8 py-4 rounded-full font-bold text-sm cursor-not-allowed">
                  Registrations Closed
                </div>
              ) : (
                <Link
                  href="/register"
                  className="flex items-center justify-center gap-2.5 bg-white text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-neutral-200 transition-all hover:scale-105 shadow-[0_0_35px_rgba(255,255,255,0.25)]"
                >
                  Register Your Team
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
              <Link
                href="#about"
                className="flex items-center justify-center gap-2 text-white px-8 py-4 rounded-full font-semibold text-sm border border-white/15 hover:bg-white/5 transition-all hover:border-white/30"
              >
                Explore Hackathon
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/guidelines"
                className="flex items-center justify-center gap-2 text-violet-300 px-8 py-4 rounded-full font-semibold text-sm border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 transition-all"
              >
                <ScrollText className="w-4 h-4" />
                Guidelines
              </Link>
            </div>
          </ScrollReveal>

          {/* Equal Coordinators Pill List */}
          <ScrollReveal direction="up" delay={0.5}>
            <div className="flex items-center gap-3 flex-wrap pt-4 border-t border-white/5">
              <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">Coordinated equally by:</span>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 font-bold tracking-wide">
                  μLEARN AEC
                </span>
                <span className="text-xs px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 font-bold tracking-wide">
                  IEDC AEC
                </span>
                <span className="text-xs px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-bold tracking-wide">
                  IEEE AEC
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right — Interactive 3D Setup */}
        <div className="hidden lg:block flex-1 h-[750px] relative">
          <HeroCanvas />
          {/* Ambient interactive floating badges */}
          <div className="absolute top-12 right-6 px-5 py-3.5 rounded-2xl bg-[#111116]/85 border border-white/10 backdrop-blur-md text-center shadow-2xl transition-transform hover:-translate-y-1">
            <p className="text-xl font-black text-emerald-400">AEC CAMPUS</p>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold mt-0.5">Physical Venue</p>
          </div>
          <div className="absolute bottom-28 left-4 px-5 py-3.5 rounded-2xl bg-[#111116]/85 border border-white/10 backdrop-blur-md text-center shadow-2xl transition-transform hover:-translate-y-1">
            <p className="text-xl font-black text-violet-400">TECH FOR TOMORROW</p>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold mt-0.5">Official Theme</p>
          </div>
          <div className="absolute bottom-12 right-10 px-5 py-3.5 rounded-2xl bg-[#111116]/85 border border-white/10 backdrop-blur-md text-center shadow-2xl transition-transform hover:-translate-y-1">
            <p className="text-3xl font-black text-white">24H</p>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold mt-0.5">Hackathon Duration</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ ABOUT SECTION (ENLARGED) ═══════════════════════════════ */}
      <section id="about" className="relative z-10 min-h-[90vh] flex items-center py-32 px-8 md:px-16 border-t border-white/5 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal direction="left">
              <div>
                <div className="inline-flex items-center gap-2 text-violet-400 text-[11px] font-bold tracking-[0.25em] uppercase mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  About PRISM
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-2">
                  PRISM
                </h2>
                <p className="text-base font-light tracking-[0.2em] text-neutral-400 uppercase mb-8">
                  Through the Dimensions — Hackathon '26
                </p>
                <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-6">
                  PRISM represents the dispersion of raw technological intellect into breakthrough spectrums of impact. It is a high-octane 24-hour sprint engineered to inspire college builders to tackle urgent real-world problems.
                </p>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  Jointly and equally coordinated by <strong className="text-white">μLEARN AEC</strong>, <strong className="text-white">IEDC AEC</strong>, and <strong className="text-white">IEEE AEC</strong>, PRISM bridges cutting-edge development with actionable industry relevance. Standard entry is ₹200 per team.
                </p>

                {/* Exclusive Free Perk Highlight Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/40 via-purple-950/30 to-blue-950/20 border border-violet-500/30 mb-8 backdrop-blur-sm shadow-xl">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0 text-violet-300 font-bold text-sm">
                      μ
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black text-violet-300 uppercase tracking-wider">Special Community Perk</span>
                        <span className="text-[10px] font-bold bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-500/30">100% FREE</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        Teams where <strong className="text-white">all members have a μLEARN account with 12,000+ Karma</strong> qualify for <strong className="text-violet-300">completely free registration (₹0)</strong>. Verified directly via MUIDs during registration!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  {isClosed ? (
                    <div className="inline-flex items-center gap-2 text-xs font-bold px-7 py-3.5 rounded-full bg-neutral-800 text-neutral-400 cursor-not-allowed">
                      Registrations Closed
                    </div>
                  ) : (
                    <Link
                      href="/register"
                      className="inline-flex items-center gap-2 text-xs font-bold px-7 py-3.5 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-all shadow-lg shadow-violet-950/50 hover:scale-105"
                    >
                      Register Your Team — ₹200
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: <MapPin className="w-5 h-5 text-emerald-400" />, label: "Venue", value: "AEC Campus", sub: "Offline physical hackathon" },
                  { icon: <Clock className="w-5 h-5 text-blue-400" />, label: "Duration", value: "24 Hours", sub: "Intense non-stop hackathon" },
                  { icon: <Users className="w-5 h-5 text-violet-400" />, label: "Team Size", value: "2 – 4", sub: "Collaborative squads per team" },
                  { icon: <Trophy className="w-5 h-5 text-purple-400" />, label: "Registration Fee", value: "₹200", sub: "Standard fee · μLearn 12k+ Karma gets Free" },
                ].map((stat) => (
                  <div 
                    key={stat.label} 
                    className="p-8 rounded-3xl bg-[#0e0e13] border border-white/[0.08] hover:border-violet-500/40 hover:bg-[#12121a] transition-all duration-300 group shadow-lg"
                  >
                    <div className="mb-4 p-3 rounded-xl bg-white/[0.04] w-fit border border-white/5 group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <p className="text-3xl md:text-4xl font-black text-white mb-1.5">{stat.value}</p>
                    <p className="text-[11px] text-neutral-400 uppercase tracking-widest font-bold">{stat.label}</p>
                    <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ DOMAINS SECTION (ENLARGED) ═══════════════════════════════ */}
      <section id="domains" className="relative z-10 min-h-[100vh] flex flex-col justify-center py-32 px-8 md:px-16 bg-[#0B0B0F]/70 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto w-full">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <p className="text-[11px] font-bold text-violet-400 tracking-[0.25em] uppercase mb-3">Dimensions of Innovation</p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Hackathon Domains</h2>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                Teams choose one domain to craft their solution. Each domain represents critical frontier challenges shaping the world of tomorrow.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EVENT_CONFIG.domains.map((domain, index) => (
              <ScrollReveal key={domain.id} direction={index % 2 === 0 ? "left" : "right"} delay={index * 0.15}>
                <div
                  className="group p-10 rounded-3xl border border-white/[0.08] bg-[#0f0f14]/90 hover:border-violet-500/50 hover:bg-[#13131c] transition-all duration-500 backdrop-blur-md relative overflow-hidden shadow-2xl"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-violet-600/5 rounded-full blur-3xl group-hover:bg-violet-600/20 transition-all pointer-events-none" />
                  <div className="flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all duration-300 shrink-0">
                      {DOMAIN_ICONS[domain.id]}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase block mb-1">
                        Domain 0{index + 1}
                      </span>
                      <h3 className="text-2xl font-black text-white group-hover:text-violet-300 transition-colors mb-3">
                        {domain.name}
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {domain.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ GUIDELINES SECTION ═══════════════════════════════ */}
      <section id="guidelines" className="relative z-10 py-32 px-8 md:px-16 border-t border-white/5 bg-gradient-to-b from-[#0B0B0F]/70 to-[#050505]">
        <div className="max-w-[1400px] mx-auto w-full">
          <ScrollReveal direction="up">
            <div className="bg-[#0e0e13] border border-white/10 rounded-3xl p-10 md:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
              {/* Background elements */}
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 text-violet-400 text-[11px] font-bold tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10">
                  <ScrollText className="w-3.5 h-3.5" />
                  Rulebook
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Official Hackathon Guidelines</h2>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8">
                  Before registering your team, please review the official rules, judging criteria, and schedule. Understand the requirements for team composition, project eligibility, and ethical conduct.
                </p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300 bg-white/5 px-4 py-2.5 rounded-lg border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ₹6,000 Prize Pool
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300 bg-white/5 px-4 py-2.5 rounded-lg border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Judging Criteria
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300 bg-white/5 px-4 py-2.5 rounded-lg border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Full Schedule
                  </div>
                </div>
              </div>

              <div className="relative z-10 shrink-0">
                <Link href="/guidelines" className="group flex flex-col items-center justify-center w-48 h-48 md:w-56 md:h-56 rounded-full bg-violet-600/10 border border-violet-500/30 hover:bg-violet-600 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(139,92,246,0.15)]">
                  <ScrollText className="w-10 h-10 md:w-12 md:h-12 text-violet-300 group-hover:text-white mb-3 transition-colors" />
                  <span className="text-xs md:text-sm font-bold text-violet-200 group-hover:text-white uppercase tracking-widest text-center px-4">
                    Read Full<br />Guidelines
                  </span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════ EQUAL COORDINATORS (ENLARGED) ═══════════════════════════════ */}
      <section id="organizers" className="relative z-10 min-h-[95vh] flex flex-col justify-center py-32 px-8 md:px-16 border-t border-white/5 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto w-full">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <p className="text-[11px] font-bold text-violet-400 tracking-[0.25em] uppercase mb-3">United Front</p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Coordinating Communities</h2>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                PRISM is co-engineered equally by the premier student communities at AEC, combining technical leadership, peer learning, and entrepreneurial empowerment.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ORGANIZERS.map((org, index) => (
              <ScrollReveal key={org.name} direction="up" delay={index * 0.2}>
                <div className="p-10 rounded-3xl bg-[#0e0e13] border border-white/[0.08] hover:border-violet-500/40 hover:bg-[#12121b] transition-all duration-500 text-left h-full flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-neutral-800 font-black text-6xl select-none group-hover:text-violet-900/30 transition-colors">
                    {org.symbol}
                  </div>
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-700 to-blue-600 flex items-center justify-center mb-8 shadow-lg shadow-violet-950/50">
                      <span className="text-white font-black text-xl">{org.symbol}</span>
                    </div>
                    <span className="text-[10px] text-violet-400 font-extrabold uppercase tracking-widest block mb-2">{org.tag}</span>
                    <h3 className="text-2xl font-black text-white mb-4">{org.name}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-6">{org.desc}</p>
                  </div>
                  <div className="pt-6 border-t border-white/5 flex items-center gap-2 text-xs text-neutral-500 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-violet-400" />
                    <span>Official Coordinator</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ ENQUIRIES & CONTACT SECTION ═══════════════════════════════ */}
      <section id="enquiries" className="relative z-10 min-h-[85vh] flex flex-col justify-center py-32 px-8 md:px-16 border-t border-white/5 bg-[#08080c]">
        <div className="max-w-[1400px] mx-auto w-full">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[11px] font-bold text-violet-400 tracking-[0.25em] uppercase mb-3">Get In Touch</p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Enquiries & Contacts</h2>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                Have questions about registration, rules, problem statements, or accommodation? Reach out directly to our faculty and student coordinators.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENQUIRIES.map((contact, index) => (
              <ScrollReveal key={contact.name} direction="up" delay={index * 0.1}>
                <div className="p-8 rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-violet-500/40 hover:bg-[#12121c] transition-all duration-300 group shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-violet-400 tracking-wider uppercase bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">
                        {contact.role}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-neutral-400 group-hover:text-violet-400 transition-colors">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-white group-hover:text-violet-200 transition-colors mb-2">
                      {contact.name}
                    </h3>
                  </div>
                  <div className="pt-6 border-t border-white/5 mt-4">
                    <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest mb-1.5">Direct Line</p>
                    <a
                      href={contact.callUrl}
                      className="inline-flex items-center gap-2 text-sm md:text-base font-bold text-white hover:text-violet-400 transition-colors font-mono"
                    >
                      <Phone className="w-3.5 h-3.5 text-violet-400" />
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════ REGISTRATION CTA SECTION (ENLARGED) ═══════════════════════════════ */}
      <section id="register" className="relative z-10 min-h-[90vh] flex flex-col justify-center items-center py-36 px-8 border-t border-white/5 overflow-hidden bg-gradient-to-b from-[#050505] via-violet-950/20 to-[#050505]">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal direction="up">
            <div className={`inline-flex items-center gap-2 ${isClosed ? 'text-red-400 bg-red-500/10 border-red-500/20' : 'text-violet-400 bg-violet-500/10 border-violet-500/20'} text-[11px] font-bold tracking-[0.25em] uppercase mb-5 px-4 py-1.5 rounded-full border`}>
              {isClosed ? "Registrations Closed" : "Registrations Open"}
            </div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-3 tracking-tight">PRISM</h2>
            <p className="text-lg md:text-xl font-light tracking-[0.25em] text-neutral-400 uppercase mb-8">
              Through the Dimensions — '26
            </p>
            <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Ready to break the dimensions? Secure your team's slot now for <strong className="text-white font-bold">₹200 per team</strong>. μLEARN AEC members with 12,000+ Karma receive an exclusive free registration perk.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5 items-center">
              {isClosed ? (
                <Button size="lg" disabled className="px-12 h-16 text-base rounded-full font-bold bg-neutral-800 text-neutral-400 cursor-not-allowed">
                  All Slots Filled
                </Button>
              ) : (
                <Button size="lg" variant="primary" asChild className="px-12 h-16 text-base rounded-full font-bold shadow-[0_0_50px_rgba(139,92,246,0.4)] hover:scale-105 transition-all">
                  <Link href="/register">Register Your Team — ₹200</Link>
                </Button>
              )}
              <Link
                href="/guidelines"
                className="flex items-center justify-center gap-2 text-white h-16 px-10 rounded-full font-semibold text-sm border border-white/15 hover:bg-white/5 transition-all hover:border-white/30"
              >
                <ScrollText className="w-5 h-5" />
                Read Guidelines
              </Link>
            </div>
            <p className="mt-8 text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
              Standard ₹200 registration applies to all teams. μLEARN Karma verification is performed directly during registration.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════ FOOTER ═══════════════════════════════ */}
      <footer className="py-12 px-8 md:px-16 border-t border-white/5 relative z-10 bg-[#030304]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
              <span className="text-white text-[11px] font-black">P</span>
            </div>
            <div>
              <span className="text-xs font-black tracking-widest text-white uppercase block">PRISM '26</span>
              <span className="text-[10px] text-neutral-500 tracking-wider">Through the Dimensions</span>
            </div>
          </div>
          <p className="text-xs text-neutral-600 text-center">
            © 2026 PRISM Hackathon · Jointly and Equally Coordinated by μLEARN AEC, IEDC AEC & IEEE AEC
          </p>
          <div className="flex gap-6 text-xs text-neutral-400 font-semibold tracking-wide">
            <Link href="/guidelines" className="text-violet-400 hover:text-violet-300 transition-colors">Guidelines</Link>
            <span className="hover:text-white transition-colors cursor-pointer">μLEARN AEC</span>
            <span className="hover:text-white transition-colors cursor-pointer">IEDC AEC</span>
            <span className="hover:text-white transition-colors cursor-pointer">IEEE AEC</span>
          </div>
        </div>
      </footer>
    </main>
  );
}