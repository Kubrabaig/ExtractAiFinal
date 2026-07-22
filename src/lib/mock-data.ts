// Mock data for the entire application
export const mockDocuments = [
  {
    id: "1",
    filename: "invoice_001.pdf",
    fileType: "pdf" as const,
    fileSize: 245000,
    status: "completed" as const,
    schemaType: "invoice" as const,
    confidence: 96.5,
    processingTime: 3200,
    createdAt: "2025-01-15T10:30:00Z",
    extractedData: {
      invoiceNumber: "INV-2025-001",
      vendor: { name: "Acme Corp", email: "billing@acme.com", address: "123 Business St, San Francisco, CA" },
      customer: { name: "TechStart Inc", email: "ap@techstart.io", address: "456 Startup Blvd, Austin, TX" },
      date: "2025-01-15",
      dueDate: "2025-02-15",
      lineItems: [
        { description: "AI Platform License", quantity: 1, unitPrice: 2500, total: 2500 },
        { description: "Premium Support (Annual)", quantity: 1, unitPrice: 500, total: 500 },
      ],
      subtotal: 3000,
      tax: 240,
      total: 3240,
      currency: "USD",
    },
  },
  {
    id: "2",
    filename: "receipt_target_jan.pdf",
    fileType: "pdf" as const,
    fileSize: 128000,
    status: "completed" as const,
    schemaType: "receipt" as const,
    confidence: 94.2,
    processingTime: 1800,
    createdAt: "2025-01-14T15:45:00Z",
    extractedData: {
      storeName: "Target",
      storeAddress: "789 Main St, Portland, OR",
      date: "2025-01-14",
      items: [
        { name: "Wireless Mouse", price: 29.99 },
        { name: "USB-C Hub", price: 45.99 },
        { name: "Screen Protector", price: 12.99 },
      ],
      subtotal: 88.97,
      tax: 7.12,
      total: 96.09,
      paymentMethod: "Visa ****4532",
    },
  },
  {
    id: "3",
    filename: "resume_jane_smith.docx",
    fileType: "docx" as const,
    fileSize: 89000,
    status: "completed" as const,
    schemaType: "resume" as const,
    confidence: 98.1,
    processingTime: 2100,
    createdAt: "2025-01-13T09:20:00Z",
    extractedData: {
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1-555-0123",
      location: "Seattle, WA",
      summary: "Senior ML Engineer with 8+ years of experience in NLP and computer vision.",
      experience: [
        { company: "Google", role: "Senior ML Engineer", duration: "2021-Present", description: "Led NLP model development" },
        { company: "Microsoft", role: "ML Engineer", duration: "2018-2021", description: "Built computer vision pipelines" },
      ],
      education: [{ school: "Stanford University", degree: "MS Computer Science", year: "2018" }],
      skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision"],
    },
  },
  {
    id: "4",
    filename: "bank_statement_dec.pdf",
    fileType: "pdf" as const,
    fileSize: 340000,
    status: "processing" as const,
    schemaType: "bank_statement" as const,
    confidence: 0,
    processingTime: 0,
    createdAt: "2025-01-12T14:10:00Z",
    extractedData: null,
  },
  {
    id: "5",
    filename: "contract_saas_2025.pdf",
    fileType: "pdf" as const,
    fileSize: 567000,
    status: "completed" as const,
    schemaType: "contract" as const,
    confidence: 92.8,
    processingTime: 4500,
    createdAt: "2025-01-11T11:30:00Z",
    extractedData: {
      contractType: "SaaS Subscription Agreement",
      parties: ["ExtractIQ Inc", "DataFlow Corp"],
      effectiveDate: "2025-01-01",
      terminationDate: "2025-12-31",
      terms: "Annual subscription with auto-renewal",
      keyTerms: { monthlyFee: 2500, contractValue: 30000 },
    },
  },
  {
    id: "6",
    filename: "medical_report_smith.pdf",
    fileType: "pdf" as const,
    fileSize: 210000,
    status: "failed" as const,
    schemaType: "medical_report" as const,
    confidence: 0,
    processingTime: 0,
    createdAt: "2025-01-10T16:45:00Z",
    errorMessage: "OCR processing failed: Unable to read scanned image",
    extractedData: null,
  },
  {
    id: "7",
    filename: "passport_scan.jpg",
    fileType: "jpg" as const,
    fileSize: 456000,
    status: "completed" as const,
    schemaType: "passport" as const,
    confidence: 97.3,
    processingTime: 2800,
    createdAt: "2025-01-09T08:15:00Z",
    extractedData: {
      documentType: "PASSPORT",
      countryCode: "USA",
      surname: "JOHNSON",
      givenNames: "MICHAEL ROBERT",
      nationality: "UNITED STATES OF AMERICA",
      dateOfBirth: "1990-03-15",
      placeOfBirth: "NEW YORK, NY",
      sex: "M",
      passportNumber: "123456789",
      dateOfIssue: "2020-01-20",
      dateOfExpiry: "2030-01-19",
    },
  },
  {
    id: "8",
    filename: "utility_bill_jan.png",
    fileType: "png" as const,
    fileSize: 178000,
    status: "completed" as const,
    schemaType: "utility_bill" as const,
    confidence: 91.5,
    processingTime: 2200,
    createdAt: "2025-01-08T12:00:00Z",
    extractedData: {
      provider: "Pacific Power & Light",
      accountNumber: "PL-8876543",
      billingPeriod: "Dec 2024 - Jan 2025",
      amountDue: 142.36,
      dueDate: "2025-02-05",
      meterReading: "45,230 kWh",
    },
  },
];

