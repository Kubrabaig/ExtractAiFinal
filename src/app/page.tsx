"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const features = [
  { icon: "📄", title: "Multi-format Upload", desc: "PDF, DOCX, JPG, PNG, TIFF, and ZIP batch processing with intelligent format detection." },
  { icon: "🤖", title: "AI-Powered Extraction", desc: "Advanced LLM understanding with semantic chunking for maximum accuracy." },
  { icon: "📑", title: "Schema Validation", desc: "Strict JSON schema validation ensures every output is structured and consistent." },
  { icon: "⚡", title: "High-Speed Batching", desc: "Process thousands of documents simultaneously with our async pipeline." },
  { icon: "📊", title: "Analytics Dashboard", desc: "Real-time monitoring of accuracy, performance, and processing metrics." },
  { icon: "📁", title: "Multi-format Export", desc: "Export to JSON, CSV, Excel, and XML with one click." },
  { icon: "🔒", title: "Enterprise Security", desc: "JWT auth, RBAC, encrypted storage, and GDPR-ready architecture." },
  { icon: "☁️", title: "Cloud Scalability", desc: "Docker-ready, Kubernetes-compatible, deploy anywhere with confidence." },
];

const pipelineStages = [
  "Upload", "OCR Processing", "Document Parsing", "Semantic Chunking",
  "Embedding Generation", "Vector Search", "LLM Understanding",
  "Schema Validation", "Structured JSON Output", "Export",
];

const stats = [
  { value: "99.2%", label: "Accuracy Rate" },
  { value: "<3s", label: "Avg Processing" },
  { value: "50K+", label: "Documents/Day" },
  { value: "99.9%", label: "Uptime SLA" },
];

