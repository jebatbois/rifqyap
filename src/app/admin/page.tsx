// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Lock, Mail, Key, LogOut, MessageSquare, LayoutDashboard, 
  Briefcase, Code, Award, Loader2, Eye, EyeOff, Trash2, CheckCircle, Circle
} from "lucide-react";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  // Cek sesi login saat halaman dimuat
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingAuth(false);
      
      // Jika sudah login, fetch messages
      if (session) {
        fetchMessages();
      }
    });

    // Dengarkan perubahan status login (jika login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      // Jika login, fetch messages
      if (session) {
        fetchMessages();
      } else {
        setMessages([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch messages when activeTab changes to 'messages'
  useEffect(() => {
    if (activeTab === "messages" && session) {
      fetchMessages();
    }
  }, [activeTab, session]);

  // Function to fetch messages from Supabase
  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMessages(data || []);
    } catch (error: any) {
      console.error("Error fetching messages:", error.message);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Function to mark message as read
  const markAsRead = async (id: number) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, is_read: true } : msg
      ));
    } catch (error: any) {
      console.error("Error marking message as read:", error.message);
    }
  };

  // Function to delete message
  const deleteMessage = async (id: number) => {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setMessages(messages.filter(msg => msg.id !== id));
    } catch (error: any) {
      console.error("Error deleting message:", error.message);
    }
  };

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
    } else {
      // After successful login, fetch messages
      fetchMessages();
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
             
             {/* Messages Tab Content */}
             {activeTab === "messages" && (
               <div className="overflow-x-auto">
                 {loadingMessages ? (
                   <div className="flex flex-col items-center justify-center py-12">
                     <Loader2 className="w-10 h-10 mb-4 text-accent-orange animate-spin" />
                     <p className="text-slate-400">Loading messages...</p>
                   </div>
                 ) : (
                   <table className="min-w-full divide-y divide-slate-700">
                     <thead>
                       <tr>
                         <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                         <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                         <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</th>
                         <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Message</th>
                         <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                         <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-700">
                       {messages.length > 0 ? (
                         messages.map((msg) => (
                           <tr key={msg.id} className={msg.is_read ? "" : "bg-slate-800/30"}>
                             <td className="px-4 py-4 whitespace-nowrap">
                               <div className="flex items-center">
                                 {!msg.is_read ? (
                                   <div className="flex items-center">
                                     <div className="w-3 h-3 bg-accent-orange rounded-full mr-2 animate-pulse"></div>
                                     <span className="text-accent-orange text-sm font-medium">Unread</span>
                                   </div>
                                 ) : (
                                   <div className="flex items-center">
                                     <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                     <span className="text-green-500 text-sm font-medium">Read</span>
                                   </div>
                                 )}
                               </div>
                             </td>
                             <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">{msg.name}</td>
                             <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-300">{msg.email}</td>
                             <td className="px-4 py-4 text-sm text-slate-300 max-w-xs truncate">{msg.message}</td>
                             <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-400">
                               {new Date(msg.created_at).toLocaleDateString()}
                             </td>
                             <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                               <div className="flex items-center space-x-2">
                                 {!msg.is_read && (
                                   <button
                                     onClick={() => markAsRead(msg.id)}
                                     className="text-accent-orange hover:text-accent-hover transition-colors"
                                     title="Mark as read"
                                   >
                                     <Eye className="w-5 h-5" />
                                   </button>
                                 )}
                                 <button
                                   onClick={() => deleteMessage(msg.id)}
                                   className="text-red-400 hover:text-red-300 transition-colors"
                                   title="Delete message"
                                 >
                                   <Trash2 className="w-5 h-5" />
                                 </button>
                               </div>
                             </td>
                           </tr>
                         ))
                       ) : (
                         <tr>
                           <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                             No messages found
                           </td>
                         </tr>
                       )}
                     </tbody>
                   </table>
                 )}
               </div>
             )}
             
             {/* Placeholder for other tabs */}
             {activeTab !== "messages" && (
               <div className="p-8 border-2 border-dashed border-slate-700 rounded-xl text-center flex flex-col items-center justify-center text-slate-500">
                 <Loader2 className="w-10 h-10 mb-4 text-slate-600 animate-spin" />
                 <p>Modul <strong className="text-slate-400 capitalize">{activeTab}</strong> sedang disiapkan...</p>
               </div>
             )}
           </div>
        </main>

      </div>
    </div>
  );
}
