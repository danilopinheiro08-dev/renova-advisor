"use client";

import Link from "next/link";
import { ArrowRight, Wallet, Newspaper, Calculator, TrendingUp, ShieldCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SecureStorage } from "@/lib/storage";

export default function HomePage() {
  const { data: session } = useSession();
  const [aum, setAum] = useState(0);

  useEffect(() => {
    SecureStorage.getItem<any[]>("portfolio_clients").then(clients => {
      if (clients) {
        setAum(clients.reduce((acc, c) => acc + c.aum, 0));
      }
    });
  }, []);

  return (
    <div className="p-4 flex flex-col h-full overflow-y-auto pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
          Olá, {session?.user?.name?.split(" ")[0] || "Assessor"}!
        </h1>
        <p className="text-slate-400 text-sm mt-1">Seu canivete suíço financeiro.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-indigo-900/50 to-slate-800 border border-indigo-800/50 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Wallet className="w-5 h-5 text-indigo-400" />
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-xs font-medium text-slate-400 mb-1">AUM Local Secure</p>
          <h2 className="text-xl font-bold text-white">
            <span className="text-sm text-slate-400 font-normal">R$</span>{" "}
            {(aum / 1000000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}M
          </h2>
        </div>

        <Link href="/market" className="bg-gradient-to-br from-blue-900/50 to-slate-800 border border-blue-800/50 rounded-2xl p-4 shadow-lg hover:border-blue-500 transition-colors group">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
          </div>
          <p className="text-xs font-medium text-slate-400 mb-1">Mercado Hoje</p>
          <h2 className="text-sm font-semibold text-blue-200 mt-2">Visão Geral &rarr;</h2>
        </Link>
      </div>

      <h3 className="text-lg font-bold mb-3 text-slate-200">Acesso Rápido</h3>
      <div className="space-y-3">
        <QuickLink href="/tools?tool=juros" icon={Calculator} title="Calculadora Juros Compostos" desc="Simule rentabilidade vs CDI" color="text-amber-400" bg="bg-amber-500/10" />
        <QuickLink href="/tools?tool=ir" icon={Newspaper} title="Tabela de IR p/ Clientes" desc="Consulte alíquotas de Renda Fixa e RV" color="text-emerald-400" bg="bg-emerald-500/10" />
        <QuickLink href="/chat" icon={TrendingUp} title="RenovaBot IA" desc="Tire dúvidas sobre economia com IA" color="text-purple-400" bg="bg-purple-500/10" />
      </div>
    </div>
  );
}

function QuickLink({ href, icon: Icon, title, desc, color, bg }: any) {
  return (
    <Link href={href} className="flex items-center gap-4 p-3 bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-xl transition-all group">
      <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-sm text-slate-200 group-hover:text-white transition-colors">{title}</h4>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
    </Link>
  );
}
