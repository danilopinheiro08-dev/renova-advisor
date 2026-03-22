"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LineChart, MessageSquare, Briefcase, Calculator, Layers } from "lucide-react";

export function Navigation() {
    const pathname = usePathname();

    const links = [
        { name: "Início", href: "/", icon: Home },
        { name: "Mercado", href: "/market", icon: LineChart },
        { name: "Chat IA", href: "/chat", icon: MessageSquare },
        { name: "Ferramentas", href: "/tools", icon: Layers },
        { name: "Clientes", href: "/portfolio", icon: Briefcase },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-t border-slate-800 pb-safe">
            <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${isActive ? "text-blue-500" : "text-slate-400 hover:text-slate-300"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-[10px] font-medium">{link.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
