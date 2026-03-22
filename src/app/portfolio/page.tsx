"use client";

import { useState, useEffect } from "react";
import { SecureStorage } from "@/lib/storage";
import { Plus, User, ShieldAlert, BadgeDollarSign, Trash2 } from "lucide-react";

interface Client {
    id: string;
    initials: string;
    aum: number;
    risk: "Conservador" | "Moderado" | "Arrojado";
}

export default function PortfolioPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [showAdd, setShowAdd] = useState(false);

    // Form state
    const [initials, setInitials] = useState("");
    const [aum, setAum] = useState("");
    const [risk, setRisk] = useState<Client["risk"]>("Moderado");

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        const data = await SecureStorage.getItem<Client[]>("portfolio_clients");
        if (data) setClients(data);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!initials || !aum) return;

        const newClient: Client = {
            id: crypto.randomUUID(),
            initials: initials.toUpperCase(),
            aum: parseFloat(aum),
            risk
        };

        const updated = [...clients, newClient];
        await SecureStorage.setItem("portfolio_clients", updated);
        setClients(updated);
        setShowAdd(false);
        setInitials("");
        setAum("");
        setRisk("Moderado");
    };

    const handleRemove = async (id: string) => {
        const updated = clients.filter((c) => c.id !== id);
        await SecureStorage.setItem("portfolio_clients", updated);
        setClients(updated);
    };

    const totalAum = clients.reduce((acc, c) => acc + c.aum, 0);

    return (
        <div className="p-4 flex flex-col h-full overflow-y-auto pb-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Portfólio Seguro</h1>
                    <p className="text-slate-400 text-sm flex items-center gap-1 mt-1">
                        <ShieldAlert className="w-4 h-4 text-emerald-500" />
                        Dados encriptados localmente
                    </p>
                </div>
                <button
                    onClick={() => setShowAdd(!showAdd)}
                    className="bg-blue-600 hover:bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg shadow-blue-900/50"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            <div className="bg-gradient-to-br from-blue-900/40 to-slate-800 border border-blue-800/50 rounded-2xl p-5 mb-6 shadow-xl">
                <p className="text-blue-200 text-sm font-medium mb-1">AUM Total Local</p>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                    R$ {totalAum.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </h2>
                <div className="mt-4 flex gap-4 text-sm text-slate-300">
                    <div><span className="font-semibold text-white">{clients.length}</span> clientes ativos</div>
                </div>
            </div>

            {showAdd && (
                <form onSubmit={handleAdd} className="bg-slate-800 border border-slate-700 rounded-2xl p-4 mb-6 animate-in slide-in-from-top-4 fade-in duration-200">
                    <h3 className="font-semibold mb-4 text-slate-200">Adicionar Cliente (Anônimo)</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-slate-400 mb-1 block">Iniciais / Apelido</label>
                            <input
                                type="text"
                                autoFocus
                                maxLength={5}
                                value={initials}
                                onChange={(e) => setInitials(e.target.value)}
                                placeholder="Ex: JSA"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors uppercase"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-slate-400 mb-1 block">Patrimônio (AUM - R$)</label>
                            <input
                                type="number"
                                value={aum}
                                onChange={(e) => setAum(e.target.value)}
                                placeholder="1000000"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-slate-400 mb-1 block">Perfil de Risco</label>
                            <select
                                value={risk}
                                onChange={(e) => setRisk(e.target.value as Client["risk"])}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                            >
                                <option value="Conservador">Conservador</option>
                                <option value="Moderado">Moderado</option>
                                <option value="Arrojado">Arrojado</option>
                            </select>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowAdd(false)}
                                className="flex-1 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-medium transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
                            >
                                Salvar Local
                            </button>
                        </div>
                    </div>
                </form>
            )}

            <div className="space-y-3">
                {clients.length === 0 && !showAdd && (
                    <div className="text-center py-10 bg-slate-800/50 rounded-2xl border border-slate-700/50 border-dashed">
                        <User className="w-10 h-10 text-slate-500 mx-auto mb-3 opacity-50" />
                        <p className="text-slate-400 text-sm">Nenhum cliente cadastrado.</p>
                        <p className="text-slate-500 text-xs mt-1">Os dados ficam salvos apenas neste aparelho.</p>
                    </div>
                )}

                {clients.map((client) => (
                    <div key={client.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">
                                {client.initials}
                            </div>
                            <div>
                                <p className="font-semibold text-slate-200">R$ {client.aum.toLocaleString("pt-BR")}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${client.risk === 'Conservador' ? 'bg-emerald-500/10 text-emerald-400' :
                                            client.risk === 'Moderado' ? 'bg-blue-500/10 text-blue-400' :
                                                'bg-orange-500/10 text-orange-400'
                                        }`}>
                                        {client.risk}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => handleRemove(client.id)}
                            className="text-slate-500 hover:text-red-400 p-2 opacity-0 group-hover:opacity-100 transition-all rounded-full hover:bg-red-400/10"
                            title="Apagar cliente"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
