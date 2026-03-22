"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Fingerprint,
  Globe,
  LayoutDashboard,
  Lock,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Waves,
} from "lucide-react";
import { useRouter } from "next/navigation";

const featureCards = [
  {
    icon: LayoutDashboard,
    title: "Cockpit consultivo",
    desc: "Visão executiva do dia com AUM, fluxos e pendências de carteira.",
  },
  {
    icon: Globe,
    title: "Mercado em camadas",
    desc: "Monitoramento de ativos, tendências e oportunidades em tempo real.",
  },
  {
    icon: Lock,
    title: "Operação privada",
    desc: "Dados locais, experiência premium e proteção contínua para sua base.",
  },
];

const previewMetrics = [
  { label: "AUM", value: "R$ 142.8M" },
  { label: "Clientes", value: "84" },
  { label: "Alpha", value: "+12.5%" },
];

export default function WelcomeExperience() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const hasSeenWelcome = window.localStorage.getItem("has_seen_welcome_v2");
    if (hasSeenWelcome === "true") {
      router.push("/home");
    }
  }, [router]);


  const handleNext = () => setStep((current) => current + 1);
  const finish = () => {
    localStorage.setItem("has_seen_welcome_v2", "true");
    router.push("/home");
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-5 py-10 animate-page">
      <div className="app-grid absolute inset-0 opacity-40" />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-[120px]" />

      {step === 0 && (
        <div className="glass-card relative z-10 w-full max-w-md rounded-[36px] px-6 py-8 text-center sm:px-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[24px] border border-cyan-300/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_30px_rgba(103,240,215,0.18)]">
            <Sparkles size={30} />
          </div>

          <div className="accent-chip mx-auto mb-5 w-fit">
            <Waves size={14} />
            Fintech Experience
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white">
            Renova <span className="text-gradient">Advisor</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xs text-sm font-medium leading-6 text-[var(--text-secondary)]">
            Refatorado para uma linguagem visual mais sofisticada, fluida e inspirada em apps financeiros premium.
          </p>

          <div className="premium-card mb-8 rounded-[28px] p-5 text-left">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--text-tertiary)]">Painel de abertura</p>
                <p className="mt-1 text-lg font-bold text-white">Pulse Overview</p>
              </div>
              <div className="stat-orb h-12 w-12 rounded-full" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {previewMetrics.map((metric) => (
                <div key={metric.label} className="rounded-[20px] border border-white/8 bg-white/5 px-3 py-4 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{metric.label}</p>
                  <p className="mt-2 text-sm font-bold text-white">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleNext} className="app-button w-full">
            Explorar interface
            <ArrowRight size={18} />
          </button>

          <div className="mt-7 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">
            <ShieldCheck size={12} className="text-cyan-300/70" />
            Seguro • Local • Responsivo
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="relative z-10 w-full max-w-lg">
          <div className="mb-5 px-2 text-center">
            <div className="accent-chip mx-auto mb-4 w-fit">
              <TrendingUp size={14} />
              Novo sistema visual
            </div>
            <h2 className="mb-3 text-3xl font-extrabold text-white">Estética consultiva com toque neomórfico.</h2>
            <p className="mx-auto max-w-md text-sm leading-6 text-[var(--text-secondary)]">
              Cards volumétricos, contraste elegante e foco em leitura rápida para rotinas de assessoria.
            </p>
          </div>

          <div className="space-y-4">
            {featureCards.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>

          <button onClick={handleNext} className="app-button mt-6 w-full">
            Continuar
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="glass-card relative z-10 w-full max-w-md rounded-[36px] px-6 py-8 text-center sm:px-8">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cyan-200 shadow-[0_0_40px_rgba(103,240,215,0.16)]">
            <Fingerprint size={38} />
          </div>

          <h2 className="mb-3 text-3xl font-extrabold text-white">Acesso seguro, presença premium.</h2>
          <p className="mb-8 text-sm leading-6 text-[var(--text-secondary)]">
            A experiência foi refinada para parecer um app financeiro de alta performance sem abrir mão da privacidade local.
          </p>

          <div className="premium-card mb-8 rounded-[28px] p-5 text-left">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-200/80">Camadas de proteção</p>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />Dados armazenados no dispositivo.</li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />Fluxo visual otimizado para decisão rápida.</li>
              <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />Tema consistente entre dashboard, portfólio e navegação.</li>
            </ul>
          </div>

          <button onClick={finish} className="app-button w-full">
            Entrar na operação
            <ArrowRight size={18} />
          </button>

          <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--text-tertiary)]">Visual system • 2026</p>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: typeof LayoutDashboard; title: string; desc: string }) {
  return (
    <div className="premium-card flex items-center gap-4 rounded-[28px] p-5">
      <div className="icon-container text-cyan-200">
        <Icon size={22} />
      </div>
      <div className="text-left">
        <h4 className="text-base font-bold tracking-tight text-white">{title}</h4>
        <p className="mt-1 text-sm leading-5 text-[var(--text-secondary)]">{desc}</p>
      </div>
    </div>
  );
}
