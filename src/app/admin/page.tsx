"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Settings, 
  Database, 
  Plus, 
  Search, 
  MoreVertical,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  LogOut // Added for the logout function
} from 'lucide-react';

const PROJECT_DATABASE = [
  { id: 'RD-101', type: 'Roads', name: 'Al-Khwarmi Highway', manager: 'Eng. K. Hassan', budget: '$4.2M', status: 'Active', health: 'Good' },
  { id: 'BL-402', type: 'Buildings', name: 'Zuhunain HQ Tower', manager: 'Sarah J.', budget: '$12.8M', status: 'Pending', health: 'Warning' },
  { id: 'WT-205', type: 'Water', name: 'Sector 7 Mainline', manager: 'Mike R.', budget: '$850K', status: 'Completed', health: 'Good' },
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Functional Logout Logic
  const handleLogout = () => {
    // In a real app, clear tokens/session here
    router.push('/');
  };

  const filteredProjects = PROJECT_DATABASE.filter(p => 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex font-sans text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-100 flex flex-col p-8 sticky top-0 h-screen">
        <div className="mb-12 cursor-pointer" onClick={() => router.push('/')}>
          <div className="text-2xl font-black tracking-tighter text-[#A64D2E] italic flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1B5E3C] rounded-lg" /> ZUHUNAIN
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">Investments Ltd</p>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<LayoutDashboard size={18} />} label="Overview" active />
          <NavItem icon={<Database size={18} />} label="Project Registry" />
          <NavItem icon={<TrendingUp size={18} />} label="Financials" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>

        {/* NEW LOGOUT SECTION */}
        <div className="pt-8 border-t border-slate-50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 rounded-2xl w-full text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all group"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-3xl font-black tracking-tight mb-2">Registry Dashboard</h1>
            <p className="text-slate-400 text-sm">Real-time polymorphic oversight.</p>
          </motion.div>
          <button className="bg-[#1B5E3C] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-green-100">
            <Plus size={18} /> Add Project
          </button>
        </header>

        {/* METRICS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <MetricCard label="Total Valuation" value="$17.85M" trend="+12%" icon={<TrendingUp size={16}/>} />
          <MetricCard label="System Uptime" value="99.9%" trend="Stable" icon={<Clock size={16}/>} />
          <MetricCard label="Approvals" value="12" trend="+2" icon={<CheckCircle2 size={16}/>} />
        </section>

        {/* DATA TABLE */}
        <section className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h2 className="font-bold text-lg">Active Portfolio</h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="Search Registry..." 
                className="pl-12 pr-6 py-3 bg-slate-50 rounded-2xl text-sm focus:ring-2 ring-[#1B5E3C]/20 outline-none transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="px-8 py-5">ID (Polymorphic)</th>
                <th className="px-8 py-5">Name</th>
                <th className="px-8 py-5">Budget</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-6 font-bold text-sm">{project.id}</td>
                  <td className="px-8 py-6 text-sm text-slate-700">{project.name}</td>
                  <td className="px-8 py-6 font-mono font-bold text-sm text-[#1B5E3C]">{project.budget}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

// Sub-components maintained from previous session
function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl cursor-pointer transition-all ${
      active ? 'bg-[#1B5E3C] text-white shadow-lg shadow-green-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
    }`}>
      {icon}
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}

function MetricCard({ label, value, trend, icon }: { label: string, value: string, trend: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm relative overflow-hidden group">
      <div className="absolute top-4 right-4 text-[#1B5E3C]/10 group-hover:text-[#1B5E3C]/20 transition-colors">
        {icon}
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{label}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-4xl font-black text-slate-900">{value}</h3>
        <span className="text-[10px] font-bold text-[#1B5E3C] bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
          <ArrowUpRight size={10} /> {trend}
        </span>
      </div>
    </div>
  );
}