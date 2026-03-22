"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Zap,
} from "lucide-react";

const navItems = [
  { href: "/home", icon: LayoutDashboard, label: "Home" },
  { href: "/portfolio", icon: Briefcase, label: "Carteiras" },
  { href: "/tools", icon: Zap, label: "Tools" },
  { href: "/chat", icon: MessageSquare, label: "IA" },
  { href: "/settings", icon: Settings, label: "Ajustes" },
];

export default function Navigation() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <nav className="app-dock">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-[20px] px-2 py-2 text-center transition-all duration-200 ${
              isActive
                ? "bg-cyan-300/12 text-cyan-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                : "text-[var(--text-tertiary)]"
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.6 : 2.1} />
            <span className={`text-[9px] font-bold uppercase tracking-[0.18em] ${isActive ? "text-cyan-100" : "text-[var(--text-tertiary)]"}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
