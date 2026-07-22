"use client";

import { useState, useCallback, useRef } from "react";
import { schemaTemplates, formatFileSize } from "@/lib/mock-data";

interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: "pending" | "uploading" | "processing" | "completed" | "failed";
  confidence?: number;
  estimatedTime?: string;
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [selectedSchema, setSelectedSchema] = useState("invoice");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = useCallback((fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress: 100, status: "processing" } : f
          )
        );
        // Simulate processing
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileId
                ? { ...f, status: "completed", confidence: 90 + Math.random() * 9 }
                : f
            )
          );
        }, 2000 + Math.random() * 3000);
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? { ...f, progress: Math.min(progress, 99), status: "uploading" }
              : f
          )
        );
      }
    }, 200);
  }, []);

  const handleFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);
      const uploaded: UploadFile[] = fileArray.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: "pending" as const,
        estimatedTime: `${Math.ceil(file.size / 100000) + 1}s`,
      }));
      setFiles((prev) => [...prev, ...uploaded]);
      // Start upload simulation
      uploaded.forEach((file) => {
        setTimeout(() => simulateUpload(file.id), 100);
      });
    },
    [simulateUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => setFiles([]);

  const getFileIcon = (name: string) => {
    if (name.endsWith(".pdf")) return "📄";
    if (name.endsWith(".docx") || name.endsWith(".doc")) return "📝";
    if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "🖼️";
    if (name.endsWith(".png")) return "🖼️";
    if (name.endsWith(".tiff") || name.endsWith(".tif")) return "🖼️";
    if (name.endsWith(".zip")) return "📦";
    return "📄";
  };

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
          Upload Center
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Upload documents for AI-powered structured extraction.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Schema Selection */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              Extraction Schema
            </h3>
            <div className="flex flex-wrap gap-2">
              {schemaTemplates.slice(0, 8).map((schema) => (
                <button
                  key={schema.id}
                  onClick={() => setSelectedSchema(schema.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedSchema === schema.id
                      ? "bg-brand-500/20 text-brand-400 border border-brand-500/30"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                  style={{ color: selectedSchema === schema.id ? undefined : "var(--text-secondary)" }}
                >
                  <span className="mr-1">{schema.icon}</span>
                  {schema.name}
                </button>
              ))}
            </div>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`glass-card p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? "border-brand-500 glow-md"
                : "hover:border-brand-500/30"
            }`}
            style={{
              borderStyle: "dashed",
              borderWidth: "2px",
              borderColor: isDragging ? "#6366f1" : "var(--border-color)",
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.docx,.doc,.jpg,.jpeg,.png,.tiff,.tif,.zip"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
            />
            <div className={`text-5xl mb-4 transition-transform duration-300 ${isDragging ? "scale-110" : ""}`}>
              {isDragging ? "📥" : "📤"}
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              {isDragging ? "Drop your files here" : "Drag & drop documents here"}
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              or click to browse your files
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["PDF", "DOCX", "JPG", "PNG", "TIFF", "ZIP"].map((type) => (
                <span key={type} className="badge badge-info">{type}</span>
              ))}
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                  Uploaded Files ({files.length})
                </h3>
                <button onClick={clearAll} className="text-xs hover:text-red-400 transition-colors" style={{ color: "var(--text-tertiary)" }}>
                  Clear All
                </button>
              </div>
              <div className="space-y-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-4 rounded-xl border transition-all"
                    style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}
                  >
                    <span className="text-2xl">{getFileIcon(file.name)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                          {file.name}
                        </p>
                        <button
                          onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                          className="text-xs hover:text-red-400 ml-2 flex-shrink-0"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          ✕
                        </button>
                      </div>
                      <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-tertiary)" }}>
                        <span>{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span className={`badge text-[10px] py-0.5 ${
                          file.status === "completed" ? "badge-success" :
                          file.status === "processing" ? "badge-warning" :
                          file.status === "failed" ? "badge-error" :
                          file.status === "uploading" ? "badge-info" :
                          "badge-info"
                        }`}>
                          {file.status === "completed" ? "✓ Done" :
                           file.status === "processing" ? "⚙ Processing..." :
                           file.status === "uploading" ? `↑ ${Math.round(file.progress)}%` :
                           file.status === "failed" ? "✕ Failed" :
                           "⏳ Queued"}
                        </span>
                        {file.confidence && (
                          <span className="text-green-400">{file.confidence.toFixed(1)}% confidence</span>
                        )}
                      </div>
                      {/* Progress bar */}
                      {(file.status === "uploading" || file.status === "processing") && (
                        <div className="progress-bar mt-2">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Schema Info */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              Schema: {schemaTemplates.find((s) => s.id === selectedSchema)?.name}
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              {schemaTemplates.find((s) => s.id === selectedSchema)?.description}
            </p>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-tertiary)" }}>
              Extracted Fields
            </h4>
            <div className="space-y-1.5">
              {schemaTemplates.find((s) => s.id === selectedSchema)?.fields.map((field) => (
                <div key={field} className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                  <span style={{ color: "var(--text-secondary)" }}>{field}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Processing Pipeline Info */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              ⚡ Processing Pipeline
            </h3>
            <div className="space-y-2">
              {["OCR Processing", "Document Parsing", "Semantic Chunking", "AI Extraction", "Schema Validation", "JSON Output"].map((stage, i) => (
                <div key={stage} className="flex items-center gap-2 text-sm">
                  <span className="text-xs font-mono" style={{ color: "var(--text-tertiary)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ color: "var(--text-secondary)" }}>{stage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
              💡 Tips
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>High-resolution scans yield better OCR results</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Select the correct schema for maximum accuracy</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>ZIP files allow batch processing of multiple documents</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Supported languages: English, Spanish, French, German</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
