"use client";

import { useEffect, useMemo, useState } from "react";
import { SecureStorage } from "@/lib/storage";
import {
  Activity,
  Plus,
  ShieldCheck,
  Trash2,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  risk: string;
  aum: number;
}

const riskStyles: Record<string, string> = {
  Arrojado: "bg-orange-400/10 text-orange-200 border-orange-300/20",
  Moderado: "bg-cyan-300/10 text-cyan-100 border-cyan-300/20",
  Conservador: "bg-emerald-400/10 text-emerald-200 border-emerald-300/20",
};

export default function PortfolioPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRisk, setNewRisk] = useState("Moderado");
  const [newAum, setNewAum] = useState("");

  useEffect(() => {
    const loadClients = async () => {
      const data = await SecureStorage.getItem<Client[]>("portfolio_clients");
      if (data) setClients(data);
    };

    void loadClients();
  }, []);

  const addClient = async () => {
    if (!newName || !newAum) return;

    const newClient: Client = {
      id: Math.random().toString(36).slice(2, 11),
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
    const updated = clients.filter((client) => client.id !== id);
    await SecureStorage.setItem("portfolio_clients", updated);
    setClients(updated);
  };

  const totalAum = useMemo(() => clients.reduce((acc, client) => acc + client.aum, 0), [clients]);
  const averageTicket = clients.length ? totalAum / clients.length : 0;

  return (
    <div className="animate-page mx-auto flex min-h-full w-full max-w-xl flex-col px-4 pb-32 pt-6 sm:px-5">
      <section className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="accent-chip mb-4 w-fit">
            <ShieldCheck size={14} />
            Portfolio desk
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Portfólio</h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
            Uma área de carteira mais refinada, com cards volumétricos e leitura rápida para perfil, base ativa e AUM consolidado.
          </p>
        </div>

        <button onClick={() => setShowAdd(true)} className="app-button h-14 w-14 shrink-0 rounded-[22px] p-0">
          <Plus size={22} />
        </button>
      </section>

      <section className="glass-card relative mb-6 overflow-hidden rounded-[32px] p-6">
        <div className="absolute right-[-10%] top-[-18%] h-36 w-36 rounded-full bg-cyan-300/10 blur-[80px]" />
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--text-tertiary)]">Resumo consolidado</p>
            <h2 className="mt-2 text-3xl font-extrabold text-white">R$ {totalAum.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">AUM consolidado da operação local.</p>
          </div>
          <div className="stat-orb flex h-16 w-16 items-center justify-center rounded-full text-cyan-200">
            <Wallet size={20} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Clientes", value: String(clients.length), icon: Users },
            { label: "Ticket médio", value: `R$ ${averageTicket.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`, icon: Activity },
            { label: "Sigilo", value: "Local", icon: ShieldCheck },
          ].map((item) => (
            <div key={item.label} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="icon-container p-3 text-cyan-200">
                  <item.icon size={16} />
                </div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{item.label}</p>
              <p className="mt-2 text-sm font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4 flex items-center justify-between px-1">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--text-tertiary)]">Base local</p>
          <h3 className="mt-1 text-xl font-bold text-white">Investidores cadastrados</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
          A-Z
        </span>
      </section>

      <section className="space-y-4 pb-4">
        {clients.length === 0 ? (
          <div className="premium-card rounded-[30px] p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/10 bg-white/5 text-[var(--text-tertiary)]">
              <Users size={24} />
            </div>
            <p className="text-base font-bold text-white">Nenhum investidor cadastrado.</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              Adicione clientes para começar a usar a nova experiência visual do módulo de portfólio.
            </p>
          </div>
        ) : (
          clients.map((client) => (
            <div key={client.id} className="premium-card flex items-center gap-4 rounded-[30px] p-5">
              <div className="icon-container text-cyan-200">
                <User size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="truncate text-base font-bold text-white">{client.name}</h4>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">R$ {client.aum.toLocaleString("pt-BR")}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${riskStyles[client.risk] ?? riskStyles.Moderado}`}>
                    {client.risk}
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteClient(client.id)}
                className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-white/10 bg-white/5 text-[var(--text-tertiary)] transition-colors hover:text-red-300"
                aria-label={`Remover ${client.name}`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </section>

      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#040612]/80 p-4 backdrop-blur-md sm:items-center">
          <div className="glass-card w-full max-w-lg rounded-[36px] p-6 sm:p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--text-tertiary)]">Novo cliente</p>
                <h2 className="mt-2 text-2xl font-extrabold text-white">Adicionar investidor</h2>
              </div>
              <button
                onClick={() => setShowAdd(false)}
                className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-white/10 bg-white/5 text-[var(--text-secondary)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 ml-1 block text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Nome de exibição</span>
                <input
                  type="text"
                  placeholder="Ex: J. Silva"
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  className="w-full rounded-[22px] border border-white/10 bg-[#0a1036]/75 px-4 py-4 text-white outline-none transition focus:border-cyan-300/40"
                />
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 ml-1 block text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Capital (AUM)</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newAum}
                    onChange={(event) => setNewAum(event.target.value)}
                    className="w-full rounded-[22px] border border-white/10 bg-[#0a1036]/75 px-4 py-4 text-white outline-none transition focus:border-cyan-300/40"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 ml-1 block text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Perfil de risco</span>
                  <select
                    value={newRisk}
                    onChange={(event) => setNewRisk(event.target.value)}
                    className="w-full rounded-[22px] border border-white/10 bg-[#0a1036]/75 px-4 py-4 text-white outline-none transition focus:border-cyan-300/40"
                  >
                    <option value="Conservador">Conservador</option>
                    <option value="Moderado">Moderado</option>
                    <option value="Arrojado">Arrojado</option>
                  </select>
                </label>
              </div>

              <button onClick={addClient} className="app-button mt-2 w-full">
                Salvar localmente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
