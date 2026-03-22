"use client";

import { useState } from "react";
import { Calculator, Calendar, Newspaper, Download, Percent, Landmark } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ToolsPage() {
    const params = useSearchParams();
    const initialTool = params.get("tool") || "juros";
    const [activeTab, setActiveTab] = useState(initialTool);

    const tabs = [
        { id: "juros", label: "Juros", icon: Percent },
        { id: "ir", label: "Imp. Renda", icon: Landmark },
        { id: "calendar", label: "Calendário", icon: Calendar }
    ];

    return (
        <div className="flex flex-col h-full bg-slate-900 absolute inset-0 pb-16 pt-14">
            <div className="flex px-4 py-3 gap-2 overflow-x-auto no-scrollbar border-b border-slate-800 sticky top-0 bg-slate-900/90 z-10 backdrop-blur-md">
                {tabs.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === t.id ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                            }`}
                    >
                        <t.icon className="w-4 h-4" />
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                {activeTab === "juros" && <JurosCalculator />}
                {activeTab === "ir" && <TabelaIR />}
                {activeTab === "calendar" && <CalendarioEconomico />}
            </div>
        </div>
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
            <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                <h2 className="text-sm font-medium text-slate-400 mb-1">Montante Final Projetado</h2>
                <h1 className="text-3xl font-bold text-blue-400">R$ {montanteFinal.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}</h1>

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
                    <label className="text-xs text-slate-400 block mb-1">Aporte Inicial (R$)</label>
                    <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 focus:border-blue-500 outline-none transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-slate-400 block mb-1">Aporte Mensal (R$)</label>
                        <input type="number" value={mensal} onChange={(e) => setMensal(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 focus:border-blue-500 outline-none transition-colors" />
                    </div>
                    <div>
                        <label className="text-xs text-slate-400 block mb-1">Taxa (% a.a.)</label>
                        <input type="number" step="0.1" value={taxaAa} onChange={(e) => setTaxaAa(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-100 focus:border-blue-500 outline-none transition-colors" />
                    </div>
                </div>
                <div>
                    <label className="text-xs text-slate-400 block mb-1">Prazo (Anos)</label>
                    <input type="range" min="1" max="50" value={anos} onChange={(e) => setAnos(Number(e.target.value))} className="w-full mt-2 accent-blue-500" />
                    <div className="text-center font-medium mt-1">{anos} anos</div>
                </div>
            </div>

            <button className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors">
                <Download className="w-4 h-4" /> Exportar Imagem (WhatsApp)
            </button>
        </div>
    );
}

function TabelaIR() {
    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="p-4 bg-slate-800 border-b border-slate-700">
                    <h3 className="font-bold text-slate-200">Tabela Regressiva (Renda Fixa)</h3>
                    <p className="text-xs text-slate-400 mt-1">Válida para CDB, LC, Tesouro Direto.</p>
                </div>
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-b border-slate-700/50">
                            <td className="p-3 text-slate-300">Até 180 dias</td>
                            <td className="p-3 text-right font-bold text-red-400">22,5%</td>
                        </tr>
                        <tr className="border-b border-slate-700/50">
                            <td className="p-3 text-slate-300">181 a 360 dias</td>
                            <td className="p-3 text-right font-bold text-orange-400">20,0%</td>
                        </tr>
                        <tr className="border-b border-slate-700/50">
                            <td className="p-3 text-slate-300">361 a 720 dias</td>
                            <td className="p-3 text-right font-bold text-yellow-400">17,5%</td>
                        </tr>
                        <tr>
                            <td className="p-3 text-slate-300">Acima de 720 dias</td>
                            <td className="p-3 text-right font-bold text-emerald-400">15,0%</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="p-4 bg-slate-800 border-b border-slate-700">
                    <h3 className="font-bold text-slate-200">Renda Variável (Ações/FIIs)</h3>
                </div>
                <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-300">Swing Trade (Ações)</span>
                        <span className="font-bold">15%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-300">Day Trade</span>
                        <span className="font-bold text-red-400">20%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-300">FIIs (Rendimento)</span>
                        <span className="font-bold text-emerald-400">Isento*</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-300">FIIs (Venda com Lucro)</span>
                        <span className="font-bold">20%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CalendarioEconomico() {
    return (
        <div className="space-y-4 animate-in fade-in duration-300">
            {[{ title: "Decisão do Copom (Selic)", date: "Hoje, 18:30", impact: "Alto", color: "text-red-400" },
            { title: "IPCA (Inflação BR)", date: "Amanhã, 09:00", impact: "Alto", color: "text-red-400" },
            { title: "Payroll (Empregos EUA)", date: "Sexta, 09:30", impact: "Alto", color: "text-red-400" },
            { title: "Vendas no Varejo (BR)", date: "Segunda, 09:00", impact: "Médio", color: "text-yellow-400" }
            ].map((ev, i) => (
                <div key={i} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
                    <div>
                        <h4 className="font-medium text-slate-200">{ev.title}</h4>
                        <p className="text-xs text-slate-400 mt-1">{ev.date}</p>
                    </div>
                    <span className={`text-xs font-bold uppercase px-2 py-1 bg-slate-900 rounded border border-slate-700 ${ev.color}`}>
                        {ev.impact}
                    </span>
                </div>
            ))}
            <p className="text-xs text-center text-slate-500 mt-4">Dados fornecidos via API</p>
        </div>
    );
}
