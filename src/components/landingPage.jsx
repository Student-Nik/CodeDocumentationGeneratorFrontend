import { motion } from "framer-motion";
import {
  ArrowRight,
  FileCode,
  Upload,
  Download,
  Sparkles,
  Github,
  Shield,
  Zap,
  FileText,
} from "lucide-react";

export default function LandingPage() {
  const handleRedirect = () => {
    window.location.href = "/codedocumentationgenerator";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full backdrop-blur-md bg-slate-900/70 border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl font-bold text-indigo-400">
            <Sparkles size={22} /> AI DocGen
          </div>
          <button
            onClick={handleRedirect}
            className="bg-indigo-500 hover:bg-indigo-600 hover:scale-105 transition-all duration-300 px-5 py-2 rounded-xl font-semibold shadow-lg shadow-indigo-500/30"
          >
            Try Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-40 pb-32">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight"
        >
          AI Powered
          <span className="block text-indigo-400 mt-2">
            Code Documentation Generator
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-slate-300"
        >
          Instantly transform source code into structured, professional
          documentation. Upload files or paste code and download ready-to-use
          PDF documentation in seconds.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={handleRedirect}
          className="mt-10 inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl shadow-indigo-500/30 transition-all duration-300"
        >
          Try Now
          <ArrowRight size={20} />
        </motion.button>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center">
        {[
          { icon: <FileCode size={28} />, label: "Multiple Languages" },
          { icon: <Zap size={28} />, label: "Instant Processing" },
          { icon: <Shield size={28} />, label: "Secure & Private" },
          { icon: <FileText size={28} />, label: "Structured PDF Output" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.08, y: -10 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, type: "spring", stiffness: 150 }}
            className="group bg-slate-800/60 p-8 rounded-2xl shadow-lg hover:shadow-indigo-500/40 hover:border hover:border-indigo-500/40 transition-all duration-300 cursor-pointer"
          >
            <div className="flex justify-center mb-4 text-indigo-400 group-hover:scale-125 group-hover:text-indigo-300 transition-all duration-300">
              {stat.icon}
            </div>
            <p className="font-semibold text-lg group-hover:text-indigo-300 transition">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </section>

      {/* How It Works */}
      <section className="px-6 py-24 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: <Upload size={30} />,
              title: "Upload or Paste Code",
              desc: "Submit your source code file or raw snippet instantly.",
            },
            {
              icon: <Sparkles size={30} />,
              title: "AI Analysis",
              desc: "Our AI analyzes structure, functions, and logic.",
            },
            {
              icon: <Download size={30} />,
              title: "Download Documentation",
              desc: "Get professional PDF documentation ready to use.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.08, y: -12 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, type: "spring", stiffness: 150 }}
              className="group bg-slate-800/60 backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:shadow-indigo-500/40 hover:border hover:border-indigo-500/40 transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-center text-indigo-400 mb-4 group-hover:scale-125 group-hover:text-indigo-300 transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-300 transition">
                {step.title}
              </h3>
              <p className="text-slate-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Build Documentation Smarter, Not Harder
        </motion.h2>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRedirect}
          className="mt-8 bg-indigo-500 hover:bg-indigo-600 px-10 py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-indigo-500/40 transition-all duration-300"
        >
          Start Generating Now
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 border-t border-slate-800 text-slate-500">
        <div className="flex justify-center gap-6 mb-4">
          <Github className="hover:text-white hover:scale-125 transition-all duration-300 cursor-pointer" />
        </div>
        © {new Date().getFullYear()} AI Code Documentation Generator. All rights reserved.
      </footer>
    </div>
  );
}