export default function LandingPage() {
  const [activeStage, setActiveStage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => {
        if (prev >= pipelineStages.length - 1) {
          setTimeout(() => {
            setActiveStage(0);
            setIsAnimating(true);
          }, 2000);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [isAnimating]);

  useEffect(() => {
    if (activeStage >= pipelineStages.length - 1) {
      setTimeout(() => {
        setIsAnimating(true);
        setActiveStage(0);
      }, 2000);
    }
  }, [activeStage]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mesh">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-pattern opacity-50" />

          {/* Floating orbs */}
          <div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-float opacity-20"
            style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl animate-float-slow opacity-15"
            style={{ background: "radial-gradient(circle, #8b5cf6, transparent)", animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full blur-3xl animate-float opacity-10"
            style={{ background: "radial-gradient(circle, #a78bfa, transparent)", animationDelay: "4s" }}
          />

          {/* Floating document cards */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute glass-card p-3 rounded-xl opacity-20"
              style={{
                top: `${15 + Math.sin(i * 1.2) * 30}%`,
                left: `${10 + (i * 15)}%`,
                animation: `float ${5 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.8}s`,
                width: `${60 + i * 10}px`,
                height: `${40 + i * 8}px`,
              }}
            >
              <div className="w-full h-1 rounded mb-1" style={{ background: "var(--text-tertiary)", opacity: 0.3 }} />
              <div className="w-3/4 h-1 rounded mb-1" style={{ background: "var(--text-tertiary)", opacity: 0.2 }} />
              <div className="w-1/2 h-1 rounded" style={{ background: "var(--text-tertiary)", opacity: 0.1 }} />
            </div>
          ))}

          {/* Connection lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="10%" y1="30%" x2="40%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" className="pipeline-line" />
            <line x1="40%" y1="50%" x2="70%" y2="35%" stroke="url(#lineGrad)" strokeWidth="1" className="pipeline-line" style={{ animationDelay: "0.5s" }} />
            <line x1="70%" y1="35%" x2="90%" y2="60%" stroke="url(#lineGrad)" strokeWidth="1" className="pipeline-line" style={{ animationDelay: "1s" }} />
            <line x1="20%" y1="70%" x2="50%" y2="65%" stroke="url(#lineGrad)" strokeWidth="1" className="pipeline-line" style={{ animationDelay: "1.5s" }} />
            <line x1="50%" y1="65%" x2="80%" y2="75%" stroke="url(#lineGrad)" strokeWidth="1" className="pipeline-line" style={{ animationDelay: "2s" }} />
          </svg>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-slide-up opacity-0 stagger-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              Enterprise AI Document Intelligence Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-slide-up opacity-0 stagger-2">
            <span style={{ color: "var(--text-primary)" }}>Turn Any Document</span>
            <br />
            <span className="gradient-text-shimmer">into Structured Intelligence.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 animate-slide-up opacity-0 stagger-3" style={{ color: "var(--text-secondary)" }}>
            ExtractIQ uses AI to transform invoices, receipts, contracts, resumes,
            bank statements, medical reports, and more into accurate, validated
            structured data at enterprise scale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-slide-up opacity-0 stagger-4">
            <Link href="/upload" className="btn-primary text-base flex items-center gap-2">
              <span>🚀</span>
              <span>Upload Document</span>
            </Link>
            <Link href="/extraction" className="btn-secondary text-base flex items-center gap-2">
              <span>▶️</span>
              <span>Try Live Demo</span>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base flex items-center gap-2"
            >
              <span>💻</span>
              <span>View GitHub</span>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-slide-up opacity-0 stagger-5">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm" style={{ color: "var(--text-tertiary)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-mesh">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              Built for <span className="gradient-text">Enterprise Intelligence</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Everything you need to extract, validate, and transform document data at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="glass-card p-6 group animate-slide-up opacity-0"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Pipeline */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              Real-Time <span className="gradient-text">AI Processing Pipeline</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Watch each stage of the extraction process unfold in real-time.
            </p>
          </div>

          <div className="glass-card p-8 md:p-12">
            <div className="space-y-3">
              {pipelineStages.map((stage, i) => {
                const isActive = i === activeStage;
                const isCompleted = i < activeStage;
                return (
                  <div
                    key={stage}
                    className={`pipeline-stage flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
                      isActive
                        ? "active border-brand-500 bg-brand-500/10"
                        : isCompleted
                        ? "completed border-green-500/30 bg-green-500/5"
                        : "pending border-transparent"
                    }`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {/* Status indicator */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      isCompleted
                        ? "bg-green-500/20 text-green-400"
                        : isActive
                        ? "bg-brand-500/20 text-brand-400 animate-pulse"
                        : "bg-white/5 text-gray-500"
                    }`}>
                      {isCompleted ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : (
                        <span className="text-sm font-bold">{i + 1}</span>
                      )}
                    </div>

                    {/* Stage name */}
                    <span className={`font-medium text-sm flex-1 ${
                      isActive
                        ? "text-brand-400"
                        : isCompleted
                        ? "text-green-400"
                        : "text-gray-500"
                    }`}>
                      {stage}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" style={{ animationDelay: "0.4s" }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-mesh">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              How <span className="gradient-text">ExtractIQ</span> Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Documents",
                desc: "Drag and drop any document format — PDF, DOCX, images, or ZIP batches. Our AI handles the rest.",
                icon: "📤",
              },
              {
                step: "02",
                title: "AI Extracts & Validates",
                desc: "Our multi-stage pipeline uses OCR, semantic chunking, and LLM understanding to extract structured data.",
                icon: "🧠",
              },
              {
                step: "03",
                title: "Get Structured Output",
                desc: "Receive validated, schema-compliant JSON. Export to JSON, CSV, Excel, or XML instantly.",
                icon: "📊",
              },
            ].map((item, i) => (
              <div key={item.step} className="glass-card p-8 text-center group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <div className="text-xs font-bold uppercase tracking-widest mb-3 gradient-text">Step {item.step}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-mesh" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                Ready to Transform Your <span className="gradient-text">Document Intelligence</span>?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
                Join thousands of enterprises using ExtractIQ to extract structured data from documents with unprecedented accuracy.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/upload" className="btn-primary text-base px-8 py-3">
                  Get Started Free →
                </Link>
                <Link href="/api-playground" className="btn-secondary text-base px-8 py-3">
                  Explore API Docs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: "var(--border-color)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>E</div>
                <span className="font-bold gradient-text">ExtractIQ</span>
              </div>
              <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                Enterprise AI document intelligence platform.
              </p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "API Docs", "Changelog"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security", "GDPR"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-brand-400 transition-colors" style={{ color: "var(--text-tertiary)" }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "var(--border-color)" }}>
            <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
              © 2025 ExtractIQ. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>Built with ❤️ for document intelligence</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
