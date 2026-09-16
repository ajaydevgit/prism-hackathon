import Link from "next/link";
import { ArrowLeft, ScrollText, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Guidelines | PRISM Hackathon '26",
  description: "Official guidelines and rules for PRISM: Through the Dimensions Hackathon '26.",
};

export default function GuidelinesPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-neutral-300 selection:bg-violet-500/30">
      
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24">
        
        {/* Header */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-neutral-500 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <ScrollText className="w-3.5 h-3.5" />
            Official Rulebook
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
            PRISM: THROUGH THE DIMENSIONS
          </h1>
          <p className="text-xl text-neutral-400 font-light tracking-wide">
            Hackathon '26 Official Guidelines
          </p>
        </div>

        {/* Quick Facts */}
        <div className="bg-[#0f0f14] border border-white/5 rounded-2xl p-6 md:p-8 mb-16 shadow-xl">
          <h2 className="text-sm font-bold text-violet-400 uppercase tracking-widest mb-6">Quick Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div className="flex justify-between md:justify-start gap-4 border-b border-white/5 pb-2 md:border-0 md:pb-0">
              <span className="text-neutral-500">Theme</span>
              <span className="text-white font-medium text-right">Tech for Tomorrow</span>
            </div>
            <div className="flex justify-between md:justify-start gap-4 border-b border-white/5 pb-2 md:border-0 md:pb-0">
              <span className="text-neutral-500">Format</span>
              <span className="text-white font-medium text-right">Software Hackathon</span>
            </div>
            <div className="flex justify-between md:justify-start gap-4 border-b border-white/5 pb-2 md:border-0 md:pb-0">
              <span className="text-neutral-500">Teams</span>
              <span className="text-white font-medium text-right">2–4 Members</span>
            </div>
            <div className="flex justify-between md:justify-start gap-4 border-b border-white/5 pb-2 md:border-0 md:pb-0">
              <span className="text-neutral-500">Registration Fee</span>
              <span className="text-white font-medium text-right">₹200 per team</span>
            </div>
            <div className="flex justify-between md:justify-start gap-4 border-b border-white/5 pb-2 md:border-0 md:pb-0">
              <span className="text-neutral-500">Total Prize Pool</span>
              <span className="text-emerald-400 font-bold text-right">₹6,000</span>
            </div>
            <div className="flex justify-between md:justify-start gap-4 border-b border-white/5 pb-2 md:border-0 md:pb-0">
              <span className="text-neutral-500">Dates</span>
              <span className="text-white font-medium text-right">25th–26th</span>
            </div>
            <div className="col-span-1 md:col-span-2 pt-2 md:pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <span className="text-neutral-500">Domains</span>
              <span className="text-white font-medium text-right">Cybersecurity • Mental Health • Education • Healthcare</span>
            </div>
          </div>
        </div>

        {/* Guidelines Content */}
        <div className="space-y-12">

          {/* Section 1 */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm">1</span>
              Team Requirements
            </h3>
            <ul className="space-y-3 pl-11">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> Each team must consist of 2–4 members.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> Each team must nominate one Team Leader.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> A participant can be part of only one team.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> All team members must complete the required registration details.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> Teams are responsible for ensuring that all information submitted during registration is accurate.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm">2</span>
              Theme & Domains
            </h3>
            <div className="pl-11 space-y-4">
              <p>The hackathon theme is <strong className="text-white">“Tech for Tomorrow.”</strong></p>
              <p>Projects must address a meaningful problem within one of the following domains:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <li className="bg-white/5 p-3 rounded-lg border border-white/10 text-white">🔐 Cybersecurity</li>
                <li className="bg-white/5 p-3 rounded-lg border border-white/10 text-white">🧠 Mental Health</li>
                <li className="bg-white/5 p-3 rounded-lg border border-white/10 text-white">🎓 Education</li>
                <li className="bg-white/5 p-3 rounded-lg border border-white/10 text-white">🏥 Healthcare</li>
              </ul>
              <p className="font-semibold text-white mt-4 border-l-2 border-violet-500 pl-4 py-1">Projects must be software-based.</p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm">3</span>
              Registration & Fee
            </h3>
            <ul className="space-y-3 pl-11">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> The standard registration fee is ₹200 per team.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-500/70 shrink-0 mt-0.5" /> Teams where all members are μLearn members and each member has 12,000+ Karma may register free of charge, subject to verification.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> Teams that do not meet the free-registration criteria must complete the ₹200 payment.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> Registration is considered complete only after the required details and payment/verification have been completed.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm">4</span>
              Project Requirements
            </h3>
            <div className="pl-11 space-y-4">
              <p>Projects must be software-based and related to one of the specified domains.</p>
              <p>Teams may use technologies including:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Web applications', 'Mobile applications', 'AI/ML', 'Cloud technologies', 'APIs', 'Databases', 'Cybersecurity technologies', 'Other relevant software technologies'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-white/[0.03] border border-white/10 rounded-full text-xs text-neutral-300">{tech}</span>
                ))}
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> Teams may use publicly available libraries, frameworks, APIs, datasets and development tools.</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> Any significant external resources used should be properly acknowledged.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm">5</span>
              Originality & Intellectual Property
            </h3>
            <ul className="space-y-3 pl-11">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> Projects must represent the team's own work.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-red-500/70 shrink-0 mt-0.5" /> Plagiarism, unauthorized copying, or presenting another person's work as the team's own is prohibited.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> Previously developed projects should not be submitted as entirely new projects.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> If an existing project is used as a foundation, teams should clearly disclose the pre-existing work and demonstrate substantial development during the hackathon.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm">6</span>
              Use of AI Tools
            </h3>
            <ul className="space-y-3 pl-11">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> AI tools may be used as development and research assistance.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> Teams must understand the implementation of their submitted project.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> Judges may ask participants to explain their code, architecture, methodology, or development process.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-neutral-600 shrink-0 mt-0.5" /> Teams remain responsible for the accuracy, functionality and originality of their final submission.</li>
            </ul>
          </section>

          {/* Section 7 & 8*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm shrink-0">7</span>
                Schedule & Development
              </h3>
              <ul className="space-y-3 pl-11 text-sm">
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0"/> Teams must work within the officially announced hackathon duration.</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0"/> Participants must follow the instructions provided by the organizing committee.</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0"/> Teams are responsible for maintaining backups of their project and source code.</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0"/> Participants should use the designated hackathon areas and facilities responsibly.</li>
              </ul>
            </section>
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm shrink-0">8</span>
                Mentorship
              </h3>
              <ul className="space-y-3 pl-11 text-sm">
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0"/> Mentors may provide technical guidance, suggestions and feedback.</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0"/> Mentors will not develop the project on behalf of participants.</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0"/> Teams remain responsible for their own implementation and final decisions.</li>
              </ul>
            </section>
          </div>

          {/* Section 9 */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm">9</span>
              Checkpoints
            </h3>
            <div className="pl-11 space-y-4">
              <p>Teams may be required to attend scheduled checkpoints. During checkpoints, teams may be asked to present:</p>
              <div className="flex flex-wrap gap-2">
                {['Current progress', 'Problem statement', 'Proposed solution', 'Technical approach', 'Current prototype/demo'].map(item => (
                  <span key={item} className="px-3 py-1 bg-[#111116] border border-white/5 rounded-md text-sm text-neutral-300">{item}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm">10</span>
              Final Submission
            </h3>
            <div className="pl-11 space-y-4">
              <p>Before the submission deadline, teams must submit the required project information, which may include:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {['Project title', 'Problem statement', 'Solution description', 'Technology stack', 'Source-code repository', 'Deployment/demo link', 'Presentation materials', 'Team details', 'Other requested docs'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-neutral-300 bg-white/[0.02] p-2 rounded border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-red-400 text-sm font-semibold pt-2">Late submissions may not be accepted.</p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm">11</span>
              Judging Criteria
            </h3>
            <div className="pl-11">
              <p className="mb-4 text-sm text-neutral-400">Projects may be evaluated based on:</p>
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0f0f14]">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 border-b border-white/10 text-neutral-300 uppercase tracking-wider text-xs">
                    <tr>
                      <th className="px-6 py-4 font-bold">Criteria</th>
                      <th className="px-6 py-4 font-bold">What may be considered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      ['Problem Relevance', 'Relevance and clarity of the problem addressed'],
                      ['Innovation', 'Creativity and originality of the solution'],
                      ['Technical Implementation', 'Quality and effectiveness of the technical implementation'],
                      ['Functionality', 'Working nature and completeness of the prototype'],
                      ['Impact & Scalability', 'Potential real-world application and scalability'],
                      ['UI/UX', 'Usability, accessibility and user experience'],
                      ['Presentation', 'Clarity of explanation and quality of demonstration']
                    ].map(([criteria, desc]) => (
                      <tr key={criteria} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-bold text-white whitespace-nowrap">{criteria}</td>
                        <td className="px-6 py-4 text-neutral-400">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-neutral-500 italic">The organizers may determine the final weighting of the judging criteria.</p>
            </div>
          </section>

          {/* Section 12 */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm">12</span>
              Final Project Demonstration
            </h3>
            <div className="pl-11 space-y-4">
              <p>Each team must demonstrate its project to the judging panel. Teams should clearly explain:</p>
              <div className="flex flex-wrap gap-2">
                {['Problem', 'Target users', 'Proposed solution', 'How the solution works', 'Technology used', 'Key features', 'Live demonstration', 'Future scope'].map(item => (
                  <span key={item} className="px-3 py-1 bg-violet-950/20 text-violet-300 border border-violet-500/20 rounded-full text-xs font-semibold uppercase tracking-wider">{item}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Section 13 & 14 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm shrink-0">13</span>
                Code & Repository
              </h3>
              <ul className="space-y-3 pl-11 text-sm">
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0"/> Teams are encouraged to maintain their projects using Git/GitHub or another platform.</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0"/> The repository should contain the necessary source code and documentation.</li>
                <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-red-500/70 mt-2 shrink-0"/> Participants must not expose passwords, API keys, tokens, or other confidential credentials in public repositories.</li>
              </ul>
            </section>
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm shrink-0">14</span>
                Cybersecurity & Ethics
              </h3>
              <ul className="space-y-3 pl-11 text-sm">
                <li className="flex items-start gap-3"><ShieldCheck className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" /> Participants must not attempt unauthorized access to the college network, other teams' systems, or external systems.</li>
                <li className="flex items-start gap-3"><ShieldCheck className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" /> Security testing must be limited to systems explicitly authorized for the hackathon.</li>
                <li className="flex items-start gap-3"><ShieldCheck className="w-4 h-4 text-red-500/70 shrink-0 mt-0.5" /> Malicious activity, disruption, data theft, or unauthorized access may result in immediate disqualification.</li>
              </ul>
            </section>
          </div>

          {/* Section 15 */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm">15</span>
              Code of Conduct
            </h3>
            <div className="pl-11 space-y-3">
              <p className="text-sm">All participants are expected to:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="bg-[#111116] p-3 rounded-lg border border-white/5 text-sm">Treat participants, mentors, judges, volunteers and organizers respectfully.</li>
                <li className="bg-[#111116] p-3 rounded-lg border border-white/5 text-sm">Maintain professional conduct throughout the event.</li>
                <li className="bg-[#111116] p-3 rounded-lg border border-white/5 text-sm">Follow venue and safety instructions.</li>
                <li className="bg-[#111116] p-3 rounded-lg border border-red-500/20 text-sm">Avoid harassment, discrimination, vandalism and disruptive behavior.</li>
                <li className="bg-[#111116] p-3 rounded-lg border border-white/5 text-sm md:col-span-2">Respect college property and event infrastructure.</li>
              </ul>
            </div>
          </section>

          {/* Section 16 */}
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm">16</span>
              Food & Refreshments
            </h3>
            <div className="pl-11 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-[#111116] border border-white/5 rounded-xl p-5">
                <h4 className="font-bold text-white mb-4 pb-2 border-b border-white/10">Day 1: 25th</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-violet-400">Dinner</p>
                    <p className="text-neutral-400 mt-1">Participants can select their preferred dinner menu during registration. Organizers will arrange it based on the collected amount.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-violet-400">Refreshments</p>
                    <p className="text-neutral-400 mt-1">Tea, snacks and other refreshments provided free of charge.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#111116] border border-white/5 rounded-xl p-5">
                <h4 className="font-bold text-white mb-4 pb-2 border-b border-white/10">Day 2: 26th</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-violet-400">Breakfast & Lunch</p>
                    <p className="text-neutral-400 mt-1">Provided free of charge by the college.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-violet-400">Refreshments</p>
                    <p className="text-neutral-400 mt-1">Tea, snacks and other refreshments provided free of charge throughout the event.</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 p-4 bg-violet-950/20 border border-violet-500/20 rounded-xl text-sm text-violet-200">
                <strong className="text-white">Note:</strong> Participants are requested to provide their dinner preference accurately during registration to help with arrangements.
              </div>
            </div>
          </section>

          {/* Section 17 & 18 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-red-500/20 text-red-400 flex items-center justify-center text-sm shrink-0">17</span>
                Disqualification
              </h3>
              <p className="text-sm mb-3 pl-11">A team may be disqualified for:</p>
              <ul className="space-y-2 pl-11 text-sm text-neutral-400">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-500 rounded-full" /> Plagiarism or substantial unauthorized copying</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-500 rounded-full" /> Participation in multiple teams</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-500 rounded-full" /> Misrepresentation of project work</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-500 rounded-full" /> Unauthorized access or malicious activity</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-500 rounded-full" /> Violation of hackathon rules</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-500 rounded-full" /> Submission after the deadline</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-500 rounded-full" /> Serious misconduct or violation of code of conduct</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm shrink-0">18</span>
                Venue & Facilities
              </h3>
              <ul className="space-y-3 pl-11 text-sm text-neutral-400">
                <li>The hackathon will be conducted on the college campus. Participants must use designated classrooms.</li>
                <li>Participants are responsible for their personal belongings.</li>
                <li>Bring any personal equipment required for development, such as laptops and chargers.</li>
                <li className="text-amber-400 font-medium">Wi-Fi will not be provided by the organizers, so participants should make appropriate arrangements for internet connectivity if required.</li>
              </ul>
            </section>
          </div>

          {/* Section 19 */}
          <section className="bg-gradient-to-r from-emerald-900/30 to-violet-900/30 border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <h3 className="text-lg font-bold text-neutral-400 uppercase tracking-widest mb-2 relative z-10">19. Prize Pool 🏆</h3>
            <p className="text-4xl md:text-5xl font-black text-white relative z-10">TOTAL PRIZE POOL — ₹6,000</p>
          </section>

          {/* Section 20 */}
          <section className="bg-[#0f0f14] border border-white/5 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-violet-500/10 text-violet-400 flex items-center justify-center text-sm shrink-0">20</span>
              Final Authority
            </h3>
            <div className="space-y-4 text-sm text-neutral-400">
              <p>The organizing committee reserves the right to make necessary decisions regarding eligibility, rule violations, event procedures and other matters arising during the hackathon.</p>
              <p className="font-semibold text-white">The decision of the judging panel regarding project evaluation and final results shall be final.</p>
            </div>
          </section>

        </div>

        {/* Footer actions */}
        <div className="mt-16 text-center">
          <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold rounded-full bg-white text-black hover:bg-neutral-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            Register Your Team Now
          </Link>
        </div>

      </div>
    </main>
  );
}
