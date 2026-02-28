-2
+26
import { useState } from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Link as LinkIcon, CheckCircle2, AlertCircle, Copy } from "lucide-react";
import { 
  Loader2, 
  Link as LinkIcon, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Menu, 
  X, 
  Home as HomeIcon, 
  ExternalLink, 
  LayoutList, 
  Activity,
  Disc,
  Bot
} from "lucide-react";
import { bypassRequestSchema, type BypassRequest } from "@shared/schema";
import { useBypass } from "@/hooks/use-bypass";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { api } from "@shared/routes";
import { useQuery } from "@tanstack/react-query";
type Tab = "home" | "supported" | "status";
export default function Home() {
  const { toast } = useToast();
  const bypassMutation = useBypass();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: stats } = useQuery({
    queryKey: [api.stats.get.path],
  });
  const form = useForm<BypassRequest>({
    resolver: zodResolver(bypassRequestSchema),
-120
+119
    }
  };
  const navItems = [
    { id: "home", label: "Trang Chủ", icon: HomeIcon },
    { id: "supported", label: "Link Hỗ Trợ", icon: LayoutList },
    { id: "status", label: "Trạng Thái", icon: Activity },
  ];
  const externalLinks = [
    { label: "Vào Discord", url: "https://discord.gg/XEaC68tVnv", icon: Disc },
    { label: "Thêm Bot", url: "https://discord.com/oauth2/authorize?client_id=1257344221636067492&permissions=8&integration_type=0&scope=bot", icon: Bot },
  ];
  return (
    <div className="min-h-screen bg-animated-gradient flex flex-col relative overflow-hidden font-sans">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
      {/* Header */}
      <header className="w-full max-w-5xl mx-auto p-6 flex justify-between items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden font-sans transition-colors duration-300">
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 shadow-xl
          transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <img 
              src="https://i.ibb.co/gFFRwYW1/IMG-1613.jpg" 
              className="w-10 h-10 rounded-xl object-cover shadow-lg"
              alt="Hanh Lẻ Năm"
            />
            <h2 className="text-xl font-bold text-primary">Hanh Lẻ Năm</h2>
          </div>
          <nav className="space-y-6">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as Tab);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all
                    ${activeTab === item.id 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-accent hover:text-accent-foreground"}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
            <div className="pt-6 border-t border-border space-y-1">
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                  <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </aside>
      {/* Header Controls */}
      <div className="fixed top-5 left-5 z-40 lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-3 bg-primary text-primary-foreground rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <img 
            src="https://i.ibb.co/5hHPD2qz/IMG-1593.jpg" 
            alt="HARBLX Logo" 
            className="w-10 h-10 rounded-full border-2 border-border/50 shadow-lg object-cover"
          />
          <h1 className="text-2xl font-bold font-display tracking-tight bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">
            HARBLX
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ThemeToggle />
        </motion.div>
      </header>
          <Menu className="w-6 h-6" />
        </button>
      </div>
      <div className="fixed top-5 right-5 z-40">
        <ThemeToggle />
      </div>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 w-full max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="w-full glass-panel rounded-3xl p-6 sm:p-10 flex flex-col gap-8"
        >
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              HARBLX <span className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">BYPASS</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Hệ thống vượt link nhanh chóng, an toàn và hoàn toàn miễn phí. Dán link của bạn xuống dưới để bắt đầu.
            </p>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LinkIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                {...form.register("url")}
                className="custom-input pl-11"
                placeholder="Dán link cần vượt..."
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            
            <AnimatePresence>
              {form.formState.errors.url && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-destructive text-sm font-medium px-1 flex items-center gap-1.5"
                >
                  <AlertCircle className="w-4 h-4" />
                  {form.formState.errors.url.message}
                </motion.p>
              )}
            </AnimatePresence>
            <button
              type="submit"
              disabled={bypassMutation.isPending}
              className={`
                mt-2 w-full py-4 rounded-xl font-bold text-white text-sm sm:text-base tracking-wide
                bg-gradient-to-r from-pink-500 to-indigo-500
                shadow-lg shadow-pink-500/25
                hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5
                active:translate-y-0 active:shadow-md
                disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                transition-all duration-300 ease-out flex items-center justify-center gap-2
              `}
            >
              {bypassMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  ĐANG XỬ LÝ...
                </>
              ) : (
                "BẮT ĐẦU VƯỢT LINK"
              )}
            </button>
          </form>
          <AnimatePresence>
            {bypassMutation.isSuccess && bypassMutation.data && (
      <main className="flex-1 lg:ml-64 p-6 sm:p-10 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-2 bg-pink-500/10 border border-pink-500/20 rounded-2xl p-5 relative group"
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-semibold text-pink-500/80 uppercase tracking-wider mb-1">Kết quả</p>
                    <p className="text-pink-400 font-medium break-all selection:bg-pink-500/30">
                      {bypassMutation.data.result}
                    </p>
                  </div>
                <div className="text-center space-y-4">
                  <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
                    HARBLX BYPASS
                  </h1>
                  <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                    Hệ thống vượt link nhanh chóng, an toàn và hoàn toàn miễn phí. Dán link của bạn xuống dưới để bắt đầu.
                  </p>
                </div>
                
                <button 
                  onClick={handleCopy}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 hover:text-pink-300 transition-colors"
                  title="Copy result"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="relative">
                    ...
[truncated]
[truncated]
[truncated]