export const mockJobs = [
  { id: "j1", documentId: "4", status: "running" as const, currentStage: "OCR Processing", stagesCompleted: 2, totalStages: 10, createdAt: "2025-01-12T14:10:00Z" },
  { id: "j2", documentId: "6", status: "failed" as const, currentStage: "OCR Processing", stagesCompleted: 1, totalStages: 10, errorMessage: "OCR processing failed", createdAt: "2025-01-10T16:45:00Z" },
  { id: "j3", documentId: "1", status: "completed" as const, stagesCompleted: 10, totalStages: 10, confidence: 96.5, createdAt: "2025-01-15T10:30:00Z" },
  { id: "j4", documentId: "2", status: "completed" as const, stagesCompleted: 10, totalStages: 10, confidence: 94.2, createdAt: "2025-01-14T15:45:00Z" },
  { id: "j5", documentId: "3", status: "completed" as const, stagesCompleted: 10, totalStages: 10, confidence: 98.1, createdAt: "2025-01-13T09:20:00Z" },
];

export const pipelineStages = [
  "Upload",
  "OCR Processing",
  "Document Parsing",
  "Semantic Chunking",
  "Embedding Generation",
  "Vector Search",
  "LLM Understanding",
  "Schema Validation",
  "Structured JSON Output",
  "Export",
];

export const schemaTemplates = [
  { id: "invoice", name: "Invoice", icon: "📄", description: "Extract vendor, line items, totals, and payment terms", fields: ["Invoice Number", "Vendor", "Customer", "Date", "Line Items", "Subtotal", "Tax", "Total", "Currency"] },
  { id: "receipt", name: "Receipt", icon: "🧾", description: "Extract store info, items, and payment details", fields: ["Store Name", "Address", "Date", "Items", "Subtotal", "Tax", "Total", "Payment Method"] },
  { id: "resume", name: "Resume", icon: "📋", description: "Extract personal info, experience, education, and skills", fields: ["Name", "Email", "Phone", "Summary", "Experience", "Education", "Skills"] },
  { id: "medical_report", name: "Medical Report", icon: "🏥", description: "Extract patient info, diagnosis, and treatment plans", fields: ["Patient Name", "DOB", "Diagnosis", "Vitals", "Medications", "Recommendations"] },
  { id: "bank_statement", name: "Bank Statement", icon: "🏦", description: "Extract transactions, balances, and account info", fields: ["Account Number", "Period", "Opening Balance", "Transactions", "Closing Balance"] },
  { id: "passport", name: "Passport", icon: "🛂", description: "Extract personal details and document info", fields: ["Full Name", "Nationality", "DOB", "Passport Number", "Issue Date", "Expiry Date"] },
  { id: "driving_license", name: "Driving License", icon: "🚗", description: "Extract driver info and license details", fields: ["Name", "License Number", "Class", "Issue Date", "Expiry Date", "Restrictions"] },
  { id: "utility_bill", name: "Utility Bill", icon: "⚡", description: "Extract provider, usage, and billing details", fields: ["Provider", "Account Number", "Billing Period", "Usage", "Amount Due", "Due Date"] },
  { id: "tax_form", name: "Tax Form", icon: "📊", description: "Extract tax-related information and filing details", fields: ["Filing Status", "Income", "Deductions", "Credits", "Tax Due", "Refund"] },
  { id: "contract", name: "Contract", icon: "📜", description: "Extract parties, terms, and key provisions", fields: ["Contract Type", "Parties", "Effective Date", "Terms", "Key Clauses", "Signatures"] },
  { id: "purchase_order", name: "Purchase Order", icon: "🛒", description: "Extract vendor, items, and delivery details", fields: ["PO Number", "Vendor", "Items", "Quantities", "Unit Price", "Total", "Delivery Date"] },
  { id: "insurance_claim", name: "Insurance Claim", icon: "🛡️", description: "Extract claim details, policy info, and coverage", fields: ["Claim Number", "Policy Number", "Incident Date", "Description", "Coverage", "Claimed Amount"] },
  { id: "employment_letter", name: "Employment Letter", icon: "💼", description: "Extract employment details and verification", fields: ["Employee Name", "Company", "Position", "Start Date", "Salary", "Benefits"] },
];

