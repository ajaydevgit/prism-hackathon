import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <aside className="w-64 bg-[#0B0B0F] border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link href="/admin" className="text-xl font-bold tracking-widest text-violet-400">
            PRISM ADMIN
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded-md hover:bg-white/5 transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/registrations" className="block px-4 py-2 rounded-md hover:bg-white/5 transition-colors">
            Registrations
          </Link>
        </nav>
        <div className="p-4 border-t border-white/5 text-sm text-neutral-500">
           <Link href="/">← Back to Site</Link>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
