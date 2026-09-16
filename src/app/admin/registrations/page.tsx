import { getRegistrations } from "@/app/actions/adminData";
import Link from "next/link";


export const revalidate = 0;

export default async function AdminRegistrations() {
  const registrations = await getRegistrations();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">All Registrations</h1>
      
      <div className="bg-[#111116] border border-white/5 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0B0B0F] border-b border-white/5 text-neutral-400">
              <tr>
                <th className="px-6 py-4 font-medium">Registration ID</th>
                <th className="px-6 py-4 font-medium">Team</th>
                <th className="px-6 py-4 font-medium">Members</th>
                <th className="px-6 py-4 font-medium">Domain</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {registrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-violet-400">{reg.registration_id}</td>
                  <td className="px-6 py-4 font-medium">{reg.team_name}</td>
                  <td className="px-6 py-4 text-neutral-300">{reg.team_size}</td>
                  <td className="px-6 py-4 text-neutral-300">{reg.domain}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${reg.registration_type === 'FREE' ? 'bg-green-500/20 text-green-400' : 'bg-neutral-500/20 text-neutral-300'}`}>
                      {reg.registration_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-neutral-400 text-xs">{reg.payment_transaction_id || '-'}</td>
                  <td className="px-6 py-4 text-neutral-400">
                     {new Date(reg.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/registrations/${reg.registration_id}`} className="text-violet-400 hover:text-violet-300 transition-colors">
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
              {registrations.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-neutral-500">
                    No registrations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