export const kpiData = [
  { label: "Documents Processed", value: "12,847", change: "+12.5%", trend: "up" as const, icon: "📄" },
  { label: "Active Jobs", value: "23", change: "-3", trend: "down" as const, icon: "⚡" },
  { label: "Extraction Accuracy", value: "97.3%", change: "+1.2%", trend: "up" as const, icon: "🎯" },
  { label: "Avg Response Time", value: "2.4s", change: "-0.3s", trend: "up" as const, icon: "⏱️" },
  { label: "Failed Jobs", value: "18", change: "+2", trend: "down" as const, icon: "❌" },
  { label: "Processing Queue", value: "45", change: "+8", trend: "up" as const, icon: "📋" },
  { label: "AI Confidence Score", value: "95.8%", change: "+0.8%", trend: "up" as const, icon: "🤖" },
  { label: "API Usage", value: "89.2%", change: "+5.4%", trend: "up" as const, icon: "📊" },
];

export const chartData = {
  documentsProcessed: [
    { name: "Mon", value: 420 },
    { name: "Tue", value: 380 },
    { name: "Wed", value: 510 },
    { name: "Thu", value: 470 },
    { name: "Fri", value: 590 },
    { name: "Sat", value: 320 },
    { name: "Sun", value: 280 },
  ],
  aiAccuracy: [
    { name: "Week 1", value: 94.2 },
    { name: "Week 2", value: 95.1 },
    { name: "Week 3", value: 96.0 },
    { name: "Week 4", value: 96.8 },
    { name: "Week 5", value: 97.3 },
  ],
  processingTime: [
    { name: "Mon", avg: 2.4, min: 1.2, max: 4.8 },
    { name: "Tue", avg: 2.1, min: 1.0, max: 4.2 },
    { name: "Wed", avg: 2.6, min: 1.3, max: 5.1 },
    { name: "Thu", avg: 2.3, min: 1.1, max: 4.5 },
    { name: "Fri", avg: 2.0, min: 0.9, max: 3.9 },
  ],
  fileTypeDistribution: [
    { name: "PDF", value: 58, fill: "#6366f1" },
    { name: "DOCX", value: 18, fill: "#8b5cf6" },
    { name: "JPG", value: 12, fill: "#a78bfa" },
    { name: "PNG", value: 8, fill: "#c4b5fd" },
    { name: "TIFF", value: 4, fill: "#ddd6fe" },
  ],
  successVsFailure: [
    { name: "Success", value: 94.2, fill: "#10b981" },
    { name: "Failed", value: 5.8, fill: "#ef4444" },
  ],
  tokenUsage: [
    { name: "Jan 1", promptTokens: 125000, completionTokens: 85000 },
    { name: "Jan 5", promptTokens: 142000, completionTokens: 95000 },
    { name: "Jan 10", promptTokens: 168000, completionTokens: 112000 },
    { name: "Jan 15", promptTokens: 195000, completionTokens: 128000 },
  ],
};

