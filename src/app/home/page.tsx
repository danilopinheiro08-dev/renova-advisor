"use client";

import {
  ArrowUpRight,
  Briefcase,
  Calculator,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  Waves,
  Zap,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const stats = [
  {
    label: "AUM Total",
    value: "R$ 142.8M",
    change: "+12.5%",
    positive: true,
    helper: "vs. mês anterior",
    icon: Wallet,
  },
  {
    label: "Clientes Ativos",
    value: "84",
    change: "+3",
    positive: true,
    helper: "novos relacionamentos",
    icon: Users,
  },
  {
    label: "Aportes Mês",
    value: "R$ 4.2M",
    change: "-8%",
    positive: false,
    helper: "fluxo consolidado",
    icon: TrendingUp,
  },
];

const tools = [
  { id: "calc", name: "Elite Tools", icon: Calculator, href: "/tools", desc: "MTM, IR e cenários" },
  { id: "ai", name: "RenovaBot", icon: MessageSquare, href: "/chat", desc: "Consultoria assistida" },
  { id: "market", name: "Mercado Live", icon: Zap, href: "/market", desc: "Radar de ativos" },
  { id: "crm", name: "Portfólio", icon: Briefcase, href: "/portfolio", desc: "Base e suitability" },
];

const flowItems = [
  { month: "Abr", height: "h-8" },
  { month: "Mai", height: "h-14" },
  { month: "Jun", height: "h-10" },
  { month: "Jul", height: "h-20" },
  { month: "Ago", height: "h-12" },
];

export default function HomePage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] || "Assessor";

  return (
    <div className="animate-page no-x-scroll mx-auto flex w-full max-w-xl flex-col px-4 pb-32 pt-6 sm:px-5">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="accent-chip mb-4 w-fit">
            <Sparkles size={14} />
            Daily cockpit
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--text-tertiary)]">Visão geral</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white">
            Olá, <span className="text-gradient">{firstName}</span>
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
            Sua operação agora segue uma estética fintech mais premium, com foco em leitura rápida e sensação de produto institucional.
          </p>
        </div>

        <div className="glass-card flex h-14 w-14 items-center justify-center rounded-[22px] text-cyan-200">
          <ShieldCheck size={22} />
        </div>
      </header>

      <section className="glass-card relative mb-6 overflow-hidden rounded-[32px] p-6">
        <div className="absolute right-[-12%] top-[-12%] h-32 w-32 rounded-full bg-cyan-300/12 blur-[60px]" />
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--text-tertiary)]">Pulse overview</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white">Dashboard consultivo</h2>
          </div>
          <div className="stat-orb flex h-14 w-14 items-center justify-center rounded-full text-cyan-200">
            <Waves size={18} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="icon-container p-3 text-cyan-200">
                  <stat.icon size={16} />
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${stat.positive ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-200"}`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{stat.label}</p>
              <p className="mt-2 text-lg font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-[11px] text-[var(--text-secondary)]">{stat.helper}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6 grid gap-4 md:grid-cols-[1.5fr_1fr]">
        <div className="premium-card rounded-[30px] p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Momentum</p>
              <h3 className="mt-1 text-xl font-bold text-white">Fluxo mensal</h3>
            </div>
            <div className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200">
              +18%
            </div>
          </div>

          <div className="flex items-end justify-between gap-3 rounded-[24px] border border-white/8 bg-[#0b1036]/70 px-4 py-5">
            {flowItems.map((item) => (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-3">
                <div className={`w-full max-w-8 rounded-full bg-gradient-to-t from-cyan-300 via-cyan-300/75 to-transparent ${item.height}`} />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-card rounded-[30px] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Watchlist</p>
          <h3 className="mt-1 text-xl font-bold text-white">Janelas de ação</h3>
          <div className="mt-5 space-y-3">
            {[
              ["Captação private", "Hoje", "+R$ 850k"],
              ["Revisão de carteira", "14h00", "12 clientes"],
              ["Oportunidade macro", "Radar", "USD / juros"],
            ].map(([title, badge, value]) => (
              <div key={title} className="rounded-[22px] border border-white/8 bg-white/5 px-4 py-3">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-white">{title}</p>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200">{badge}</span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-6">
        <div className="mb-4 flex items-center justify-between px-1">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--text-tertiary)]">Operações</p>
            <h3 className="mt-1 text-xl font-bold text-white">Módulos da plataforma</h3>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
            4 ativos
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool) => (
            <Link key={tool.id} href={tool.href} className="group">
              <div className="premium-card h-full rounded-[28px] p-5 transition-transform duration-200 group-active:scale-[0.98]">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="icon-container text-cyan-200">
                    <tool.icon size={20} />
                  </div>
                  <ArrowUpRight size={16} className="text-[var(--text-tertiary)] transition-colors group-hover:text-cyan-200" />
                </div>
                <h4 className="text-base font-bold text-white">{tool.name}</h4>
                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-card rounded-[30px] p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--text-tertiary)]">Proteção local</p>
            <h3 className="mt-1 text-xl font-bold text-white">Privacidade operacional</h3>
          </div>
          <ChevronRight className="text-cyan-200" size={18} />
        </div>
        <p className="text-sm leading-6 text-[var(--text-secondary)]">
          Seus dados continuam protegidos por criptografia local, agora dentro de uma interface mais alinhada com referências de apps financeiros premium.
        </p>
      </section>
    </div>
  );
}
