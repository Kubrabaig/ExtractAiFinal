"use client";

import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

const dailyProcessed = [
  { name: "Jan 1", docs: 320, cost: 12.50 },
  { name: "Jan 2", docs: 410, cost: 16.20 },
  { name: "Jan 3", docs: 380, cost: 14.80 },
  { name: "Jan 4", docs: 520, cost: 20.40 },
  { name: "Jan 5", docs: 480, cost: 18.90 },
  { name: "Jan 6", docs: 590, cost: 23.10 },
  { name: "Jan 7", docs: 620, cost: 24.30 },
  { name: "Jan 8", docs: 550, cost: 21.60 },
  { name: "Jan 9", docs: 470, cost: 18.40 },
  { name: "Jan 10", docs: 610, cost: 23.90 },
  { name: "Jan 11", docs: 530, cost: 20.80 },
  { name: "Jan 12", docs: 440, cost: 17.30 },
  { name: "Jan 13", docs: 580, cost: 22.70 },
  { name: "Jan 14", docs: 670, cost: 26.20 },
  { name: "Jan 15", docs: 710, cost: 27.80 },
];

const monthlyUsage = [
  { name: "Aug", docs: 8500, tokens: 2400000 },
  { name: "Sep", docs: 9200, tokens: 2600000 },
  { name: "Oct", docs: 10800, tokens: 3100000 },
  { name: "Nov", docs: 11500, tokens: 3300000 },
  { name: "Dec", docs: 12200, tokens: 3500000 },
  { name: "Jan", docs: 12847, tokens: 3700000 },
];

const failureReasons = [
  { name: "OCR Failed", value: 35, fill: "#ef4444" },
  { name: "Schema Invalid", value: 25, fill: "#f59e0b" },
  { name: "Timeout", value: 20, fill: "#8b5cf6" },
  { name: "File Corrupt", value: 15, fill: "#6366f1" },
  { name: "Other", value: 5, fill: "#64748b" },
];

const ocrPerformance = [
  { name: "PDF", accuracy: 98.5, speed: 2.1 },
  { name: "DOCX", accuracy: 97.2, speed: 1.5 },
  { name: "JPG", accuracy: 94.8, speed: 3.2 },
  { name: "PNG", accuracy: 95.1, speed: 2.8 },
  { name: "TIFF", accuracy: 93.5, speed: 4.1 },
];

const apiRequests = [
  { name: "00:00", requests: 45, errors: 2 },
  { name: "04:00", requests: 12, errors: 0 },
  { name: "08:00", requests: 120, errors: 5 },
  { name: "12:00", requests: 180, errors: 8 },
  { name: "16:00", requests: 150, errors: 6 },
  { name: "20:00", requests: 80, errors: 3 },
];

const radarData = [
  { metric: "Accuracy", value: 97 },
  { metric: "Speed", value: 88 },
  { metric: "Reliability", value: 95 },
  { metric: "Coverage", value: 82 },
  { metric: "Confidence", value: 96 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-card p-3 text-sm">
      <p className="font-medium mb-1" style={{ color: "var(--text-primary)" }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  );
};

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("15d");

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Analytics & Monitoring
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Comprehensive insights into your extraction pipeline performance.
          </p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="input-field py-2 px-4 w-auto text-sm"
        >
          <option value="7d">Last 7 Days</option>
          <option value="15d">Last 15 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Documents", value: "12,847", change: "+12.5%", icon: "📄" },
          { label: "Avg Accuracy", value: "97.3%", change: "+1.2%", icon: "🎯" },
          { label: "Total API Calls", value: "45,230", change: "+8.7%", icon: "🔧" },
          { label: "Est. Cost", value: "$342.50", change: "+5.3%", icon: "💰" },
        ].map((card) => (
          <div key={card.label} className="glass-card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">{card.icon}</span>
              <span className="text-xs font-semibold text-green-400">{card.change}</span>
            </div>
            <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{card.value}</p>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Daily Documents Processed */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Daily Documents Processed</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyProcessed}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" tick={{ fill: "var(--text-tertiary)", fontSize: 10 }} />
                <YAxis tick={{ fill: "var(--text-tertiary)", fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="docs" fill="#6366f1" radius={[4, 4, 0, 0]} name="Documents" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Usage */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Monthly Usage Trend</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" tick={{ fill: "var(--text-tertiary)", fontSize: 10 }} />
                <YAxis tick={{ fill: "var(--text-tertiary)", fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="docs" stroke="#6366f1" fill="#6366f120" strokeWidth={2} name="Documents" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* API Requests */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>API Requests</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={apiRequests}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" tick={{ fill: "var(--text-tertiary)", fontSize: 10 }} />
                <YAxis tick={{ fill: "var(--text-tertiary)", fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="requests" stroke="#6366f1" strokeWidth={2} dot={false} name="Requests" />
                <Line type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} dot={false} name="Errors" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Failure Reasons */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Failure Reasons</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={failureReasons}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {failureReasons.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {failureReasons.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: item.fill }} />
                <span style={{ color: "var(--text-tertiary)" }}>{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* OCR Performance */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>OCR Accuracy by Type</h3>
          <div className="space-y-3">
            {ocrPerformance.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span style={{ color: "var(--text-secondary)" }}>{item.name}</span>
                  <span className="font-medium" style={{ color: "var(--text-primary)" }}>{item.accuracy}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${item.accuracy}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Radar */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>System Performance</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border-color)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: "var(--text-tertiary)", fontSize: 10 }} />
                <PolarRadiusAxis tick={{ fill: "var(--text-tertiary)", fontSize: 9 }} domain={[0, 100]} />
                <Radar name="Performance" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Processing Cost */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Estimated Costs</h3>
          <div className="space-y-4">
            {[
              { label: "OCR Processing", cost: "$45.20", pct: 13 },
              { label: "LLM Tokens", cost: "$210.30", pct: 61 },
              { label: "Vector Search", cost: "$32.50", pct: 10 },
              { label: "Storage", cost: "$18.80", pct: 6 },
              { label: "Network", cost: "$35.70", pct: 10 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                  <span className="font-medium" style={{ color: "var(--text-primary)" }}>{item.cost}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
            <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: "var(--border-color)" }}>
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Total Estimated</span>
              <span className="text-lg font-bold gradient-text">$342.50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
