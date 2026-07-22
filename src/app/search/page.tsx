"use client";

import { useState, useMemo } from "react";
import { mockDocuments } from "@/lib/mock-data";

const allSearchableItems = [
  ...mockDocuments.map((doc) => ({
    type: "document" as const,
    title: doc.filename,
    subtitle: `${doc.schemaType} • ${doc.status}`,
    id: doc.id,
    icon: "📄",
    status: doc.status,
    data: doc,
  })),
  { type: "vendor" as const, title: "Acme Corp", subtitle: "Invoice vendor • 12 documents", id: "v1", icon: "🏢", status: "active" },
  { type: "vendor" as const, title: "Target", subtitle: "Receipt vendor • 8 documents", id: "v2", icon: "🏪", status: "active" },
  { type: "customer" as const, title: "TechStart Inc", subtitle: "Customer • 5 invoices", id: "c1", icon: "👥", status: "active" },
  { type: "customer" as const, title: "DataFlow Corp", subtitle: "Customer • 3 contracts", id: "c2", icon: "👥", status: "active" },
  { type: "entity" as const, title: "INV-2025-001", subtitle: "Invoice number • Acme Corp", id: "e1", icon: "🔢", status: "found" },
  { type: "entity" as const, title: "$3,240.00", subtitle: "Amount • INV-2025-001", id: "e2", icon: "💰", status: "found" },
  { type: "entity" as const, title: "2025-01-15", subtitle: "Date • Multiple documents", id: "e3", icon: "📅", status: "found" },
  { type: "ai_result" as const, title: "Jane Smith - ML Engineer", subtitle: "Resume extraction • 98.1% confidence", id: "a1", icon: "🤖", status: "extracted" },
  { type: "ai_result" as const, title: "Passport: Michael Johnson", subtitle: "Passport extraction • 97.3% confidence", id: "a2", icon: "🤖", status: "extracted" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredResults = useMemo(() => {
    if (!query.trim()) return allSearchableItems;
    const q = query.toLowerCase();
    return allSearchableItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
    );
  }, [query]);

  const tabs = [
    { id: "all", label: "All", count: filteredResults.length },
    { id: "document", label: "Documents", count: filteredResults.filter((r) => r.type === "document").length },
    { id: "vendor", label: "Vendors", count: filteredResults.filter((r) => r.type === "vendor").length },
    { id: "customer", label: "Customers", count: filteredResults.filter((r) => r.type === "customer").length },
    { id: "entity", label: "Entities", count: filteredResults.filter((r) => r.type === "entity").length },
    { id: "ai_result", label: "AI Results", count: filteredResults.filter((r) => r.type === "ai_result").length },
  ];

  const displayResults = activeTab === "all" ? filteredResults : filteredResults.filter((r) => r.type === activeTab);

  return (
    <div className="p-6 md:p-8 max-w-[900px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
          Global Search
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Search across documents, vendors, customers, and extracted entities.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents, vendors, amounts, dates, entities..."
          className="input-field py-4 pl-12 pr-4 text-base"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
            style={{ color: "var(--text-tertiary)" }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-brand-500/20 text-brand-400 border border-brand-500/30"
                : "hover:bg-white/5 border border-transparent"
            }`}
            style={activeTab === tab.id ? {} : { color: "var(--text-secondary)" }}
          >
            {tab.label}
            <span className="ml-1.5 text-[10px] opacity-60">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-2">
        {displayResults.map((item) => (
          <div
            key={item.id}
            className="glass-card p-4 flex items-center gap-4 cursor-pointer"
          >
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                {item.title}
              </p>
              <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                {item.subtitle}
              </p>
            </div>
            <span className="badge badge-info text-[10px]">{item.type}</span>
          </div>
        ))}
        {displayResults.length === 0 && query && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              No results found for &ldquo;{query}&rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
