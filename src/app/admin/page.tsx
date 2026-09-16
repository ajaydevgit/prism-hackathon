import { getDashboardStats } from "@/app/actions/adminData";

export const revalidate = 0;

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-[#111116] border border-white/5 rounded-xl">
          <p className="text-sm text-neutral-400 mb-1 uppercase tracking-wider">Total Teams</p>
          <p className="text-4xl font-bold">{stats.total}</p>
        </div>
        <div className="p-6 bg-[#111116] border border-white/5 rounded-xl">
          <p className="text-sm text-neutral-400 mb-1 uppercase tracking-wider">Total Members</p>
          <p className="text-4xl font-bold">{stats.members}</p>
        </div>
        <div className="p-6 bg-[#111116] border border-white/5 rounded-xl border-l-4 border-l-green-500">
          <p className="text-sm text-neutral-400 mb-1 uppercase tracking-wider">Free Teams</p>
          <p className="text-4xl font-bold">{stats.free}</p>
        </div>
        <div className="p-6 bg-[#111116] border border-white/5 rounded-xl border-l-4 border-l-violet-500">
          <p className="text-sm text-neutral-400 mb-1 uppercase tracking-wider">Paid Teams</p>
          <p className="text-4xl font-bold">{stats.paid}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Domain Distribution</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(stats.domains).map(([domain, count]) => (
          <div key={domain} className="p-4 bg-[#0B0B0F] border border-white/5 rounded-lg flex justify-between items-center">
            <span className="font-medium">{domain}</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-sm">{count}</span>
          </div>
        ))}
        {Object.keys(stats.domains).length === 0 && (
           <p className="text-neutral-500">No registrations yet.</p>
        )}
      </div>
    </div>
  );
}
