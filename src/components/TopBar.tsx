"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { EyeOff, UserCircle } from "lucide-react";
import { SecureStorage } from "@/lib/storage";

export function TopBar() {
    const { data: session } = useSession();

    const handlePanicWipe = async () => {
        if (confirm("ATENÇÃO: Isso apagará TODOS os dados locais de clientes agora mesmo. Continuar?")) {
            await SecureStorage.clear();
            // Reload to ensure memory state resets
            window.location.reload();
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 h-14">
            <div className="flex items-center justify-between h-full max-w-md mx-auto px-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold">R</div>
                    <span className="font-semibold text-lg tracking-tight">Renova</span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handlePanicWipe}
                        title="Botão de Pânico (Apagar Cash Local)"
                        className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-full hover:bg-red-400/10"
                    >
                        <EyeOff className="w-5 h-5" />
                    </button>

                    {session?.user ? (
                        <button
                            onClick={() => signOut()}
                            className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border border-slate-700 hover:border-slate-500 transition-colors"
                        >
                            {session.user.image ? (
                                <img src={session.user.image} alt={session.user.name || "User"} className="w-full h-full object-cover" />
                            ) : (
                                <UserCircle className="w-8 h-8 text-slate-400" />
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={() => signIn("google")}
                            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
