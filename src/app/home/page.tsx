"use client";

import {
  TrendingUp,
  Users,
  Wallet,
  Calculator,
  MessageSquare,
  Zap,
  ShieldCheck,
  ArrowUpRight,
  ChevronRight,
  Briefcase
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();

  const stats = [
    { label: "AUM Total", value: "R$ 142.8M", change: "+12.5%", positive: true, icon: Wallet },
    { label: "Clientes Ativos", value: "84", change: "+3", positive: true, icon: Users },
    { label: "Aportes Mês", value: "R$ 4.2M", change: "-8%", positive: false, icon: TrendingUp },
  ];

  const tools = [
    { id: "calc", name: "Elite Tools", icon: Calculator, href: "/tools", desc: "MTM e IR" },
    { id: "ai", name: "RenovaBot", icon: MessageSquare, href: "/chat", desc: "Consultoria IA" },
    { id: "market", name: "Mercado Live", icon: Zap, href: "/market", desc: "Ativos BTG" },
    { id: "crm", name: "Portfólio", icon: Briefcase, href: "/portfolio", desc: "Gestão Clientes" },
  ];

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto px-5 py-8 pb-24 animate-page no-x-scroll">

      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Visão Geral</p>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Olá, {session?.user?.name?.split(' ')[0] || "Assessor"}.
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center text-slate-400">
          <ShieldCheck size={20} />
        </div>
      </header>

      {/* Metrics - Stacked Vertically or Simple Grid (No Horizontal Scroll) */}
      <div className="grid grid-cols-1 gap-4 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="premium-card flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="icon-container">
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold text-white tracking-tight">{stat.value}</p>
              </div>
            </div>
            <div className={`text-[11px] font-bold px-2 py-1 rounded-md ${stat.positive ? 'text-emerald-400 bg-emerald-500/5' : 'text-amber-400 bg-amber-500/5'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Operations Grid */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-5 px-1">Operações</h3>
        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool) => (
            <Link key={tool.id} href={tool.href} className="flex flex-col">
              <div className="premium-card h-full flex flex-col items-start gap-4">
                <div className="icon-container text-blue-400">
                  <tool.icon size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">{tool.name}</h4>
                  <p className="text-slate-500 text-[10px] font-medium">{tool.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Simplified Privacy Notice */}
      <div className="mt-4 p-5 bg-slate-900/50 rounded-2xl border border-white/5 flex items-start gap-4">
        <ShieldCheck size={18} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
          Seus dados estão protegidos por criptografia **AES-256** local. Operação anônima e segura.
        </p>
      </div>

    </div>
  );
}
