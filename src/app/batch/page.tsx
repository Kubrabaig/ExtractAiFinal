"use client";

import { useState, useEffect } from "react";
import { mockJobs } from "@/lib/mock-data";

interface BatchJob {
  id: string;
  filename: string;
  status: "queued" | "running" | "completed" | "failed";
  progress: number;
  currentStage: string;
  startedAt: string;
  estimatedTime?: string;
}

const initialJobs: BatchJob[] = [
  { id: "b1", filename: "invoice_batch_001.pdf", status: "running", progress: 65, currentStage: "LLM Understanding", startedAt: "2 min ago", estimatedTime: "8s" },
  { id: "b2", filename: "receipt_batch_002.pdf", status: "running", progress: 42, currentStage: "Embedding Generation", startedAt: "2 min ago", estimatedTime: "12s" },
  { id: "b3", filename: "contract_batch_003.pdf", status: "running", progress: 28, currentStage: "Semantic Chunking", startedAt: "3 min ago", estimatedTime: "18s" },
  { id: "b4", filename: "resume_batch_004.docx", status: "queued", progress: 0, currentStage: "Pending", startedAt: "3 min ago" },
  { id: "b5", filename: "bank_statement_005.pdf", status: "queued", progress: 0, currentStage: "Pending", startedAt: "3 min ago" },
  { id: "b6", filename: "invoice_batch_006.pdf", status: "completed", progress: 100, currentStage: "Export", startedAt: "5 min ago" },
  { id: "b7", filename: "receipt_batch_007.jpg", status: "completed", progress: 100, currentStage: "Export", startedAt: "6 min ago" },
  { id: "b8", filename: "contract_batch_008.pdf", status: "completed", progress: 100, currentStage: "Export", startedAt: "7 min ago" },
  { id: "b9", filename: "medical_report_009.pdf", status: "failed", progress: 15, currentStage: "OCR Processing", startedAt: "8 min ago" },
  { id: "b10", filename: "passport_scan_010.jpg", status: "completed", progress: 100, currentStage: "Export", startedAt: "9 min ago" },
];

export default function BatchPage() {
  const [jobs, setJobs] = useState(initialJobs);
  const [filter, setFilter] = useState("all");
  const [isPaused, setIsPaused] = useState(false);

  // Simulate progress updates
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setJobs((prev) =>
        prev.map((job) => {
          if (job.status === "running" && job.progress < 100) {
            const newProgress = Math.min(job.progress + Math.random() * 5, 100);
            return {
              ...job,
              progress: newProgress,
              status: newProgress >= 100 ? "completed" : "running",
              currentStage: newProgress >= 100 ? "Export" : job.currentStage,
            };
          }
          return job;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const filteredJobs = jobs.filter((j) => filter === "all" || j.status === filter);

  const stats = {
    total: jobs.length,
    queued: jobs.filter((j) => j.status === "queued").length,
    running: jobs.filter((j) => j.status === "running").length,
    completed: jobs.filter((j) => j.status === "completed").length,
    failed: jobs.filter((j) => j.status === "failed").length,
  };

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Batch Processing Manager
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Monitor and manage document extraction queues.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={isPaused ? "btn-primary" : "btn-secondary"}
          >
            {isPaused ? "▶️ Resume Queue" : "⏸️ Pause Queue"}
          </button>
          <button
            onClick={() => setJobs((prev) => prev.map((j) => j.status === "failed" ? { ...j, status: "queued", progress: 0, currentStage: "Pending" } : j))}
            className="btn-secondary"
          >
            🔄 Retry Failed
          </button>
          <button className="btn-primary">📤 Add Documents</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Total Jobs", value: stats.total, color: "var(--text-primary)" },
          { label: "Queued", value: stats.queued, color: "#818cf8" },
          { label: "Running", value: stats.running, color: "#fbbf24" },
          { label: "Completed", value: stats.completed, color: "#34d399" },
          { label: "Failed", value: stats.failed, color: "#f87171" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        {["all", "queued", "running", "completed", "failed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              filter === f
                ? "bg-brand-500/20 text-brand-400 border border-brand-500/30"
                : "hover:bg-white/5 border border-transparent"
            }`}
            style={filter === f ? {} : { color: "var(--text-secondary)" }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Job Queue */}
      <div className="glass-card overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b text-xs font-semibold uppercase tracking-wider"
          style={{ borderColor: "var(--border-color)", color: "var(--text-tertiary)" }}>
          <div className="col-span-4">Document</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Progress</div>
          <div className="col-span-2">Stage</div>
          <div className="col-span-1">Action</div>
        </div>

        {/* Job Rows */}
        <div className="divide-y" style={{ borderColor: "var(--border-color)" }}>
          {filteredJobs.map((job) => (
            <div key={job.id} className="grid grid-cols-12 gap-4 p-4 items-center table-row">
              <div className="col-span-4">
                <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                  {job.filename}
                </p>
                <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  Started {job.startedAt}
                </p>
              </div>
              <div className="col-span-2">
                <span className={`badge ${
                  job.status === "completed" ? "badge-success" :
                  job.status === "running" ? "badge-warning" :
                  job.status === "failed" ? "badge-error" :
                  "badge-info"
                }`}>
                  {job.status}
                </span>
              </div>
              <div className="col-span-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1 progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${job.progress}%`,
                        background: job.status === "failed"
                          ? "linear-gradient(90deg, #ef4444, #dc2626)"
                          : job.status === "completed"
                          ? "linear-gradient(90deg, #10b981, #059669)"
                          : undefined,
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono w-10 text-right" style={{ color: "var(--text-tertiary)" }}>
                    {Math.round(job.progress)}%
                  </span>
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{job.currentStage}</p>
              </div>
              <div className="col-span-1">
                {job.status === "running" && (
                  <button className="text-xs hover:text-red-400" style={{ color: "var(--text-tertiary)" }}>✕</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
