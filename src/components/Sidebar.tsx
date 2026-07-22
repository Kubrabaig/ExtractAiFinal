"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const navSections = [
  {
    label: "Overview",
    items: [
      { href: "/", icon: "🏠", label: "Landing Page" },
      { href: "/dashboard", icon: "📊", label: "Dashboard" },
    ],
  },
  {
    label: "Document Processing",
    items: [
      { href: "/upload", icon: "📤", label: "Upload Center" },
      { href: "/extraction", icon: "🤖", label: "AI Extraction" },
      { href: "/documents", icon: "📑", label: "Document Viewer" },
      { href: "/batch", icon: "⚡", label: "Batch Processing" },
    ],
  },
  {
    label: "Data & Schemas",
    items: [
      { href: "/schemas", icon: "📋", label: "Schema Library" },
      { href: "/review", icon: "👥", label: "Human Review" },
      { href: "/analytics", icon: "📈", label: "Analytics" },
    ],
  },
  {
    label: "Developer",
    items: [
      { href: "/api-playground", icon: "🔧", label: "API Playground" },
      { href: "/search", icon: "🔍", label: "Global Search" },
      { href: "/settings", icon: "⚙️", label: "Settings" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden glass-card p-2"
        aria-label="Toggle menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {mobileOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-[260px]"
        } ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          background: "var(--sidebar-bg)",
          borderRight: "1px solid var(--sidebar-border)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b"
            style={{ borderColor: "var(--border-color)" }}
          >
            {!collapsed && (
              <Link href="/" className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                >
                  E
                </div>
                <div>
                  <span className="font-bold text-lg gradient-text">
                    ExtractIQ
                  </span>
                  <p className="text-[10px] tracking-wider uppercase" style={{ color: "var(--text-tertiary)" }}>
                    AI Document Intelligence
                  </p>
                </div>
              </Link>
            )}
            {collapsed && (
              <div className="w-9 h-9 mx-auto rounded-xl flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              >
                E
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex p-1.5 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Toggle sidebar"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: "var(--text-tertiary)" }}
              >
                {collapsed ? (
                  <path d="M9 18l6-6-6-6" />
                ) : (
                  <path d="M15 18l-6-6 6-6" />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            {navSections.map((section) => (
              <div key={section.label} className="mb-4">
                {!collapsed && (
                  <p
                    className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {section.label}
                  </p>
                )}
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "sidebar-active text-brand-400"
                            : "hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                        style={{
                          color: isActive ? undefined : "var(--text-secondary)",
                          background: isActive
                            ? "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.08))"
                            : undefined,
                        }}
                        title={collapsed ? item.label : undefined}
                      >
                        <span className="text-lg flex-shrink-0">{item.icon}</span>
                        {!collapsed && <span>{item.label}</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom section */}
          <div
            className="p-3 border-t"
            style={{ borderColor: "var(--border-color)" }}
          >
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-black/5 dark:hover:bg-white/5"
              style={{ color: "var(--text-secondary)" }}
            >
              <span className="text-lg">{theme === "dark" ? "☀️" : "🌙"}</span>
              {!collapsed && <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
            </button>

            {/* User */}
            {!collapsed && (
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mt-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                >
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                    John Doe
                  </p>
                  <p className="text-xs truncate" style={{ color: "var(--text-tertiary)" }}>
                    john@extractiq.com
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
