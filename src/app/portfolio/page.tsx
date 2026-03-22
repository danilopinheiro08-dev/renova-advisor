"use client";

import { useState, useEffect } from "react";
import { SecureStorage } from "@/lib/storage";
import { Plus, Trash2, Users, TrendingUp, ShieldCheck, ChevronRight, X, User } from "lucide-react";

interface Client {
    id: string;
    name: string;
    risk: string;
    aum: number;
}

export default function PortfolioPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [showAdd, setShowAdd] = useState(false);
    const [newName, setNewName] = useState("");
    const [newRisk, setNewRisk] = useState("Moderado");
    const [newAum, setNewAum] = useState("");

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        const data = await SecureStorage.getItem<Client[]>("portfolio_clients");
        if (data) setClients(data);
    };

    const addClient = async () => {
        if (!newName || !newAum) return;
        const newClient: Client = {
            id: Math.random().toString(36).substr(2, 9),
            name: newName,
            risk: newRisk,
            aum: Number(newAum),
        };
        const updated = [...clients, newClient];
        await SecureStorage.setItem("portfolio_clients", updated);
        setClients(updated);
        setNewName("");
        setNewAum("");
        setShowAdd(false);
    };

    const deleteClient = async (id: string) => {
        const updated = clients.filter(c => c.id !== id);
        await SecureStorage.setItem("portfolio_clients", updated);
        setClients(updated);
    };

    const totalAum = clients.reduce((acc, c) => acc + c.aum, 0);

    return (
        <div className="flex flex-col h-full bg-mesh absolute inset-0 pb-20 pt-16 p-5 overflow-y-auto">
            {/* Header Profile Style */}
            <div className="flex items-center justify-between mb-8 px-1">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Portfólio</h1>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Gestão de Alocação</p>
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus size={24} />
                </button>
            </div>

            {/* Stats Overview */}
            <div className="glass-card rounded-[32px] p-6 mb-8 relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-emerald-500/10 rounded-full blur-[60px] animate-pulse"></div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Users size={20} className="text-slate-400" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Total de Clientes</p>
                        <h3 className="text-lg font-bold text-white mt-1">{clients.length} Investidores</h3>
                    </div>
                </div>

                <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">AUM Consolidado</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-slate-500">R$</span>
                        <h2 className="text-3xl font-black text-white tracking-tighter drop-shadow-sm">
                            {totalAum.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Client List */}
            <div className="space-y-4 px-1 pb-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Lista de Contatos</h3>
                    <span className="text-[10px] bg-white/10 border border-white/10 text-white px-2.5 py-1 rounded-full font-bold">A-Z</span>
                </div>

                {clients.length === 0 ? (
                    <div className="glass-card rounded-[28px] p-10 text-center border-dashed opacity-60">
                        <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400 font-medium text-sm">Nenhum cliente cadastrado localmente.</p>
                    </div>
                ) : (
                    clients.map(client => (
                        <div key={client.id} className="glass-card rounded-[28px] p-5 flex items-center gap-4 group hover:bg-white/[0.05] transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                                <User size={20} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-bold leading-tight truncate tracking-tight">{client.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase border tracking-widest ${client.risk === 'Arrojado' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                            client.risk === 'Moderado' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        }`}>
                                        {client.risk}
                                    </span>
                                    <span className="text-slate-500 text-[11px] font-bold">R$ {client.aum.toLocaleString()}</span>
                                </div>
                            </div>
                            <button onClick={() => deleteClient(client.id)} className="w-9 h-9 flex items-center justify-center text-slate-700 hover:text-red-400 transition-colors">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Add Client Modal Overlay */}
            {showAdd && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="glass-card w-full max-w-lg rounded-[40px] p-8 shadow-[0_32px_128px_rgba(0,0,0,0.8)] border-white/20 animate-in slide-in-from-bottom-20 duration-500">
                        <div className="flex justify-between items-center mb-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                <Plus size={24} className="text-white" />
                            </div>
                            <button onClick={() => setShowAdd(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>

                        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Novo Investidor</h2>
                        <p className="text-slate-400 text-sm mb-8 font-medium">Os dados serão criptografados e salvos localmente.</p>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block ml-1">Iniciais ou Apelido</label>
                                <input
                                    type="text"
                                    placeholder="Ex: J. Silva"
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500/50 outline-none transition-all shadow-inner"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block ml-1">Capital (AUM)</label>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        value={newAum}
                                        onChange={e => setNewAum(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500/50 outline-none transition-all shadow-inner"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block ml-1">Risk Profile</label>
                                    <select
                                        value={newRisk}
                                        onChange={e => setNewRisk(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500/50 outline-none transition-all shadow-inner appearance-none"
                                    >
                                        <option value="Conservador">Conservador</option>
                                        <option value="Moderado">Moderado</option>
                                        <option value="Arrojado">Arrojado</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                onClick={addClient}
                                className="w-full py-4 bg-white text-black rounded-2xl font-black text-lg mt-4 shadow-xl active:scale-95 transition-all hover:bg-slate-200"
                            >
                                Salvar Localmente
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
