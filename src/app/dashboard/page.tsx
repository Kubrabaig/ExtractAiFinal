"use client";

import { useState } from "react";
import { kpiData, chartData, activityTimeline, mockDocuments, notifications } from "@/lib/mock-data";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";

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

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Dashboard</h1>
          <p style={{ color: "var(--text-secondary)" }}>Monitor your extraction pipeline and system performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field py-2 px-3 w-auto text-sm"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card text-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span style={{ color: "var(--text-secondary)" }}>All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpiData.map((kpi, i) => (
          <div
            key={kpi.label}
            className="glass-card p-5 animate-slide-up opacity-0"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{kpi.icon}</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                kpi.trend === "up" ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
              }`}>
                {kpi.change}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>{kpi.value}</div>
            <div className="text-xs" style={{ color: "var(--text-tertiary)" }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Documents Processed Chart */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Documents Processed</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.documentsProcessed}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} />
                <YAxis tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} name="Documents" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Accuracy Chart */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>AI Extraction Accuracy</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.aiAccuracy}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} />
                <YAxis domain={[90, 100]} tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", r: 5 }} name="Accuracy %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Processing Time Chart */}
        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Processing Time Distribution</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.processingTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} />
                <YAxis tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="avg" stroke="#6366f1" fill="#6366f120" strokeWidth={2} name="Avg (s)" />
                <Area type="monotone" dataKey="max" stroke="#f87171" fill="#f8717110" strokeWidth={1} name="Max (s)" />
                <Area type="monotone" dataKey="min" stroke="#10b981" fill="#10b98110" strokeWidth={1} name="Min (s)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* File Type Distribution */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>File Type Distribution</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.fileTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.fileTypeDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {chartData.fileTypeDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: item.fill }} />
                <span style={{ color: "var(--text-tertiary)" }}>{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Success vs Failure */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Success vs Failure Rate</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.successVsFailure}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.successVsFailure.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            {chartData.successVsFailure.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ background: item.fill }} />
                <span style={{ color: "var(--text-secondary)" }}>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Token Usage */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Token Usage</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.tokenUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} />
                <YAxis tick={{ fill: "var(--text-tertiary)", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="promptTokens" fill="#6366f1" radius={[4, 4, 0, 0]} name="Prompt Tokens" />
                <Bar dataKey="completionTokens" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Completion Tokens" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Activity + Recent + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Timeline */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Recent Activity</h3>
          <div className="space-y-3 max-h-[350px] overflow-y-auto">
            {activityTimeline.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 dark:hover:bg-white/5 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${
                  item.type === "success" ? "bg-green-500/15" :
                  item.type === "error" ? "bg-red-500/15" :
                  item.type === "upload" ? "bg-blue-500/15" :
                  "bg-brand-500/15"
                }`}>
                  {item.type === "success" ? "✓" : item.type === "error" ? "✕" : item.type === "upload" ? "↑" : "●"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{item.action}</p>
                  <p className="text-xs truncate" style={{ color: "var(--text-tertiary)" }}>{item.detail}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Recent Uploads</h3>
          <div className="space-y-3 max-h-[350px] overflow-y-auto">
            {mockDocuments.slice(0, 6).map((doc) => (
              <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 dark:hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: "var(--bg-tertiary)" }}>
                  {doc.fileType === "pdf" ? "📄" : doc.fileType === "docx" ? "📝" : "🖼️"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{doc.filename}</p>
                  <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                    {doc.schemaType} • {doc.confidence > 0 ? `${doc.confidence}% confidence` : "Pending"}
                  </p>
                </div>
                <span className={`badge ${doc.status === "completed" ? "badge-success" : doc.status === "processing" ? "badge-warning" : doc.status === "failed" ? "badge-error" : "badge-info"}`}>
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Notifications</h3>
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-xl border transition-all ${
                  !notif.read ? "border-brand-500/30 bg-brand-500/5" : "border-transparent"
                }`}
                style={{ borderColor: notif.read ? "transparent" : undefined }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">
                    {notif.type === "success" ? "✅" : notif.type === "error" ? "❌" : notif.type === "warning" ? "⚠️" : "ℹ️"}
                  </span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{notif.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{notif.message}</p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>{notif.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* System Health */}
          <div className="mt-6 p-4 rounded-xl border" style={{ borderColor: "var(--border-color)" }}>
            <h4 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>System Health</h4>
            {[
              { name: "OCR Service", status: "healthy", latency: "120ms" },
              { name: "LLM API", status: "healthy", latency: "450ms" },
              { name: "Database", status: "healthy", latency: "15ms" },
              { name: "Storage", status: "healthy", latency: "8ms" },
            ].map((service) => (
              <div key={service.name} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{service.name}</span>
                </div>
                <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>{service.latency}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
