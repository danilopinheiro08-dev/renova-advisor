"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Wallet,
    Zap,
    Settings,
    MessageSquare
} from "lucide-react";

export default function Navigation() {
    const pathname = usePathname();

    if (pathname === "/") return null;

    const navItems = [
        { href: "/home", icon: LayoutDashboard },
        { href: "/portfolio", icon: Wallet },
        { href: "/tools", icon: Zap },
        { href: "/chat", icon: MessageSquare },
        { href: "/settings", icon: Settings },
    ];

    return (
        <nav className="app-dock">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-center w-12 h-12 transition-colors ${isActive ? "text-blue-400" : "text-slate-500"
                            }`}
                    >
                        <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                    </Link>
                );
            })}
        </nav>
    );
}
