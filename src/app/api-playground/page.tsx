"use client";

import { useState } from "react";
import { apiEndpoints } from "@/lib/mock-data";

export default function ApiPlaygroundPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [requestBody, setRequestBody] = useState(apiEndpoints[0].requestBody || "");
  const [response, setResponse] = useState(apiEndpoints[0].responseExample);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("sk-proj-****...****789");

  const endpoint = apiEndpoints[selectedEndpoint];

  const handleSend = () => {
    setIsLoading(true);
    setResponse("Loading...");
    setTimeout(() => {
      setResponse(endpoint.responseExample);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            API Playground
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Test and explore the ExtractIQ API endpoints interactively.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Endpoint List */}
        <div className="glass-card p-4">
          <h3 className="font-semibold mb-3 px-2" style={{ color: "var(--text-primary)" }}>
            Endpoints
          </h3>
          <div className="space-y-1">
            {apiEndpoints.map((ep, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedEndpoint(i);
                  setRequestBody(ep.requestBody || "");
                  setResponse(ep.responseExample);
                }}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  selectedEndpoint === i
                    ? "bg-brand-500/15 border border-brand-500/30"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <span className={`text-xs font-bold px-2 py-1 rounded mr-2 ${
                  ep.method === "POST" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                }`}>
                  {ep.method}
                </span>
                <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
                  {ep.path}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Request / Response */}
        <div className="lg:col-span-3 space-y-6">
          {/* Endpoint Info */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-sm font-bold px-3 py-1.5 rounded-lg ${
                endpoint.method === "POST" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
              }`}>
                {endpoint.method}
              </span>
              <code className="text-sm font-mono" style={{ color: "var(--text-primary)" }}>
                https://api.extractiq.com{endpoint.path}
              </code>
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{endpoint.description}</p>

            {/* API Key */}
            <div className="mt-4 flex items-center gap-3">
              <label className="text-xs font-semibold" style={{ color: "var(--text-tertiary)" }}>API Key:</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="input-field py-1.5 px-3 flex-1 text-xs font-mono max-w-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                  📤 Request
                </h3>
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className={`btn-primary py-1.5 px-4 text-xs ${isLoading ? "opacity-50" : ""}`}
                >
                  {isLoading ? "Sending..." : "▶ Send Request"}
                </button>
              </div>
              {endpoint.requestBody ? (
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="code-block text-xs w-full min-h-[300px] resize-none border-0 p-4"
                  style={{ background: "#0d1117", color: "#e6edf3", borderRadius: "12px" }}
                />
              ) : (
                <div className="code-block text-xs min-h-[300px] flex items-center justify-center" style={{ color: "var(--text-tertiary)" }}>
                  No request body required for this endpoint
                </div>
              )}
            </div>

            {/* Response */}
            <div className="glass-card p-6">
              <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--text-primary)" }}>
                📥 Response
                {!isLoading && (
                  <span className="ml-2 badge badge-success text-[10px]">200 OK</span>
                )}
              </h3>
              <div className="code-block text-xs min-h-[300px] max-h-[400px] overflow-auto">
                <pre className="whitespace-pre-wrap">
                  {isLoading ? (
                    <span className="animate-pulse">Processing request...</span>
                  ) : (
                    response
                  )}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
