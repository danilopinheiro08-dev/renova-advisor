"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, RefreshCw } from "lucide-react";
import { getMarketData } from "@/lib/market";

export default function ChatPage() {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([
        { role: "assistant", content: "Olá! Sou o RenovaBot, seu especialista financeiro parceiro. Como posso ajudar com sua alocação, análise de carteira ou dúvidas de mercado hoje?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [marketContext, setMarketContext] = useState<any>(null);
    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getMarketData().then(data => {
            if (data) setMarketContext(data);
        });
    }, []);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages.filter(m => m.role !== 'system'), userMsg],
                    context: marketContext
                }),
            });
            const data = await res.json();

            if (data.error) throw new Error(data.error);

            setMessages((prev) => [...prev, { role: "assistant", content: data.result }]);
        } catch (error) {
            setMessages((prev) => [...prev, { role: "assistant", content: "Desculpe, ocorreu um erro ao conectar com o servidor da RenovaBot. Tente novamente mais tarde." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full absolute inset-0 pb-16 pt-14">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex max-w-[85%] gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === "user" ? "bg-blue-600" : "bg-slate-700"}`}>
                                {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-emerald-400" />}
                            </div>
                            <div className={`px-4 py-2 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                    ? "bg-blue-600 text-white rounded-tr-none"
                                    : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700"
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="flex items-center gap-2 bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700">
                            <RefreshCw className="w-4 h-4 animate-spin text-slate-400" />
                            <span className="text-sm text-slate-400">Pensando...</span>
                        </div>
                    </div>
                )}
                <div ref={endOfMessagesRef} />
            </div>

            <div className="p-3 bg-slate-900 border-t border-slate-800">
                <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex items-center gap-2 bg-slate-800 p-1 pl-4 rounded-full border border-slate-700 focus-within:border-blue-500 transition-colors">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Pergunte sobre rentabilidade, CDI..."
                        className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none py-2"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
                    >
                        <Send className="w-4 h-4 ml-[-2px]" />
                    </button>
                </form>
            </div>
        </div>
    );
}
