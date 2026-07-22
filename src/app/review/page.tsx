"use client";

import { useState } from "react";
import { mockDocuments } from "@/lib/mock-data";

type ReviewStatus = "pending" | "approved" | "rejected";

interface ReviewItem {
  id: string;
  filename: string;
  fileType: string;
  schemaType: string;
  confidence: number;
  extractedData: Record<string, unknown> | null;
  reviewStatus: ReviewStatus;
  reviewerNotes: string;
}

const reviewQueue: ReviewItem[] = mockDocuments
  .filter((d) => d.extractedData)
  .map((doc) => ({
    id: doc.id,
    filename: doc.filename,
    fileType: doc.fileType,
    schemaType: doc.schemaType,
    confidence: doc.confidence,
    extractedData: doc.extractedData as Record<string, unknown>,
    reviewStatus: "pending" as ReviewStatus,
    reviewerNotes: "",
  }));

export default function ReviewPage() {
  const [queue, setQueue] = useState<ReviewItem[]>(reviewQueue);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filter, setFilter] = useState("all");

  const selected = queue[selectedIndex];

  const filteredQueue = queue.filter((item) => {
    if (filter === "all") return true;
    return item.reviewStatus === filter;
  });

  const handleApprove = () => {
    setQueue((prev) =>
      prev.map((item, i) =>
        i === selectedIndex ? { ...item, reviewStatus: "approved" as ReviewStatus } : item
      )
    );
    if (selectedIndex < queue.length - 1) setSelectedIndex(selectedIndex + 1);
  };

  const handleReject = () => {
    setQueue((prev) =>
      prev.map((item, i) =>
        i === selectedIndex ? { ...item, reviewStatus: "rejected" as ReviewStatus } : item
      )
    );
    if (selectedIndex < queue.length - 1) setSelectedIndex(selectedIndex + 1);
  };

  const stats = {
    pending: queue.filter((q) => q.reviewStatus === "pending").length,
    approved: queue.filter((q) => q.reviewStatus === "approved").length,
    rejected: queue.filter((q) => q.reviewStatus === "rejected").length,
  };

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Human Review
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Compare AI extraction results with original documents and approve or reject.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="badge badge-warning">{stats.pending} Pending</span>
          <span className="badge badge-success">{stats.approved} Approved</span>
          <span className="badge badge-error">{stats.rejected} Rejected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Review Queue */}
        <div className="glass-card p-4 max-h-[600px] overflow-y-auto">
          <div className="flex items-center gap-2 mb-3 px-2">
            {(["all", "pending", "approved", "rejected"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                  filter === f ? "bg-brand-500/20 text-brand-400" : ""
                }`}
                style={filter === f ? {} : { color: "var(--text-tertiary)" }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="space-y-1">
            {filteredQueue.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setSelectedIndex(queue.indexOf(item))}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  selected.id === item.id
                    ? "bg-brand-500/15 border border-brand-500/30"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${
                    item.reviewStatus === "approved" ? "bg-green-400" :
                    item.reviewStatus === "rejected" ? "bg-red-400" :
                    "bg-yellow-400"
                  }`} />
                  <span className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                    {item.filename}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-tertiary)" }}>
                  <span>{item.confidence}%</span>
                  <span>•</span>
                  <span className={`badge text-[9px] py-0 ${
                    item.reviewStatus === "approved" ? "badge-success" :
                    item.reviewStatus === "rejected" ? "badge-error" :
                    "badge-warning"
                  }`}>
                    {item.reviewStatus}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Comparison View */}
        {selected && (
          <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Document */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                📄 Original Document
              </h3>
              <div className="rounded-xl border p-8 text-center" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>
                <div className="text-4xl mb-3">
                  {selected.fileType === "pdf" ? "📄" : selected.fileType === "docx" ? "📝" : "🖼️"}
                </div>
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{selected.filename}</p>
                <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>{selected.schemaType}</p>
              </div>

              {/* Simulated extracted regions */}
              {selected.extractedData && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-tertiary)" }}>
                    Extracted Regions
                  </p>
                  {Object.keys(selected.extractedData).slice(0, 5).map((key) => (
                    <div
                      key={key}
                      className="p-2 rounded-lg border cursor-pointer hover:border-brand-500/50 transition-colors"
                      style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}
                    >
                      <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
                        {key}
                      </span>
                      <span className="text-xs ml-2" style={{ color: "var(--text-tertiary)" }}>
                        → {JSON.stringify(selected.extractedData?.[key]).substring(0, 50)}...
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Extracted Data */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  🤖 Extracted Data
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-green-400">{selected.confidence}%</span>
                  <span className="badge badge-success">Validated</span>
                </div>
              </div>

              {selected.extractedData && (
                <div className="code-block text-xs max-h-[350px] overflow-auto mb-4">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(selected.extractedData, null, 2)}
                  </pre>
                </div>
              )}

              {/* Review Notes */}
              <div className="mb-4">
                <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--text-tertiary)" }}>
                  Review Notes
                </label>
                <textarea
                  placeholder="Add notes about this extraction..."
                  className="input-field text-sm min-h-[80px] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button onClick={handleApprove} className="flex-1 btn-primary py-3 text-sm">
                  ✓ Approve
                </button>
                <button onClick={handleReject} className="flex-1 py-3 text-sm px-4 rounded-xl font-semibold transition-all bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25">
                  ✕ Reject
                </button>
                <button className="px-4 py-3 text-sm rounded-xl font-semibold transition-all hover:bg-white/5 border" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
                  🚩 Flag
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
