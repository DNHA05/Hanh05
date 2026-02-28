import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
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
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = (data: BypassRequest) => {
    setCopied(false);
    bypassMutation.mutate(data, {
      onError: (error) => {
        toast({
          title: "Lỗi",
          description: error.message || "Đã xảy ra lỗi trong quá trình xử lý.",
          variant: "destructive",
        });
      },
    });
  };

  const handleCopy = () => {
    if (bypassMutation.data?.result) {
      navigator.clipboard.writeText(bypassMutation.data.result);
      setCopied(true);
      toast({
        title: "Thành công",
        description: "Đã sao chép link vào clipboard!",
      });
      setTimeout(() => setCopied(false), 2000);
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
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="fixed top-5 right-5 z-40">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 sm:p-10 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center space-y-4">
                  <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
                    HARBLX BYPASS
                  </h1>
                  <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                    Hệ thống vượt link nhanh chóng, an toàn và hoàn toàn miễn phí. Dán link của bạn xuống dưới để bắt đầu.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-sm">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <LinkIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <input
                        {...form.register("url")}
                        className={`
                          w-full py-4 pl-12 pr-4 bg-background border-2 border-border rounded-2xl
                          focus:border-primary focus:ring-0 outline-none transition-all text-foreground
                          placeholder:text-muted-foreground/50
                        `}
                        placeholder="Dán link cần vượt..."
                        autoComplete="off"
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
                        w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold 
                        hover:bg-primary/90 active:scale-[0.98] transition-all
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center justify-center gap-2 shadow-lg shadow-primary/20
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
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 bg-accent/50 border border-border rounded-2xl p-5 relative group"
                      >
                        <div className="flex items-start gap-3 pr-10">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <div className="flex-1 overflow-hidden">
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 opacity-70">Kết quả</p>
                            <p className="text-foreground font-medium break-all text-sm sm:text-base">
                              {bypassMutation.data.result}
                            </p>
                          </div>
                        </div>
                        
                        <button 
                          onClick={handleCopy}
                          className="absolute top-4 right-4 p-2.5 rounded-xl bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-md"
                          title="Copy result"
                        >
                          {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {activeTab === "supported" && (
              <motion.div
                key="supported"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full space-y-6"
              >
                <h2 className="text-3xl font-bold text-primary">Các Link Được Hỗ Trợ</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Linkvertise", "Lootlabs", "Work.ink", "Shrtfly", 
                    "Hydrogen", "Codex", "Pastebin", "And many more..."
                  ].map((link) => (
                    <div key={link} className="bg-card border border-border p-4 rounded-xl font-semibold flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {link}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "status" && (
              <motion.div
                key="status"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full space-y-6"
              >
                <h2 className="text-3xl font-bold text-primary">Trạng Thái Hệ Thống</h2>
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="font-bold text-emerald-600 dark:text-emerald-400">
                    Hệ thống đang hoạt động bình thường
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <footer className="pt-10 text-center space-y-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground font-medium opacity-60">
              © 2026 • harblx.online
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                👁 LƯỢT TRUY CẬP:
              </span>
              <span className="text-sm font-black text-primary">
                {stats?.views ?? "..."}
              </span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
