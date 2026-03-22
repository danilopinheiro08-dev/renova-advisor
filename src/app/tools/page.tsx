"use client";

import { useState, Suspense } from "react";
import { Calculator, Calendar, Newspaper, Download, Percent, Landmark, Activity, Compass, TrendingUp, ShieldAlert, FileText, ArrowLeftRight, PieChart, FileCheck, ChevronLeft } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { MtmCalc, SuitabilityQuiz, JurosReaisCalc, CdiVsPoupanca, FgcMonitor, PgblVgbl, RebalanceCalc, TaxConverter, FundSnapshot, OnePagerExport } from "@/components/tools/ExtraTools";

function ToolsContent() {
    const params = useSearchParams();
    const router = useRouter();
    const initialTool = params.get("tool");
    const [activeTab, setActiveTab] = useState<string | null>(initialTool);

    const tools = [
        { id: "juros", label: "Juros Compostos", desc: "Simulação de aporte", icon: Percent, color: "text-amber-400" },
        { id: "ir", label: "Imposto de Renda", desc: "Tabelas e regressivas", icon: Landmark, color: "text-emerald-400" },
        { id: "calendar", label: "Calendário", desc: "Eventos econômicos", icon: Calendar, color: "text-blue-400" },
        { id: "mtm", label: "Marcação Mercado", desc: "Curva de juros (PU)", icon: Activity, color: "text-rose-400" },
        { id: "suit", label: "Suitability", desc: "Perfil de risco rápido", icon: Compass, color: "text-indigo-400" },
        { id: "real", label: "Juros Reais", desc: "Desconto do IPCA", icon: TrendingUp, color: "text-cyan-400" },
        { id: "cdi", label: "CDI vs Poupança", desc: "Rentabilidade líquida", icon: ArrowLeftRight, color: "text-fuchsia-400" },
        { id: "fgc", label: "Monitor FGC", desc: "Limite de proteção", icon: ShieldAlert, color: "text-red-400" },
        { id: "prev", label: "PGBL ou VGBL?", desc: "Decisor Tributário", icon: FileText, color: "text-teal-400" },
        { id: "reb", label: "Rebalancear", desc: "Ajuste RF/RV", icon: PieChart, color: "text-orange-400" },
        { id: "taxa", label: "Conv. Taxas", desc: "Anual para mensal", icon: Calculator, color: "text-violet-400" },
        { id: "fundo", label: "Lâmina Fundo", desc: "Mock de lâminas", icon: Newspaper, color: "text-yellow-400" },
        { id: "export", label: "Exportador", desc: "Pitch de Vendas", icon: FileCheck, color: "text-emerald-500" }
    ];

    if (activeTab) {
        const activeToolInfo = tools.find(t => t.id === activeTab);
        return (
            <div className="flex flex-col h-full absolute inset-0 pb-16 pt-14 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1c] to-black">
                <div className="flex items-center gap-3 p-4 sticky top-0 z-10 bg-white/5 backdrop-blur-xl border-b border-white/10">
                    <button
                        onClick={() => { setActiveTab(null); router.replace("/tools"); }}
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all shadow-lg"
                    >
                        <ChevronLeft className="w-5 h-5 text-slate-200" />
                    </button>
                    <div className="flex items-center gap-2">
                        {activeToolInfo && <activeToolInfo.icon className={`w-5 h-5 ${activeToolInfo.color}`} />}
                        <h1 className="font-bold text-lg text-slate-100">{activeToolInfo?.label}</h1>
                    </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                    {activeTab === "juros" && <JurosCalculator />}
                    {activeTab === "ir" && <TabelaIR />}
                    {activeTab === "calendar" && <CalendarioEconomico />}
                    {activeTab === "mtm" && <MtmCalc />}
                    {activeTab === "suit" && <SuitabilityQuiz />}
                    {activeTab === "real" && <JurosReaisCalc />}
                    {activeTab === "cdi" && <CdiVsPoupanca />}
                    {activeTab === "fgc" && <FgcMonitor />}
                    {activeTab === "prev" && <PgblVgbl />}
                    {activeTab === "reb" && <RebalanceCalc />}
                    {activeTab === "taxa" && <TaxConverter />}
                    {activeTab === "fundo" && <FundSnapshot />}
                    {activeTab === "export" && <OnePagerExport />}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full absolute inset-0 pb-16 pt-14 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1c] to-black p-4 overflow-y-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Ferramentas</h1>
                <p className="text-slate-400 text-sm mt-1">Selecione um módulo para iniciar</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-10">
                {tools.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className="flex flex-col items-start p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/10 hover:border-white/20 transition-all group text-left relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-white/10 group-hover:scale-150"></div>
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-inner">
                            <t.icon className={`w-5 h-5 ${t.color}`} />
                        </div>
                        <h3 className="font-semibold text-slate-200 group-hover:text-white transition-colors">{t.label}</h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{t.desc}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function ToolsPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen items-center justify-center bg-[#05070a]">
                <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        }>
            <ToolsContent />
        </Suspense>
    );
}

function JurosCalculator() {
    const [principal, setPrincipal] = useState(100000);
    const [mensal, setMensal] = useState(5000);
    const [taxaAa, setTaxaAa] = useState(11.75);
    const [anos, setAnos] = useState(10);

    const meses = anos * 12;
    const taxaAm = Math.pow(1 + taxaAa / 100, 1 / 12) - 1;
    const montanteFinal = principal * Math.pow(1 + taxaAm, meses) + mensal * ((Math.pow(1 + taxaAm, meses) - 1) / taxaAm);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="glass-panel p-6 rounded-3xl relative overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[200%] bg-gradient-to-br from-blue-500/10 to-transparent blur-3xl -z-10"></div>
                <h2 className="text-sm font-medium text-slate-300 mb-1">Montante Final Projetado</h2>
                <h1 className="text-3xl font-bold text-white drop-shadow-md">R$ {montanteFinal.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}</h1>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                        <label className="text-xs text-slate-400">Total Investido</label>
                        <p className="font-semibold text-slate-200">R$ {(principal + mensal * meses).toLocaleString("pt-BR")}</p>
                    </div>
                    <div>
                        <label className="text-xs text-slate-400">Juros Ganhos</label>
                        <p className="font-semibold text-emerald-400">+ R$ {(montanteFinal - (principal + mensal * meses)).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-xs text-slate-300 block mb-2 font-medium">Aporte Inicial (R$)</label>
                    <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white focus:border-blue-500/50 outline-none transition-colors shadow-inner" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-slate-300 block mb-2 font-medium">Aporte Mensal</label>
                        <input type="number" value={mensal} onChange={(e) => setMensal(Number(e.target.value))} className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white focus:border-blue-500/50 outline-none transition-colors shadow-inner" />
                    </div>
                    <div>
                        <label className="text-xs text-slate-300 block mb-2 font-medium">Taxa (% a.a.)</label>
                        <input type="number" step="0.1" value={taxaAa} onChange={(e) => setTaxaAa(Number(e.target.value))} className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 text-white focus:border-blue-500/50 outline-none transition-colors shadow-inner" />
                    </div>
                </div>
                <div className="pt-2">
                    <label className="text-xs text-slate-300 block mb-2 font-medium flex justify-between">Prazo: <span className="text-white font-bold">{anos} anos</span></label>
                    <input type="range" min="1" max="50" value={anos} onChange={(e) => setAnos(Number(e.target.value))} className="w-full transition-all accent-blue-500" />
                </div>
            </div>
        </div>
    );
}

function TabelaIR() {
    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                <div className="p-5 bg-white/5 border-b border-white/5">
                    <h3 className="font-bold text-white tracking-wide">Tabela Regressiva (RF)</h3>
                    <p className="text-xs text-slate-400 mt-1">CDB, LC, Tesouro Direto.</p>
                </div>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-slate-300">Até 180 dias</td>
                            <td className="p-4 text-right font-black text-red-400 drop-shadow-md">22,5%</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-slate-300">181 a 360 dias</td>
                            <td className="p-4 text-right font-black text-orange-400 drop-shadow-md">20,0%</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-slate-300">361 a 720 dias</td>
                            <td className="p-4 text-right font-black text-yellow-400 drop-shadow-md">17,5%</td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="p-4 text-slate-300">Acima de 720 dias</td>
                            <td className="p-4 text-right font-black text-emerald-400 drop-shadow-md">15,0%</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                <div className="p-5 bg-white/5 border-b border-white/5">
                    <h3 className="font-bold text-white tracking-wide">Renda Variável (Ações/FIIs)</h3>
                </div>
                <div className="p-4 space-y-2">
                    <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition-colors">
                        <span className="text-slate-300">Swing Trade (Ações)</span>
                        <span className="font-black text-white">15%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition-colors">
                        <span className="text-slate-300">Day Trade</span>
                        <span className="font-black text-red-400">20%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition-colors">
                        <span className="text-slate-300">FIIs (Rendimento)</span>
                        <span className="font-black text-emerald-400">Isento</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CalendarioEconomico() {
    return (
        <div className="space-y-4 animate-in fade-in duration-300">
            {[{ title: "Decisão do Copom (Selic)", date: "Hoje, 18:30", impact: "Alto", color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30" },
            { title: "IPCA (Inflação BR)", date: "Amanhã, 09:00", impact: "Alto", color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30" },
            { title: "Payroll (Empregos EUA)", date: "Sexta, 09:30", impact: "Alto", color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30" },
            { title: "Vendas no Varejo (BR)", date: "Segunda, 09:00", impact: "Médio", color: "text-amber-400", bg: "bg-amber-500/20", border: "border-amber-500/30" }
            ].map((ev, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl p-5 rounded-3xl border border-white/10 flex justify-between items-center shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] hover:bg-white/10 transition-colors">
                    <div>
                        <h4 className="font-semibold text-slate-100">{ev.title}</h4>
                        <p className="text-sm text-slate-400 mt-1">{ev.date}</p>
                    </div>
                    <span className={`text-[10px] uppercase font-black px-3 py-1.5 rounded-full ${ev.bg} ${ev.border} ${ev.color} border shadow-inner`}>
                        {ev.impact}
                    </span>
                </div>
            ))}
        </div>
    );
}
