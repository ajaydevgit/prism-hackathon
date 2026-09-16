import { getRegistrationDetails } from "@/app/actions/adminData";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function AdminRegistrationDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const details = await getRegistrationDetails(id);
  
  if (!details) {
    notFound();
  }

  const { registration: reg, members } = details;

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/registrations" className="text-neutral-500 hover:text-white transition-colors">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold">Registration Details</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="md:col-span-2 p-6 bg-[#111116] border border-white/5 rounded-xl">
            <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Team Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-neutral-500 text-sm">Team Name</p>
                <p className="text-lg font-medium">{reg.team_name}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Registration ID</p>
                <p className="text-lg font-mono text-violet-400">{reg.registration_id}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Domain</p>
                <p className="text-white">{reg.domain}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-sm">Team Size</p>
                <p className="text-white">{reg.team_size} Members</p>
              </div>
            </div>
         </div>
         <div className="p-6 bg-[#111116] border border-white/5 rounded-xl">
            <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Eligibility & Payment</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">MuLearn Eligible</span>
                <span className={reg.mulearn_eligible ? 'text-green-400' : 'text-red-400'}>{reg.mulearn_eligible ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Karma Eligible</span>
                <span className={reg.karma_eligible ? 'text-green-400' : 'text-red-400'}>{reg.karma_eligible ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/5">
                <span className="text-neutral-500">Type</span>
                <span className="font-bold text-white">{reg.registration_type}</span>
              </div>
              {reg.payment_transaction_id && (
                <div className="flex justify-between flex-col gap-1 pt-2 border-t border-white/5">
                  <span className="text-neutral-500">Transaction ID</span>
                  <span className="font-mono text-xs break-all">{reg.payment_transaction_id}</span>
                </div>
              )}
            </div>
         </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Team Members</h2>
      <div className="space-y-4">
        {members.map((m: any) => (
          <div key={m.id} className="p-6 bg-[#0B0B0F] border border-white/5 rounded-xl flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">{m.role}</span>
              <p className="text-lg font-medium mt-1">{m.full_name}</p>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-neutral-500 text-xs">Email</p>
                <p>{m.email}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-xs">Phone</p>
                <p>{m.phone}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-xs">College</p>
                <p>{m.college}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-xs">Experience</p>
                <p>{m.experience_level}</p>
              </div>
              {m.muid && (
                <div className="col-span-full">
                  <p className="text-neutral-500 text-xs">MuLearn MUID</p>
                  <p className="font-mono text-violet-300">{m.muid}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