export const activityTimeline = [
  { id: "1", action: "Document uploaded", detail: "invoice_001.pdf", time: "2 min ago", type: "upload" },
  { id: "2", action: "Extraction completed", detail: "receipt_target_jan.pdf — 94.2% confidence", time: "5 min ago", type: "success" },
  { id: "3", action: "Job failed", detail: "medical_report_smith.pdf — OCR processing error", time: "12 min ago", type: "error" },
  { id: "4", action: "Schema created", detail: "Custom: Vendor Contract v2", time: "1 hour ago", type: "schema" },
  { id: "5", action: "Batch processing started", detail: "15 documents queued", time: "2 hours ago", type: "batch" },
  { id: "6", action: "API key generated", detail: "Production key (prod_***789)", time: "3 hours ago", type: "api" },
  { id: "7", action: "Export completed", detail: "batch_export_001.xlsx — 45 documents", time: "4 hours ago", type: "export" },
  { id: "8", action: "User added", detail: "sarah@company.com joined as Reviewer", time: "5 hours ago", type: "user" },
];

export const notifications = [
  { id: "1", title: "Batch Processing Complete", message: "15/15 documents processed successfully", time: "2 min ago", read: false, type: "success" },
  { id: "2", title: "Extraction Failed", message: "medical_report_smith.pdf needs manual review", time: "12 min ago", read: false, type: "error" },
  { id: "3", title: "System Update", message: "OCR engine upgraded to v3.2.1", time: "1 hour ago", read: true, type: "info" },
  { id: "4", title: "Storage Warning", message: "85% of storage quota used", time: "3 hours ago", read: true, type: "warning" },
];

export const apiEndpoints = [
  {
    method: "POST",
    path: "/api/v1/extract",
    description: "Extract structured data from a single document",
    requestBody: `{
  "file": "base64_encoded_file",
  "schema_type": "invoice",
  "options": {
    "enable_ocr": true,
    "confidence_threshold": 0.85
  }
}`,
    responseExample: `{
  "success": true,
  "document_id": "doc_abc123",
  "status": "completed",
  "extracted_data": {
    "invoice_number": "INV-2025-001",
    "vendor": { "name": "Acme Corp" },
    "total": 3240.00
  },
  "confidence": 0.965,
  "processing_time_ms": 3200
}`,
  },
  {
    method: "POST",
    path: "/api/v1/batch_extract",
    description: "Process multiple documents in parallel",
    requestBody: `{
  "files": ["base64_1", "base64_2"],
  "schema_type": "receipt",
  "priority": "high"
}`,
    responseExample: `{
  "batch_id": "batch_xyz789",
  "total_files": 2,
  "status": "queued",
  "estimated_time": 15
}`,
  },
  {
    method: "GET",
    path: "/api/v1/status/:id",
    description: "Check the status of an extraction job",
    responseExample: `{
  "job_id": "job_abc123",
  "status": "completed",
  "stage": "export",
  "progress": 100,
  "confidence": 0.965
}`,
  },
  {
    method: "GET",
    path: "/api/v1/history",
    description: "Retrieve extraction history",
    responseExample: `{
  "documents": [...],
  "total": 12847,
  "page": 1,
  "per_page": 20
}`,
  },
  {
    method: "GET",
    path: "/api/v1/download/:id",
    description: "Download extracted data in various formats",
    responseExample: `{
  "download_url": "https://...",
  "format": "json",
  "expires_at": "2025-01-16T10:00:00Z"
}`,
  },
];

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const getFileTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    pdf: "text-red-400",
    docx: "text-blue-400",
    jpg: "text-green-400",
    png: "text-purple-400",
    tiff: "text-yellow-400",
    zip: "text-orange-400",
  };
  return colors[type] || "text-gray-400";
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    uploaded: "badge-info",
    processing: "badge-warning",
    completed: "badge-success",
    failed: "badge-error",
    reviewed: "badge-info",
    approved: "badge-success",
    rejected: "badge-error",
    queued: "badge-info",
    running: "badge-warning",
    paused: "badge-warning",
    cancelled: "badge-error",
  };
  return colors[status] || "badge-info";
};
