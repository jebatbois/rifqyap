// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Lock, Mail, Key, LogOut, MessageSquare, LayoutDashboard, 
  Briefcase, Code, Award, Loader2 
} from "lucide-react";

export default function AdminPage() {
  // --- Auth States ---
  const [session, setSession] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // --- Dashboard States ---
  const [activeTab, setActiveTab] = useState("messages");

  // Cek sesi login saat halaman dimuat
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingAuth(false);
    });

    // Dengarkan perubahan status login (jika login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fungsi Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
    }
    setIsLoggingIn(false);
  };

  // Fungsi Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // 1. TAMPILAN LOADING
  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-primary-blue flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-accent-orange animate-spin" />
      </div>
    );
  }

  // 2. TAMPILAN FORM LOGIN (Jika belum ada sesi)
  if (!session) {
    return (
      <div className="min-h-screen bg-primary-blue flex flex-col items-center justify-center p-6 relative">
        <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        
        <div className="w-full max-w-md bg-primary-light p-8 rounded-3xl border border-slate-700 shadow-[0_0_40px_rgba(249,115,22,0.1)] relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-accent-orange/10 rounded-2xl flex items-center justify-center text-accent-orange mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Access</h1>
            <p className="text-sm text-slate-400 mt-1">Authorized personnel only.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-medium text-center">
                {authError}
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-300">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-primary-blue rounded-xl border border-slate-700 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none text-white transition-all"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-300">Password</label>
              <div className="relative">
                <Key className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-primary-blue rounded-xl border border-slate-700 focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none text-white transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full py-3.5 bg-accent-orange hover:bg-accent-hover text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-accent-orange/30 disabled:opacity-50 flex justify-center items-center gap-2 mt-2"
            >
              {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : "Secure Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. TAMPILAN DASHBOARD ADMIN (Jika sudah login)
  const menuItems = [
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "projects", label: "Projects", icon: LayoutDashboard },
    { id: "skills", label: "Skills", icon: Code },
    { id: "experiences", label: "Experiences", icon: Briefcase },
    { id: "certificates", label: "Certificates", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-primary-blue text-slate-200 flex pt-24 pb-12 px-6">
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div className="bg-primary-light p-6 rounded-2xl border border-slate-700 space-y-4">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Admin Menu</h2>
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                      ${isActive 
                        ? "bg-accent-orange text-white shadow-lg shadow-accent-orange/20" 
                        : "text-slate-400 hover:bg-primary-blue hover:text-white"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-slate-700 mt-4">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-medium text-sm"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 bg-primary-light p-8 rounded-2xl border border-slate-700 relative overflow-hidden min-h-[500px]">
           <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
             <LayoutDashboard className="w-64 h-64" />
           </div>
           
           <div className="relative z-10">
             <h2 className="text-2xl font-bold text-white capitalize mb-6 flex items-center gap-2">
                {activeTab} Management
             </h2>
             
             {/* TEMPAT UNTUK KONTEN TAB NANTINYA */}
             <div className="p-8 border-2 border-dashed border-slate-700 rounded-xl text-center flex flex-col items-center justify-center text-slate-500">
                <Loader2 className="w-10 h-10 mb-4 text-slate-600 animate-spin" />
                <p>Modul <strong className="text-slate-400 capitalize">{activeTab}</strong> sedang disiapkan...</p>
             </div>
           </div>
        </main>

      </div>
    </div>
  );
}