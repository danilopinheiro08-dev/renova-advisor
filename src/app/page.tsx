"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  ChevronRight,
  LayoutDashboard,
  Lock,
  Globe,
  Sparkles,
  Fingerprint
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function WelcomeExperience() {
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const hasSeenWelcome = localStorage.getItem("has_seen_welcome_v2");
    if (hasSeenWelcome === "true") {
      router.push("/home");
    }
  }, [router]);

  if (!mounted) return null;

  const handleNext = () => setStep((s) => s + 1);
  const finish = () => {
    localStorage.setItem("has_seen_welcome_v2", "true");
    router.push("/home");
  };

  return (
    <div className="min-h-[100dvh] w-full relative overflow-hidden flex flex-col items-center justify-center px-6 animate-page">

      {/* Step 0: Clean Intro */}
      {step === 0 && (
        <div className="w-full max-w-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-8">
            <Sparkles size={32} />
          </div>

          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
            Renova<span className="text-blue-500">Advisor.</span>
          </h1>

          <p className="text-slate-400 text-base font-medium leading-relaxed mb-10 px-4">
            A ferramenta definitiva para o assessor de elite. Segurança, inteligência e precisão local.
          </p>

          <button onClick={handleNext} className="app-button w-full">
            Começar
            <ArrowRight size={20} />
          </button>

          <div className="mt-8 flex items-center gap-2 text-slate-500 text-[9px] uppercase font-bold tracking-[0.2em]">
            <ShieldCheck size={12} className="text-blue-500/50" />
            Ambiente Criptografado Local
          </div>
        </div>
      )}

      {/* Step 1: Clean Features */}
      {step === 1 && (
        <div className="w-full max-w-md flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-white tracking-tight text-center mb-8">Poder Local.</h2>

          <div className="flex flex-col gap-4 w-full mb-10">
            <FeatureCard
              icon={LayoutDashboard}
              title="Gestão de AUM"
              desc="Visão consolidada da sua base em tempo real."
            />
            <FeatureCard
              icon={Globe}
              title="Mercado Global"
              desc="Feed de ativos e inteligência integrada."
            />
            <FeatureCard
              icon={Lock}
              title="Privacidade Absoluta"
              desc="Seus dados nunca saem deste dispositivo."
            />
          </div>

          <button onClick={handleNext} className="app-button w-full">
            Continuar
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Step 2: Simplified Access */}
      {step === 2 && (
        <div className="w-full max-w-sm text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-blue-500 mb-10">
            <Fingerprint size={40} />
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-6">Acesso Seguro</h2>

          <div className="w-full p-6 bg-slate-900/50 rounded-2xl border border-white/5 text-left mb-10">
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-3">Segurança Ativa</p>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="flex gap-2">
                <span className="text-blue-500">•</span> Bancos de dados locais isolados
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500">•</span> Zero sincronização externa
              </li>
            </ul>
          </div>

          <button onClick={finish} className="app-button w-full">
            Entrar na Operação
            <ArrowRight size={22} />
          </button>

          <p className="mt-10 text-slate-700 text-[9px] uppercase font-bold tracking-[0.3em]">
            V2.5 • Institutional
          </p>
        </div>
      )}

    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="premium-card flex items-center gap-5">
      <div className="icon-container text-blue-500">
        <Icon size={22} />
      </div>
      <div>
        <h4 className="text-white font-bold text-base tracking-tight">{title}</h4>
        <p className="text-slate-500 text-xs font-medium leading-normal">{desc}</p>
      </div>
    </div>
  );
}
