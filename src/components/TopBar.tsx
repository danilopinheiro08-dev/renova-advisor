"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { EyeOff, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { SecureStorage } from "@/lib/storage";

export function TopBar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    // STRICTEST POSSIBLE CHECK
    if (pathname === "/" || !pathname) {
        return null;
    }

    const handlePanicWipe = async () => {
        if (confirm("ATENÇÃO: Isso apagará TODOS os dados locais de clientes agora mesmo. Continuar?")) {
            await SecureStorage.clear();
            window.location.reload();
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-[110] bg-[#05070a]/90 backdrop-blur-2xl border-b border-white/10 h-16 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between h-full max-w-7xl mx-auto px-8 w-full">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center font-black text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] text-xl">R</div>
                    <span className="font-black text-2xl tracking-tighter text-white">Renova Advisor</span>
                </div>

                <div className="flex items-center gap-8">
                    <button
                        onClick={handlePanicWipe}
                        className="text-red-400 hover:text-red-300 transition-all p-2.5 rounded-2xl hover:bg-red-400/10 border border-transparent hover:border-red-400/20"
                    >
                        <EyeOff className="w-6 h-6" />
                    </button>

                    {session?.user ? (
                        <button
                            onClick={() => signOut()}
                            className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-white/10 hover:border-blue-500/50 transition-all group relative"
                        >
                            {session.user.image ? (
                                <img src={session.user.image} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <UserCircle className="w-10 h-10 text-slate-400" />
                            )}
                            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                    ) : (
                        <button
                            onClick={() => signIn("google")}
                            className="text-xs font-black text-blue-400 hover:text-blue-300 transition-all uppercase tracking-[0.2em] px-6 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-2xl"
                        >
                            Acessar Portal
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
