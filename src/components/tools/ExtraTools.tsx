"use client";

import { useState } from "react";
import { Copy, Check, PieChart, ShieldAlert, FileText } from "lucide-react";

const glassCard = "bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all";
const glassInput = "w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-3 text-white focus:border-blue-500/50 outline-none transition-colors shadow-inner";

// 1. Marcação a Mercado
export function MtmCalc() {
    const [taxaCompra, setTaxaCompra] = useState(12);
    const [taxaAtual, setTaxaAtual] = useState(10);
    const [duration, setDuration] = useState(3);
    const [puOriginal, setPuOriginal] = useState(1000);

    const puMercado = puOriginal * Math.pow((1 + taxaCompra / 100) / (1 + taxaAtual / 100), duration);
    const agioDesagio = ((puMercado / puOriginal) - 1) * 100;

    return (
        <div className="space-y-6 animate-in fade-in">
            <div className={`${glassCard} text-center relative overflow-hidden`}>
                <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[200%] bg-gradient-to-br from-rose-500/10 to-transparent blur-3xl -z-10"></div>
                <h3 className="text-slate-300 text-sm mb-2 font-medium">PU Marcação a Mercado</h3>
                <p className="text-4xl font-black text-white drop-shadow-md tracking-tight">R$ {puMercado.toFixed(2)}</p>
                <p className={`mt-2 font-bold ${agioDesagio >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {agioDesagio >= 0 ? '+' : ''}{agioDesagio.toFixed(2)}% ({agioDesagio >= 0 ? 'Ágio' : 'Deságio'})
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs text-slate-400 mb-2 block ml-1">PU Compra</label><input type="number" value={puOriginal} onChange={e => setPuOriginal(Number(e.target.value))} className={glassInput} /></div>
                <div><label className="text-xs text-slate-400 mb-2 block ml-1">Duration (A)</label><input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} className={glassInput} /></div>
                <div><label className="text-xs text-slate-400 mb-2 block ml-1">Tx Compra (%)</label><input type="number" value={taxaCompra} onChange={e => setTaxaCompra(Number(e.target.value))} className={glassInput} /></div>
                <div><label className="text-xs text-slate-400 mb-2 block ml-1">Tx Atual (%)</label><input type="number" value={taxaAtual} onChange={e => setTaxaAtual(Number(e.target.value))} className={glassInput} /></div>
            </div>
        </div>
    );
}

// 2. Suitability
export function SuitabilityQuiz() {
    const [score, setScore] = useState(0);
    const profile = score < 3 ? "Conservador" : score < 6 ? "Moderado" : "Arrojado";
    return (
        <div className="space-y-5 animate-in fade-in">
            <div>
                <label className="text-sm text-slate-300 mb-2 block ml-1 font-medium">Tolerância a perdas (-10% em 1 mês)?</label>
                <select onChange={(e) => setScore(s => s + Number(e.target.value))} className={glassInput}>
                    <option value="0">Resgato tudo / Desespero</option>
                    <option value="1">Preocupo, mas aguardo</option>
                    <option value="2">Aproveito para comprar mais</option>
                </select>
            </div>
            <div>
                <label className="text-sm text-slate-300 mb-2 block ml-1 font-medium">Objetivo principal</label>
                <select onChange={(e) => setScore(s => s + Number(e.target.value))} className={glassInput}>
                    <option value="0">Proteger patrimônio</option>
                    <option value="1">Crescimento moderado</option>
                    <option value="2">Multiplicação agressiva</option>
                </select>
            </div>
            <div className={`${glassCard} text-center relative overflow-hidden mt-8`}>
                <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-20 -z-10 ${profile === 'Conservador' ? 'bg-emerald-500' : profile === 'Moderado' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                <p className="text-slate-400 text-sm mb-1 uppercase tracking-wider font-bold">Perfil Estimado</p>
                <h2 className={`text-3xl font-black drop-shadow-md ${profile === 'Conservador' ? 'text-emerald-400' : profile === 'Moderado' ? 'text-blue-400' : 'text-orange-400'}`}>{profile}</h2>
            </div>
        </div>
    );
}

// 3. Juros Reais
export function JurosReaisCalc() {
    const [nominal, setNominal] = useState(11.75);
    const [inflacao, setInflacao] = useState(4.5);
    const real = (((1 + nominal / 100) / (1 + inflacao / 100)) - 1) * 100;

    return (
        <div className="space-y-6 animate-in fade-in">
            <div className={`${glassCard} text-center relative overflow-hidden`}>
                <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[200%] bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl -z-10"></div>
                <p className="text-slate-300 text-sm font-medium mb-1">Ganho Real (Líquido IPCA)</p>
                <h2 className="text-4xl font-black text-cyan-400 drop-shadow-md">{real.toFixed(2)}% <span className="text-lg font-normal text-slate-400">a.a.</span></h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs text-slate-400 block ml-1 mb-2">Tx Nominal (% a.a)</label><input type="number" value={nominal} onChange={e => setNominal(Number(e.target.value))} className={glassInput} /></div>
                <div><label className="text-xs text-slate-400 block ml-1 mb-2">Inflação (% a.a)</label><input type="number" value={inflacao} onChange={e => setInflacao(Number(e.target.value))} className={glassInput} /></div>
            </div>
        </div>
    );
}

// 4. CDI vs Poupança
export function CdiVsPoupanca() {
    const [cdi, setCdi] = useState(11.65);
    const [percentCdi, setPercentCdi] = useState(100);

    const rendimentoPoupanca = cdi > 8.5 ? 6.17 : (cdi * 0.7);
    const rendimentoCdiLiq = ((cdi * (percentCdi / 100)) * 0.85);
    const diff = rendimentoCdiLiq - rendimentoPoupanca;

    return (
        <div className="space-y-6 animate-in fade-in">
            <div className={`${glassCard} flex justify-between items-center relative overflow-hidden`}>
                <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[200%] bg-gradient-to-br from-fuchsia-500/10 to-transparent blur-3xl -z-10"></div>
                <div>
                    <p className="text-slate-300 text-xs font-medium mb-1">CDI {percentCdi}% (Líq)</p>
                    <p className="text-2xl font-black text-fuchsia-400 drop-shadow-md">{rendimentoCdiLiq.toFixed(2)}%</p>
                </div>
                <div className="text-right">
                    <p className="text-slate-300 text-xs font-medium mb-1">Poupança Nova</p>
                    <p className="text-2xl font-black text-red-400 drop-shadow-md">{rendimentoPoupanca.toFixed(2)}%</p>
                </div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-center">
                <p className="text-sm font-semibold text-emerald-400">O CDB rende {diff.toFixed(2)}% a mais ao ano.</p>
            </div>

            <div className="pt-4"><label className="text-xs text-slate-300 block mb-3 font-bold flex justify-between">Percentual do CDI: <span className="text-fuchsia-400">{percentCdi}%</span></label><input type="range" min="80" max="130" value={percentCdi} onChange={e => setPercentCdi(Number(e.target.value))} className="w-full accent-fuchsia-500" /></div>
        </div>
    );
}

// 5. Monitor FGC
export function FgcMonitor() {
    const [value, setValue] = useState(300000);
    const limiteFGC = 250000;

    return (
        <div className="space-y-6 animate-in fade-in">
            <div className={`${glassCard} text-center relative overflow-hidden ${value > limiteFGC ? '!border-red-500/30' : '!border-emerald-500/30'}`}>
                <div className={`absolute top-[-50%] left-[-10%] w-[120%] h-[200%] blur-3xl -z-10 ${value > limiteFGC ? 'bg-gradient-to-br from-red-500/10' : 'bg-gradient-to-br from-emerald-500/10'}`}></div>
                <ShieldAlert className={`w-10 h-10 mx-auto mb-3 drop-shadow-md ${value > limiteFGC ? 'text-red-400' : 'text-emerald-400'}`} />
                <h2 className="text-xl font-black text-white mb-2 tracking-wide">{value > limiteFGC ? 'ALERTA: FGC Excedido' : 'Cobertura FGC OK'}</h2>
                <p className="text-sm text-slate-300 font-medium">Risco exposto: <b className={`${value > limiteFGC ? 'text-red-400' : 'text-emerald-400'}`}>{value > limiteFGC ? 'R$ ' + (value - limiteFGC).toLocaleString() : 'R$ 0'}</b></p>
            </div>
            <div><label className="text-xs text-slate-400 block ml-1 mb-2">Valor Total na Instituição (CDB, LCI...)</label><input type="number" value={value} onChange={e => setValue(Number(e.target.value))} className={glassInput} /></div>
        </div>
    );
}

// 6. PGBL vs VGBL
export function PgblVgbl() {
    const [irCompleta, setIrCompleta] = useState(true);

    return (
        <div className="space-y-6 animate-in fade-in">
            <label className="text-sm text-slate-300 block font-medium">Como o cliente declara o I.R.?</label>
            <div className="flex gap-3 mb-2">
                <button onClick={() => setIrCompleta(true)} className={`flex-1 p-4 rounded-2xl border font-bold shadow-lg transition-all ${irCompleta ? 'bg-teal-600/20 border-teal-500/50 text-teal-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}>Completa</button>
                <button onClick={() => setIrCompleta(false)} className={`flex-1 p-4 rounded-2xl border font-bold shadow-lg transition-all ${!irCompleta ? 'bg-teal-600/20 border-teal-500/50 text-teal-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}>Simplificada</button>
            </div>

            <div className={`${glassCard} relative overflow-hidden`}>
                <div className="absolute top-[-50%] right-[-10%] w-[100%] h-[200%] bg-gradient-to-bl from-teal-500/10 to-transparent blur-3xl -z-10"></div>
                <h3 className="font-black text-xl mb-3 text-white flex items-center gap-2"><FileText className="w-5 h-5 text-teal-400" /> {irCompleta ? 'Sugerido: PGBL' : 'Sugerido: VGBL'}</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                    {irCompleta
                        ? "Com a contabilidade completa, o cliente ganha enorme eficiência fiscal ao deduzir os aportes do PGBL em até 12% da Renda Bruta Tributável anual."
                        : "Para a declaração simplificada, o VGBL é indiscutivelmente melhor, pois o IR incide somente sobre os rendimentos auferidos no resgate, sem misturar com a base calculada do salário."}
                </p>
            </div>
        </div>
    );
}

// 7. Rebalanceamento
export function RebalanceCalc() {
    const [rf, setRf] = useState(60000);
    const [rv, setRv] = useState(40000);
    const [targetRf, setTargetRf] = useState(70);

    const total = rf + rv;
    const targetRfVal = total * (targetRf / 100);
    const diffRf = targetRfVal - rf;

    return (
        <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs text-slate-400 block ml-1 mb-2">Saldo RF</label><input type="number" value={rf} onChange={e => setRf(Number(e.target.value))} className={glassInput} /></div>
                <div><label className="text-xs text-slate-400 block ml-1 mb-2">Saldo RV</label><input type="number" value={rv} onChange={e => setRv(Number(e.target.value))} className={glassInput} /></div>
            </div>
            <div className="pt-2">
                <label className="text-xs text-slate-300 block mb-3 font-bold flex justify-between">Target RF: <span className="text-orange-400">{targetRf}%</span> Target RV: <span className="text-indigo-400">{100 - targetRf}%</span></label>
                <input type="range" min="0" max="100" value={targetRf} onChange={e => setTargetRf(Number(e.target.value))} className="w-full accent-orange-500" />
            </div>
            <div className={`${glassCard} text-center overflow-hidden relative`}>
                <div className={`absolute top-[-50%] left-[-10%] w-[120%] h-[200%] blur-3xl -z-10 ${diffRf === 0 ? 'bg-gradient-to-br from-emerald-500/10' : diffRf > 0 ? 'bg-gradient-to-br from-blue-500/10' : 'bg-gradient-to-br from-orange-500/10'}`}></div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Recomendação</p>
                {Math.abs(diffRf) < 100 ? (
                    <p className="text-emerald-400 font-black text-xl">Carteira 100% balanceada!</p>
                ) : diffRf > 0 ? (
                    <p className="text-blue-400 font-bold text-lg leading-snug tracking-tight">Vender <span className="text-white bg-white/10 px-2 py-1 rounded">R$ {diffRf.toLocaleString()}</span> de RV e comprar RF.</p>
                ) : (
                    <p className="text-orange-400 font-bold text-lg leading-snug tracking-tight">Vender <span className="text-white bg-white/10 px-2 py-1 rounded">R$ {Math.abs(diffRf).toLocaleString()}</span> de RF e comprar RV.</p>
                )}
            </div>
        </div>
    );
}

// 8. Conversor Taxas
export function TaxConverter() {
    const [taxaAa, setTaxaAa] = useState(12);
    const taxaAm = (Math.pow(1 + taxaAa / 100, 1 / 12) - 1) * 100;

    return (
        <div className="space-y-6 animate-in fade-in">
            <div className={`${glassCard} text-center relative overflow-hidden`}>
                <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[200%] bg-gradient-to-br from-violet-500/10 to-transparent blur-3xl -z-10"></div>
                <h3 className="text-slate-300 text-sm mb-2 font-medium">Taxa Mensal Equivalente</h3>
                <h2 className="text-4xl font-black text-violet-400 drop-shadow-md">{taxaAm.toFixed(3)}% <span className="text-lg font-normal text-slate-400">a.m.</span></h2>
            </div>
            <div><label className="text-xs text-slate-400 block ml-1 mb-2">Taxa Anual (% a.a)</label><input type="number" step="0.1" value={taxaAa} onChange={e => setTaxaAa(Number(e.target.value))} className={glassInput} /></div>
        </div>
    );
}

// 9. Lâmina Fundo Comparator
export function FundSnapshot() {
    return (
        <div className="space-y-6 animate-in fade-in">
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 border-dashed flex flex-col items-center justify-center h-56 text-center shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 to-transparent z-0"></div>
                <PieChart className="w-12 h-12 text-yellow-400/50 mb-4 z-10 drop-shadow-lg" />
                <p className="text-slate-200 text-sm font-semibold z-10">Modo Offline Detectado.</p>
                <p className="text-slate-400 text-xs mt-2 max-w-[250px] z-10">Este painel carrega dinamicamente Lâminas CVM para comparar Alpha e Sharpe.</p>
            </div>
        </div>
    );
}

// 10. One-Pager Export
export function OnePagerExport() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("Prezado(a),\n\nAqui vai o sumário do nosso papo financeiro hoje:\n- Alvo alcançado com Juros Compostos: R$ 1MM\n- Oportunidade identificada: PGBL ganho tributário.\n\nAcesso de relatórios na plataforma BTG/Renova.");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="space-y-6 animate-in fade-in">
            <p className="text-sm text-slate-300 font-medium">Capture um Pitch textual profissional agregando os dados visualizados hoje para colar no WhatsApp.</p>
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-5 rounded-2xl text-sm text-slate-300 font-mono shadow-inner leading-relaxed relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                Prezado(a),<br /><br />Aqui vai o sumário do nosso papo financeiro hoje:<br />- Alvo alcançado com Juros Compostos...
            </div>
            <button onClick={handleCopy} className="w-full bg-emerald-600/80 hover:bg-emerald-500/90 backdrop-blur-md border border-emerald-400/30 text-white p-4 rounded-2xl font-bold flex gap-2 items-center justify-center transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1">
                {copied ? <Check className="w-5 h-5 drop-shadow-md" /> : <Copy className="w-5 h-5 drop-shadow-md" />} {copied ? 'Copiado p/ Área de Transferência!' : 'Copiar Pitch de Vendas'}
            </button>
        </div>
    );
}
