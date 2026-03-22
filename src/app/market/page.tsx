"use client";

import { useState, useEffect } from "react";
import { getMarketData } from "@/lib/market";
import { TrendingUp, TrendingDown, DollarSign, RefreshCw, Rss } from "lucide-react";

export default function MarketPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const result = await getMarketData();
        if (result) setData(result);
        setLoading(false);
    };

    return (
        <div className="flex flex-col h-full absolute inset-0 pb-16 pt-14 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Mercado Ao Vivo</h1>
                <button onClick={fetchData} className="p-2 border border-slate-700 bg-slate-800 rounded-full hover:bg-slate-700 transition">
                    <RefreshCw className={`w-4 h-4 text-blue-400 ${loading ? "animate-spin" : ""}`} />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <AssetCard
                    title="Dólar Comercial"
                    value={data?.usd?.bid}
                    pct={data?.usd?.pctChange}
                    loading={loading}
                    prefix="R$ "
                />
                <AssetCard
                    title="Euro"
                    value={data?.eur?.bid}
                    pct={data?.eur?.pctChange}
                    loading={loading}
                    prefix="R$ "
                />
                <AssetCard
                    title="Bitcoin"
                    value={data?.btc?.bid}
                    pct={data?.btc?.pctChange}
                    loading={loading}
                    prefix="R$ "
                />
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 col-span-2 flex items-center justify-between">
                    <div>
                        <h3 className="text-slate-400 text-xs font-medium mb-1">CDI Hoje</h3>
                        <p className="font-bold text-xl">11,65% <span className="text-xs text-slate-500 font-normal">a.a.</span></p>
                    </div>
                    <div>
                        <h3 className="text-slate-400 text-xs font-medium mb-1 text-right">IPCA (12m)</h3>
                        <p className="font-bold text-xl text-right">4,50%</p>
                    </div>
                </div>
            </div>

            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Rss className="w-5 h-5 text-orange-400" /> Radar de Notícias
            </h2>

            <div className="space-y-3">
                {[
                    { text: "Bolsa fecha em alta puxada por commodities e falas do BC.", font: "Valor Econômico", time: "Há 10 min" },
                    { text: "Copom sinaliza possível corte de juros se meta for alcançada.", font: "InfoMoney", time: "Há 45 min" },
                    { text: "Bitcoin supera nova máxima histórica após ETF.", font: "Bloomberg", time: "Há 2 horas" }
                ].map((news, i) => (
                    <a key={i} href="#" className="block bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-slate-500 transition-colors">
                        <p className="text-sm font-medium text-slate-200 mb-2 leading-relaxed">{news.text}</p>
                        <div className="flex justify-between items-center text-xs text-slate-500">
                            <span className="font-bold text-blue-400">{news.font}</span>
                            <span>{news.time}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

function AssetCard({ title, value, pct, loading, prefix = "" }: any) {
    const isPositive = Number(pct) >= 0;

    return (
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col justify-between">
            <h3 className="text-slate-400 text-xs font-medium mb-2">{title}</h3>
            {loading ? (
                <div className="h-8 w-16 bg-slate-700 animate-pulse rounded"></div>
            ) : (
                <>
                    <p className="font-bold text-lg mb-1">{prefix}{Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(Number(pct))}%
                    </div>
                </>
            )}
        </div>
    );
}
