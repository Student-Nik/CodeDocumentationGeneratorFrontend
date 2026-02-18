import React, { useState } from "react";
import { Upload, Loader2, Download, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function DocumentationGeneratorPage() {
  const [language, setLanguage] = useState(""); // text input for language
  const [code, setCode] = useState(""); // paste code
  const [file, setFile] = useState(null); // upload source code file
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const allowedExtensions = ["c", "java", "py", "js", "sh"];

  // Generate documentation
  const handleGenerate = async () => {
    if (!language.trim()) {
      alert("Please enter a language.");
      return;
    }
    if (!code && !file) {
      alert("Please enter code or upload a source code file.");
      return;
    }

    setLoading(true);
    setResponseData(null);

    try {
      let data;
      if (file) {
        // File upload API
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "metadata",
          new Blob([JSON.stringify({ language })], { type: "application/json" })
        );

        const res = await fetch("http://localhost:8080/upload-pdf", { // backend endpoint still used
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("File upload failed");
        data = await res.json();
      } else {
        // Code API
        const res = await fetch("http://localhost:8080/generate-documentation-by-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language, code }),
        });

        if (!res.ok) throw new Error("Code generation failed");
        data = await res.json();
      }

      setResponseData(data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong! Check your backend server.");
    }

    setLoading(false);
  };

  // Download PDF
  const handleDownload = () => {
    if (!responseData?.downloadUrl && !responseData?.id) return;
    const url = responseData.downloadUrl
      ? `http://localhost:8080${responseData.downloadUrl}`
      : `http://localhost:8080/download-pdf/${responseData.id}`;
    window.open(url, "_blank");
  };

  // Drag & Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = () => setDragActive(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    const ext = droppedFile?.name.split(".").pop().toLowerCase();
    if (droppedFile && allowedExtensions.includes(ext)) {
      setFile(droppedFile);
    } else {
      alert(`Only source code files are allowed: ${allowedExtensions.join(", ")}`);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    const ext = selectedFile?.name.split(".").pop().toLowerCase();
    if (selectedFile && allowedExtensions.includes(ext)) {
      setFile(selectedFile);
    } else {
      alert(`Only source code files are allowed: ${allowedExtensions.join(", ")}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center px-6 py-12 relative overflow-hidden">

      {/* Animated Background */}
      <div className="absolute w-96 h-96 bg-indigo-500/30 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-purple-500/30 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-5xl">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-wide">
            AI Code Documentation Generator
          </h1>
          <p className="text-gray-300">
            Type your language, paste code, or upload a source code file to get structured documentation instantly.
          </p>
        </motion.div>

        {/* Input Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:shadow-indigo-500/40 hover:scale-[1.01]">

          {/* Language Input */}
          <input
            type="text"
            placeholder="Enter Language (e.g., Java, Python)"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mb-5 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition w-full"
          />

          {/* Code Input */}
          <textarea
            placeholder="Paste your code here (optional)..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={10}
            className="w-full mb-6 px-4 py-4 rounded-2xl bg-black/70 text-green-400 font-mono text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
          />

          {/* Source Code File Upload */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`group border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer 
              ${dragActive ? "border-indigo-400 bg-white/5" : "border-white/30"} 
              hover:border-indigo-400 hover:bg-white/5 mb-5`}
          >
            <input
              type="file"
              accept={allowedExtensions.map((ext) => `.${ext}`).join(",")}
              onChange={handleFileSelect}
              className="hidden"
              id="fileUpload"
            />
            <label htmlFor="fileUpload" className="flex flex-col items-center gap-3 text-white">
              <Upload size={40} className="transition-transform duration-300 group-hover:scale-110 group-hover:text-indigo-400" />
              <span className="font-medium text-lg">
                {file ? file.name : "Drag & Drop your source code file here or Click to Upload (optional)"}
              </span>
              <span className="text-sm text-gray-400">Allowed: .c, .java, .py, .js, .sh</span>
            </label>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Generating Documentation..." : "Generate Documentation"}
          </button>
        </motion.div>

        {/* Result Section */}
        {responseData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-xl text-white transition-all duration-500 hover:shadow-green-500/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="text-green-400" />
              <h2 className="text-xl font-semibold">Documentation Generated Successfully</h2>
            </div>

            {responseData.generatedDocumentation && (
              <pre className="bg-black/70 text-green-300 p-4 rounded-xl text-sm whitespace-pre-wrap max-h-80 overflow-auto border border-white/20 mb-6">
                {responseData.generatedDocumentation}
              </pre>
            )}

            <button
              onClick={handleDownload}
              className="bg-green-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-green-600 hover:scale-105 flex items-center gap-2"
            >
              <Download size={18} /> Download PDF
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
