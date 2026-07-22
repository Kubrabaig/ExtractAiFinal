"use client";

import { useState } from "react";
import { mockDocuments, formatFileSize } from "@/lib/mock-data";

export default function DocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState(mockDocuments[0]);
  const [editMode, setEditMode] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = mockDocuments.filter((doc) => {
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus;
    const matchesSearch = doc.filename.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Document Viewer
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            View and compare original documents with extracted structured data.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field py-2 px-4 w-48 text-sm"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field py-2 px-3 w-auto text-sm"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Document List */}
        <div className="glass-card p-4 max-h-[700px] overflow-y-auto">
          <h3 className="font-semibold mb-3 px-2" style={{ color: "var(--text-primary)" }}>
            Documents ({filteredDocs.length})
          </h3>
          <div className="space-y-1">
            {filteredDocs.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  selectedDoc.id === doc.id
                    ? "bg-brand-500/15 border border-brand-500/30"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    {doc.fileType === "pdf" ? "📄" : doc.fileType === "docx" ? "📝" : "🖼️"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                      {doc.filename}
                    </p>
                    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-tertiary)" }}>
                      <span>{formatFileSize(doc.fileSize)}</span>
                      <span>•</span>
                      <span className={`badge text-[10px] py-0 ${
                        doc.status === "completed" ? "badge-success" :
                        doc.status === "processing" ? "badge-warning" :
                        doc.status === "failed" ? "badge-error" : "badge-info"
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Split View: Document + Extracted Data */}
        <div className="xl:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Document Preview */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                📄 Original Document
              </h3>
              <span className="badge badge-info text-xs">{selectedDoc.fileType.toUpperCase()}</span>
            </div>

            {/* Simulated document preview */}
            <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}>
              <div className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: "var(--bg-tertiary)" }}>
                  {selectedDoc.fileType === "pdf" ? "📄" : selectedDoc.fileType === "docx" ? "📝" : "🖼️"}
                </div>
                <h4 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                  {selectedDoc.filename}
                </h4>
                <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  {formatFileSize(selectedDoc.fileSize)} • {selectedDoc.schemaType}
                </p>
              </div>

              {/* Simulated document content */}
              <div className="p-6 border-t" style={{ borderColor: "var(--border-color)" }}>
                {selectedDoc.extractedData && (
                  <div className="space-y-3 text-xs">
                    <div className="p-2 rounded-lg" style={{ background: "rgba(99, 102, 241, 0.1)", borderLeft: "3px solid #6366f1" }}>
                      <span style={{ color: "var(--text-secondary)" }}>Document Type: </span>
                      <span className="font-medium" style={{ color: "var(--text-primary)" }}>{selectedDoc.schemaType}</span>
                    </div>
                    <div className="p-2 rounded-lg" style={{ background: "rgba(16, 185, 129, 0.05)", borderLeft: "3px solid #10b981" }}>
                      <span style={{ color: "var(--text-secondary)" }}>Processed: </span>
                      <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                        {new Date(selectedDoc.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg" style={{ background: "rgba(245, 158, 11, 0.05)", borderLeft: "3px solid #f59e0b" }}>
                      <span style={{ color: "var(--text-secondary)" }}>Processing Time: </span>
                      <span className="font-medium" style={{ color: "var(--text-primary)" }}>
                        {selectedDoc.processingTime / 1000}s
                      </span>
                    </div>
                  </div>
                )}
                {!selectedDoc.extractedData && (
                  <div className="text-center py-8">
                    <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                      {selectedDoc.status === "failed"
                        ? "Document processing failed"
                        : "Document is being processed..."}
                    </p>
                    {selectedDoc.errorMessage && (
                      <p className="text-xs mt-2 text-red-400">{selectedDoc.errorMessage}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Extracted Data */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                🤖 Extracted Data
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                    editMode ? "bg-brand-500/20 text-brand-400" : "hover:bg-white/5"
                  }`}
                  style={editMode ? {} : { color: "var(--text-tertiary)" }}
                >
                  {editMode ? "✓ Editing" : "✏️ Edit"}
                </button>
              </div>
            </div>

            {selectedDoc.extractedData ? (
              <div className="space-y-4">
                {/* Confidence & Status */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 p-3 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
                    <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Confidence Score</p>
                    <p className="text-lg font-bold text-green-400">{selectedDoc.confidence}%</p>
                  </div>
                  <div className="flex-1 p-3 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
                    <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>Validation</p>
                    <p className="text-lg font-bold text-green-400">✓ Passed</p>
                  </div>
                </div>

                {/* JSON Data */}
                <div className="code-block text-xs max-h-[400px] overflow-auto">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(selectedDoc.extractedData, null, 2)}
                  </pre>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(JSON.stringify(selectedDoc.extractedData, null, 2))}
                    className="btn-secondary py-2 px-4 text-xs"
                  >
                    📋 Copy JSON
                  </button>
                  <button className="btn-secondary py-2 px-4 text-xs">⬇️ JSON</button>
                  <button className="btn-secondary py-2 px-4 text-xs">📊 CSV</button>
                  <button className="btn-secondary py-2 px-4 text-xs">📈 Excel</button>
                  <button className="btn-secondary py-2 px-4 text-xs">📄 XML</button>
                </div>

                {/* Approval buttons */}
                <div className="flex gap-3 pt-2">
                  <button className="flex-1 btn-primary py-2.5 text-sm">✓ Approve</button>
                  <button className="flex-1 py-2.5 text-sm px-4 rounded-xl font-semibold transition-all bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25">
                    ✕ Reject
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">⏳</div>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  No extracted data available yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
