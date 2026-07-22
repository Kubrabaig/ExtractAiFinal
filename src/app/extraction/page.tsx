"use client";

import { useState, useEffect } from "react";

const pipelineStages = [
  { id: "ocr", label: "OCR Processing", icon: "📷", description: "Extracting text from document using PaddleOCR" },
  { id: "parse", label: "Document Parsing", icon: "📖", description: "Identifying document structure and layout" },
  { id: "classify", label: "Document Classification", icon: "🏷️", description: "Classifying document type and content" },
  { id: "chunk", label: "Semantic Chunking", icon: "🧩", description: "Splitting content into meaningful semantic units" },
  { id: "embed", label: "Embedding Generation", icon: "🔢", description: "Generating vector embeddings for semantic search" },
  { id: "search", label: "Vector Search", icon: "🔍", description: "Finding relevant context using FAISS similarity search" },
  { id: "llm", label: "LLM Understanding", icon: "🧠", description: "GPT-4 analyzing and extracting structured information" },
  { id: "validate", label: "Schema Validation", icon: "✅", description: "Validating extracted data against Pydantic schema" },
  { id: "confidence", label: "Confidence Scoring", icon: "📊", description: "Calculating confidence scores for each field" },
  { id: "output", label: "Structured JSON Output", icon: "📄", description: "Generating final validated JSON response" },
];

const sampleExtractionResult = {
  invoiceNumber: "INV-2025-001",
  vendor: {
    name: "Acme Corp",
    email: "billing@acme.com",
    address: "123 Business St, San Francisco, CA 94105",
    taxId: "US-12345678",
  },
  customer: {
    name: "TechStart Inc",
    email: "ap@techstart.io",
    address: "456 Startup Blvd, Austin, TX 73301",
  },
  dates: {
    invoiceDate: "2025-01-15",
    dueDate: "2025-02-15",
    paymentTerms: "Net 30",
  },
  lineItems: [
    { description: "AI Platform License", quantity: 1, unitPrice: 2500.0, total: 2500.0 },
    { description: "Premium Support (Annual)", quantity: 1, unitPrice: 500.0, total: 500.0 },
    { description: "Custom Integration", quantity: 4, unitPrice: 150.0, total: 600.0 },
  ],
  amounts: {
    subtotal: 3600.0,
    taxRate: 0.08,
    taxAmount: 288.0,
    total: 3888.0,
    currency: "USD",
  },
};

export default function ExtractionPage() {
  const [activeStage, setActiveStage] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());
  const [showResult, setShowResult] = useState(false);

  const startExtraction = () => {
    setActiveStage(0);
    setCompletedStages(new Set());
    setIsRunning(true);
    setShowResult(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      if (activeStage >= pipelineStages.length - 1) {
        setIsRunning(false);
        setShowResult(true);
        clearInterval(timer);
        return;
      }

      setCompletedStages((prev) => new Set([...prev, activeStage]));
      setActiveStage((prev) => prev + 1);
    }, 800);

    return () => clearInterval(timer);
  }, [isRunning, activeStage]);

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            AI Extraction Experience
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Watch the AI pipeline process a document in real-time.
          </p>
        </div>
        <button
          onClick={startExtraction}
          disabled={isRunning}
          className={`btn-primary flex items-center gap-2 ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <span>{isRunning ? "⚙️" : "🚀"}</span>
          <span>{isRunning ? "Processing..." : "Start Extraction"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Visualization */}
        <div className="space-y-4">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
              🔄 Processing Pipeline
            </h3>
            <div className="space-y-2">
              {pipelineStages.map((stage, i) => {
                const isCompleted = completedStages.has(i);
                const isActive = i === activeStage && isRunning;
                const isPending = i > activeStage || (!isRunning && !isCompleted);

                return (
                  <div
                    key={stage.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "border-brand-500/50 bg-brand-500/10"
                        : isCompleted
                        ? "border-green-500/30 bg-green-500/5"
                        : "border-transparent"
                    }`}
                  >
                    {/* Icon */}
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-sm transition-all ${
                      isCompleted
                        ? "bg-green-500/20"
                        : isActive
                        ? "bg-brand-500/20 animate-pulse"
                        : "bg-white/5"
                    }`}>
                      {isCompleted ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : (
                        <span>{stage.icon}</span>
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        isCompleted ? "text-green-400" : isActive ? "text-brand-400" : ""
                      }`} style={isPending ? { color: "var(--text-tertiary)" } : {}}>
                        {isCompleted ? "✓ " : ""}{stage.label}
                      </p>
                      {isActive && (
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                          {stage.description}
                        </p>
                      )}
                    </div>

                    {/* Status */}
                    {isCompleted && (
                      <span className="badge badge-success text-[10px]">Done</span>
                    )}
                    {isActive && (
                      <div className="flex items-center gap-1">
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

        {/* Output / Result */}
        <div className="space-y-4">
          {/* Progress Summary */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                📊 Extraction Status
              </h3>
              {showResult && (
                <span className="badge badge-success">✓ Complete</span>
              )}
            </div>

            {/* Progress bar */}
            <div className="progress-bar mb-4">
              <div
                className="progress-bar-fill transition-all duration-300"
                style={{
                  width: `${isRunning || showResult
                    ? ((showResult ? pipelineStages.length : activeStage) / pipelineStages.length) * 100
                    : 0
                  }%`,
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
                <p style={{ color: "var(--text-tertiary)" }}>Stages Completed</p>
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {showResult ? pipelineStages.length : completedStages.size} / {pipelineStages.length}
                </p>
              </div>
              <div className="p-3 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
                <p style={{ color: "var(--text-tertiary)" }}>Confidence</p>
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {showResult ? "96.8%" : isRunning ? "Calculating..." : "—"}
                </p>
              </div>
              <div className="p-3 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
                <p style={{ color: "var(--text-tertiary)" }}>Processing Time</p>
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {showResult ? "3.2s" : isRunning ? "Running..." : "—"}
                </p>
              </div>
              <div className="p-3 rounded-xl" style={{ background: "var(--bg-secondary)" }}>
                <p style={{ color: "var(--text-tertiary)" }}>Tokens Used</p>
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  {showResult ? "2,847" : isRunning ? "..." : "—"}
                </p>
              </div>
            </div>
          </div>

          {/* JSON Output */}
          {showResult && (
            <div className="glass-card p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  📄 Structured Output
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(JSON.stringify(sampleExtractionResult, null, 2))}
                    className="btn-secondary py-1.5 px-3 text-xs"
                  >
                    📋 Copy JSON
                  </button>
                  <button className="btn-secondary py-1.5 px-3 text-xs">
                    ⬇️ Download
                  </button>
                </div>
              </div>
              <div className="code-block text-xs max-h-[500px] overflow-auto">
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(sampleExtractionResult, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {!showResult && !isRunning && (
            <div className="glass-card p-12 text-center">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                Ready to Extract
              </h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Click &ldquo;Start Extraction&rdquo; to see the AI pipeline in action with a sample invoice document.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
