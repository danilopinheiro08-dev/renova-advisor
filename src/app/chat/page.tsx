"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, ShieldCheck, Zap, ArrowLeft, MoreHorizontal, Paperclip, Smile } from "lucide-react";
import { getMarketData } from "@/lib/market";
import Link from "next/link";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Olá! Sou o **RenovaBot**, seu assistente financeiro de elite. Como posso ajudar com sua carteira ou análise de mercado hoje?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [marketBrief, setMarketBrief] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getMarketData().then(data => {
            if (data) {
                setMarketBrief(`Dólar: R$ ${data.usd.bid}, Euro: R$ ${data.eur.bid}, BTC: R$ ${Number(data.btc.bid).toLocaleString()}`);
            }
        });
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMsg: Message = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMsg],
                    marketContext: marketBrief
                }),
            });

            const data = await response.json();
            if (data.active) {
                setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: "assistant", content: "Desculpe, tive um problema na conexão. Tente novamente." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-mesh absolute inset-0 pb-0 pt-0 overflow-hidden">
            {/* Dynamic Header */}
            <div className="h-20 glass-morphism border-b border-white/5 flex items-center px-5 gap-4 z-20">
                <Link href="/" className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                    <ArrowLeft size={20} />
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h2 className="font-bold text-white tracking-tight leading-none">RenovaBot IA</h2>
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                    </div>
                    <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em] mt-1.5">Especialista em Ativos</p>
                </div>
                <div className="flex gap-2">
                    <div className="px-3 py-1.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 tracking-wider flex items-center gap-1.5 uppercase shadow-inner">
                        <ShieldCheck size={12} className="text-blue-400" />
                        Secured
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-5 pb-32 space-y-6 flex flex-col no-scrollbar"
            >
                <div className="flex flex-col items-center py-10 text-center space-y-3 opacity-40">
                    <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                        <Bot size={32} className="text-slate-400" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Início da conversa segura</p>
                    <p className="text-[10px] text-slate-600 max-w-[200px]">Somente assuntos financeiros e de mercado são permitidos.</p>
                </div>

                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-4 duration-300`}>
                        <div className={`max-w-[85%] px-5 py-4 rounded-[28px] shadow-2xl relative group ${msg.role === "user"
                                ? "bg-white text-black font-medium rounded-tr-none"
                                : "glass-card text-white rounded-tl-none border-white/10"
                            }`}>
                            <div className="text-sm leading-relaxed whitespace-pre-wrap">
                                {msg.content}
                            </div>
                            {msg.role === "assistant" && (
                                <div className="absolute -bottom-6 left-1 text-[9px] font-bold text-slate-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    AI Agent • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start animate-in fade-in duration-300">
                        <div className="glass-card px-6 py-4 rounded-[28px] rounded-tl-none border-white/10">
                            <div className="flex gap-1.5 py-1">
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Tray */}
            <div className="absolute bottom-6 left-0 right-0 px-5 z-20">
                <div className="max-w-4xl mx-auto glass-card rounded-[32px] p-2 flex items-center gap-2 border-white/20 shadow-[0_24px_48px_rgba(0,0,0,0.6)]">
                    <button className="w-11 h-11 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
                        <Paperclip size={20} />
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Como está o dólar agora?"
                        className="flex-1 bg-transparent border-none outline-none text-white text-[15px] px-2 placeholder:text-slate-600 tracking-tight"
                    />
                    <button className="w-11 h-11 rounded-full flex items-center justify-center text-slate-500 hover:text-white transition-all">
                        <Smile size={20} />
                    </button>
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || loading}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${input.trim() && !loading ? "bg-white text-black shadow-lg" : "bg-white/5 text-slate-700"
                            }`}
                    >
                        <Send size={20} className={input.trim() && !loading ? "translate-x-0.5 -translate-y-0.5" : ""} />
                    </button>
                </div>
            </div>
        </div>
    );
}
