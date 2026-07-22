"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [apiKeys] = useState([
    { id: "1", name: "Production Key", key: "sk-prod-****...****789", lastUsed: "2 min ago", active: true },
    { id: "2", name: "Development Key", key: "sk-dev-****...****456", lastUsed: "1 hour ago", active: true },
    { id: "3", name: "Testing Key", key: "sk-test-****...****123", lastUsed: "3 days ago", active: false },
  ]);

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "api-keys", label: "API Keys", icon: "🔑" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "billing", label: "Billing", icon: "💳" },
    { id: "preferences", label: "Preferences", icon: "⚙️" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
          Settings
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Manage your account, API keys, and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="glass-card p-4 h-fit">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-brand-500/15 text-brand-400"
                    : "hover:bg-white/5"
                }`}
                style={activeTab === tab.id ? {} : { color: "var(--text-secondary)" }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === "profile" && (
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-6" style={{ color: "var(--text-primary)" }}>Profile Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                    JD
                  </div>
                  <div>
                    <button className="btn-secondary py-2 px-4 text-xs">Change Avatar</button>
                    <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>JPG, PNG, max 2MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-tertiary)" }}>Full Name</label>
                    <input type="text" defaultValue="John Doe" className="input-field text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-tertiary)" }}>Email</label>
                    <input type="email" defaultValue="john@extractiq.com" className="input-field text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-tertiary)" }}>Company</label>
                    <input type="text" defaultValue="ExtractIQ Inc" className="input-field text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-tertiary)" }}>Role</label>
                    <select className="input-field text-sm">
                      <option>Admin</option>
                      <option>Developer</option>
                      <option>Reviewer</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                </div>
                <button className="btn-primary py-2.5 px-6 text-sm">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === "api-keys" && (
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>API Keys</h3>
                <button className="btn-primary py-2 px-4 text-xs">+ Generate New Key</button>
              </div>
              <div className="space-y-3">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="flex items-center gap-4 p-4 rounded-xl border"
                    style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                      style={{ background: apiKey.active ? "rgba(16, 185, 129, 0.15)" : "rgba(100, 116, 139, 0.15)" }}>
                      🔑
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{apiKey.name}</p>
                      <p className="text-xs font-mono" style={{ color: "var(--text-tertiary)" }}>{apiKey.key}</p>
                    </div>
                    <div className="text-right">
                      <span className={`badge text-[10px] ${apiKey.active ? "badge-success" : "badge-error"}`}>
                        {apiKey.active ? "Active" : "Inactive"}
                      </span>
                      <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>{apiKey.lastUsed}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-6" style={{ color: "var(--text-primary)" }}>Security Settings</h3>
              <div className="space-y-6">
                {[
                  { label: "Two-Factor Authentication", desc: "Add an extra layer of security to your account", enabled: true },
                  { label: "Session Timeout", desc: "Auto-logout after 30 minutes of inactivity", enabled: true },
                  { label: "IP Whitelisting", desc: "Restrict API access to specific IP addresses", enabled: false },
                  { label: "Audit Logging", desc: "Track all account and API activity", enabled: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-xl border"
                    style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item.label}</p>
                      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{item.desc}</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full cursor-pointer transition-all relative ${
                      item.enabled ? "bg-brand-500" : "bg-gray-600"
                    }`}>
                      <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${
                        item.enabled ? "left-6" : "left-0.5"
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-6" style={{ color: "var(--text-primary)" }}>Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: "Email Notifications", desc: "Receive email for extraction completions" },
                  { label: "Failure Alerts", desc: "Get notified when extractions fail" },
                  { label: "Weekly Reports", desc: "Receive weekly analytics summary" },
                  { label: "System Updates", desc: "Platform maintenance and feature announcements" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-xl border"
                    style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item.label}</p>
                      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{item.desc}</p>
                    </div>
                    <div className="w-12 h-6 rounded-full bg-brand-500 cursor-pointer relative">
                      <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-6" style={{ color: "var(--text-primary)" }}>Billing & Usage</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl border" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>
                  <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Current Plan</p>
                  <p className="text-lg font-bold gradient-text">Enterprise</p>
                </div>
                <div className="p-4 rounded-xl border" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>
                  <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Monthly Usage</p>
                  <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>$342.50</p>
                </div>
                <div className="p-4 rounded-xl border" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>
                  <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Documents Used</p>
                  <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>12,847 / 50,000</p>
                </div>
              </div>
              <div className="progress-bar mb-4">
                <div className="progress-bar-fill" style={{ width: "25.7%" }} />
              </div>
              <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>25.7% of monthly quota used</p>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-6" style={{ color: "var(--text-primary)" }}>Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border"
                    style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Theme</p>
                      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Switch between dark and light mode</p>
                    </div>
                    <button onClick={toggleTheme} className="btn-secondary py-2 px-4 text-xs">
                      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border"
                    style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Language</p>
                      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Select your preferred language</p>
                    </div>
                    <select className="input-field py-2 w-32 text-xs">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border"
                    style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Default Schema</p>
                      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Default extraction schema for new uploads</p>
                    </div>
                    <select className="input-field py-2 w-32 text-xs">
                      <option>Invoice</option>
                      <option>Receipt</option>
                      <option>Resume</option>
                      <option>Contract</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Workspace Management</h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                  Manage your workspace and team members.
                </p>
                <div className="space-y-3">
                  {[
                    { name: "John Doe", email: "john@extractiq.com", role: "Admin", avatar: "JD" },
                    { name: "Sarah Chen", email: "sarah@extractiq.com", role: "Reviewer", avatar: "SC" },
                    { name: "Mike Wilson", email: "mike@extractiq.com", role: "Developer", avatar: "MW" },
                  ].map((member) => (
                    <div key={member.email} className="flex items-center gap-3 p-3 rounded-xl border"
                      style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{member.name}</p>
                        <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{member.email}</p>
                      </div>
                      <span className="badge badge-info text-[10px]">{member.role}</span>
                    </div>
                  ))}
                </div>
                <button className="btn-secondary mt-4 py-2 px-4 text-xs">+ Invite Team Member</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
