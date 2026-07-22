"use client";

import { useState } from "react";
import { schemaTemplates } from "@/lib/mock-data";

interface SchemaField {
  name: string;
  type: "string" | "number" | "boolean" | "array" | "object";
  required: boolean;
  description: string;
}

export default function SchemasPage() {
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
  const [showBuilder, setShowBuilder] = useState(false);
  const [customFields, setCustomFields] = useState<SchemaField[]>([
    { name: "", type: "string", required: true, description: "" },
  ]);

  const addField = () => {
    setCustomFields([...customFields, { name: "", type: "string", required: false, description: "" }]);
  };

  const removeField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, updates: Partial<SchemaField>) => {
    setCustomFields(customFields.map((f, i) => (i === index ? { ...f, ...updates } : f)));
  };

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Schema Library
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Predefined templates and custom schema builder for structured extraction.
          </p>
        </div>
        <button
          onClick={() => setShowBuilder(!showBuilder)}
          className="btn-primary flex items-center gap-2"
        >
          <span>{showBuilder ? "📋" : "➕"}</span>
          <span>{showBuilder ? "View Templates" : "Create Custom Schema"}</span>
        </button>
      </div>

      {!showBuilder ? (
        <>
          {/* Schema Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {schemaTemplates.map((schema, i) => (
              <div
                key={schema.id}
                onClick={() => setSelectedSchema(selectedSchema === schema.id ? null : schema.id)}
                className={`glass-card p-6 cursor-pointer transition-all ${
                  selectedSchema === schema.id
                    ? "border-brand-500/50 glow-sm"
                    : ""
                }`}
                style={{
                  animationDelay: `${i * 0.05}s`,
                  borderColor: selectedSchema === schema.id ? "#6366f150" : undefined,
                }}
              >
                <div className="text-3xl mb-3">{schema.icon}</div>
                <h3 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                  {schema.name}
                </h3>
                <p className="text-xs mb-3" style={{ color: "var(--text-secondary)" }}>
                  {schema.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {schema.fields.slice(0, 4).map((field) => (
                    <span key={field} className="badge badge-info text-[10px] py-0">
                      {field}
                    </span>
                  ))}
                  {schema.fields.length > 4 && (
                    <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                      +{schema.fields.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Schema Detail */}
          {selectedSchema && (
            <div className="glass-card p-6 animate-slide-up">
              {(() => {
                const schema = schemaTemplates.find((s) => s.id === selectedSchema);
                if (!schema) return null;
                return (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{schema.icon}</span>
                        <div>
                          <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                            {schema.name} Schema
                          </h3>
                          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                            {schema.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="btn-secondary py-2 px-4 text-xs">📋 Use Template</button>
                        <button className="btn-secondary py-2 px-4 text-xs">✏️ Customize</button>
                      </div>
                    </div>

                    {/* Schema JSON */}
                    <div className="code-block text-xs">
                      <pre>
{`{
  "$schema": "https://extractiq.com/schemas/${schema.id}.json",
  "type": "object",
  "properties": {
${schema.fields.map((field) => `    "${field.toLowerCase().replace(/\s+/g, "_")}": {
      "type": "string",
      "description": "Extracted ${field.toLowerCase()}"
    }`).join(",\n")}
  },
  "required": [${schema.fields.slice(0, 3).map((f) => `"${f.toLowerCase().replace(/\s+/g, "_")}"`).join(", ")}]
}`}
                      </pre>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </>
      ) : (
        /* Visual Schema Builder */
        <div className="glass-card p-6 animate-slide-up">
          <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            🔧 Visual Schema Builder
          </h3>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            Create custom extraction schemas by defining fields, types, and validation rules.
          </p>

          <div className="space-y-4 mb-6">
            {customFields.map((field, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl border"
                style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}
              >
                <span className="text-sm font-mono" style={{ color: "var(--text-tertiary)" }}>
                  #{i + 1}
                </span>
                <input
                  type="text"
                  value={field.name}
                  onChange={(e) => updateField(i, { name: e.target.value })}
                  placeholder="Field name (e.g., invoice_number)"
                  className="input-field py-2 flex-1 text-sm"
                />
                <select
                  value={field.type}
                  onChange={(e) => updateField(i, { type: e.target.value as SchemaField["type"] })}
                  className="input-field py-2 w-32 text-sm"
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                  <option value="array">Array</option>
                  <option value="object">Object</option>
                </select>
                <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "var(--text-secondary)" }}>
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => updateField(i, { required: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  Required
                </label>
                <button
                  onClick={() => removeField(i)}
                  className="text-red-400 hover:text-red-300 text-sm p-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={addField} className="btn-secondary py-2 px-4 text-sm">
              ➕ Add Field
            </button>
            <button className="btn-primary py-2 px-6 text-sm">
              💾 Save Schema
            </button>
          </div>

          {/* Preview */}
          {customFields.some((f) => f.name) && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                Schema Preview
              </h4>
              <div className="code-block text-xs">
                <pre>
{`{
  "$schema": "https://extractiq.com/schemas/custom.json",
  "type": "object",
  "properties": {
${customFields.filter(f => f.name).map((field) => `    "${field.name.toLowerCase().replace(/\s+/g, "_")}": {
      "type": "${field.type}"${field.description ? `,\n      "description": "${field.description}"` : ""}
    }`).join(",\n")}
  },
  "required": [${customFields.filter(f => f.name && f.required).map((f) => `"${f.name.toLowerCase().replace(/\s+/g, "_")}"`).join(", ")}]
}`}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
