"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Route, Droplets, Building2, MessageCircle, 
  ArrowRight, Phone, MapPin, Mail, Linkedin, 
  Twitter, ShieldCheck, Zap, Globe, Cpu, ChevronDown, 
  Lock, X, Send, Bot
} from 'lucide-react';

const HERO_SLIDES = [
  { img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "Engineering", highlight: "Works" },
  { img: "https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9hZHN8ZW58MHx8MHx8fDA%3D", title: "Infrastructure", highlight: "Future" },
  { img: "https://images.unsplash.com/photo-1727703435736-d3b5f2cc113c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHJhaW5hZ2V8ZW58MHx8MHx8fDA%3D", title: "Water", highlight: "Works" }
];

const STATS = [
  { label: "Projects Completed", value: "250+", icon: <ShieldCheck className="w-5 h-5 text-emerald-500" /> },
  { label: "Regional Impact", value: "East Africa", icon: <Globe className="w-5 h-5 text-blue-500" /> },
  { label: "Material Efficiency", value: "98.5%", icon: <Zap className="w-5 h-5 text-yellow-500" /> },
  { label: "AI Optimization", value: "Active", icon: <Cpu className="w-5 h-5 text-cyan-500" /> }
];

const PROJECTS = [
  { id: 'RD-101', type: 'ROADS', name: 'Al-Khwarmi Highway', status: '85%', detail: '4-Lane Expansion', img: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800' },
  { id: 'BL-402', type: 'BUILDINGS', name: 'Zuhunain HQ Tower', status: '30%', detail: 'Floor 12/40', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
  { id: 'WT-205', type: 'WATER', name: 'Sector 7 Mainline', status: '60%', detail: '65 PSI Stable', img: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=800' },
];

export default function ZuhunainHome() {
  const [filter, setFilter] = useState('ALL');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [activeAbout, setActiveAbout] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Welcome to Zuhunain International. I am your AI assistant. How can I help you today?' }
  ]);
  
  const router = useRouter();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAdminLogin = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Logic updated to use Environment Variable
  const secureKey = process.env.NEXT_PUBLIC_ZU_ADMIN_KEY;

  if (passcode === secureKey) {
    router.push('/admin');
  } else {
    // Keeping our specific error message for consistency
    alert('Access Denied: Invalid Administrative Credentials');
  }
};

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessages = [...messages, { role: 'user', text: chatInput }];
    setMessages(newMessages);
    setChatInput('');

    // Simulate basic AI logic
    setTimeout(() => {
      let botResponse = "I'm processing your request regarding our investment portfolio. Would you like to speak with a representative?";
      const lowerInput = chatInput.toLowerCase();
      
      if (lowerInput.includes('location') || lowerInput.includes('office')) {
        botResponse = "Our headquarters is located in Nairobi, Kenya, at P. O. Box 7190-00100.";
      } else if (lowerInput.includes('projects') || lowerInput.includes('portfolio')) {
        botResponse = "We currently manage over 250+ projects including the Al-Khwarmi Highway and Zuhunain HQ Tower.";
      } else if (lowerInput.includes('contact') || lowerInput.includes('phone')) {
        botResponse = "You can reach us via WhatsApp or at our Nairobi office support line.";
      }

      setMessages([...newMessages, { role: 'bot', text: botResponse }]);
    }, 1000);
  };

  const filteredProjects = filter === 'ALL' ? PROJECTS : PROJECTS.filter(p => p.type === filter);

  return (
    <div className="relative min-h-screen bg-[#fcfdfe] text-slate-900 font-sans overflow-x-hidden scroll-smooth">
      
      {/* 1. ADMIN LOGIN OVERLAY */}
      <AnimatePresence>
        {showLogin && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-12 max-w-md w-full shadow-2xl relative"
            >
              <button onClick={() => setShowLogin(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900"><X /></button>
              <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-[#1B5E3C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="text-[#1B5E3C]" size={32} />
                </div>
                <h2 className="text-2xl font-black tracking-tight">Admin Authentication</h2>
                <p className="text-slate-400 text-sm mt-2">Restricted to Zuhunain Personnel Only</p>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <input 
                  type="password" placeholder="Administrative Key" 
                  className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 ring-[#1B5E3C] outline-none transition-all"
                  value={passcode} onChange={(e) => setPasscode(e.target.value)}
                />
                <button type="submit" className="w-full py-5 bg-[#1B5E3C] text-white rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-[#A64D2E] transition-all">
                  Authorize Access
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. FLOATING AI CHATBOT */}
      <div className="fixed bottom-8 right-8 z-200 flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="mb-4 w-80 md:w-96 h-125 bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white flex flex-col overflow-hidden"
            >
              {/* Chat Header */}
              <div className="p-6 bg-[#1B5E3C] text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl"><Bot size={20} /></div>
                  <div>
                    <h4 className="text-sm font-bold">Zuhunain AI</h4>
                    <p className="text-[10px] opacity-70 uppercase tracking-widest">Nairobi Support</p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="hover:rotate-90 transition-transform"><X size={18} /></button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user' 
                      ? 'bg-[#A64D2E] text-white rounded-tr-none' 
                      : 'bg-slate-100 text-slate-700 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about our Nairobi HQ..." 
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 ring-[#1B5E3C]/20"
                />
                <button type="submit" className="p-3 bg-[#1B5E3C] text-white rounded-xl hover:bg-[#A64D2E] transition-all">
                  <Send size={16} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-[#1B5E3C] text-white p-5 rounded-full shadow-2xl shadow-green-200 flex items-center gap-3 border-4 border-white"
        >
          {isChatOpen ? <X /> : <MessageCircle />}
          <span className="text-xs font-bold uppercase tracking-widest pr-2">AI Assistant</span>
        </motion.button>
      </div>

      {/* 3. NAVIGATION */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-100">
        <div className="bg-white/40 backdrop-blur-2xl border border-white/50 px-8 py-4 flex justify-between items-center rounded-full shadow-sm">
          <div className="text-2xl font-black tracking-tighter text-[#A64D2E] italic">ZUHUNAIN</div>
          <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            {['Home', 'About', 'Services', 'Projects', 'Contacts'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#1B5E3C] transition-colors cursor-pointer">{item}</a>
            ))}
          </div>
          <button 
            onClick={() => setShowLogin(true)}
            className="bg-[#1B5E3C] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#A64D2E] transition-all uppercase"
          >
            Admin Access
          </button>
        </div>
      </nav>

      {/* 4. HERO */}
      <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0">
            <Image src={HERO_SLIDES[currentSlide].img} alt="Hero" fill className="object-cover brightness-95" priority />
            <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-[#fcfdfe]" />
          </motion.div>
        </AnimatePresence>
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.h1 key={`h1-${currentSlide}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] text-slate-900">
            {HERO_SLIDES[currentSlide].title}<br/>
            <span className="text-[#1B5E3C] font-extralight italic">{HERO_SLIDES[currentSlide].highlight}</span>
          </motion.h1>
          <div className="mt-16 flex flex-col items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-[#1B5E3C] hover:text-white transition-all flex items-center gap-3"
            >
              Explore Nairobi Projects <ArrowRight className="w-5 h-5" />
            </motion.button>
            <ChevronDown className="animate-bounce text-[#A64D2E] w-8 h-8 mt-4" />
          </div>
        </div>
      </section>

      {/* 5. STATS SECTION */}
      <section className="relative z-20 -mt-20 max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-xl p-8 rounded-4xl border border-white shadow-xl flex flex-col items-center text-center group hover:scale-105 transition-transform">
            <div className="mb-4 p-3 bg-slate-50 rounded-2xl group-hover:bg-cyan-50 transition-colors">{stat.icon}</div>
            <h4 className="text-3xl font-black text-slate-800">{stat.value}</h4>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-2">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* 6. ABOUT/SERVICES */}
      <section id="services" className="max-w-7xl mx-auto py-32 px-6">
        <div className="flex flex-col md:flex-row gap-20 items-center">
          <div className="w-full md:w-1/2 relative group">
             <motion.div 
               whileHover={{ scale: 1.02 }}
               className="aspect-square rounded-[4rem] overflow-hidden border-15 border-white shadow-2xl relative"
             >
                <Image src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070" alt="Construction Site" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#1B5E3C]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
             </motion.div>
          </div>
          <div className="w-full md:w-1/2" id="about">
             <h2 className="text-5xl font-black tracking-tighter mb-8 text-[#A64D2E]">Nairobi&apos;s Engineering Frontier</h2>
             <p className="text-lg text-slate-500 font-light leading-relaxed mb-10">
               Zuhunain International Investments Limited is a premier Nairobi-based firm specializing in high-tier infrastructure development and strategic investment across Kenya.
             </p>
             <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'road', title: "Road Infrastructure", icon: <Route />, color: "text-yellow-600", desc: "Developing Nairobi's connectivity through world-class road networking." },
                  { id: 'struct', title: "Structural Development", icon: <Building2 />, color: "text-[#A64D2E]", desc: "Iconic commercial real estate investment in the heart of the city." },
                  { id: 'water', title: "Water Engineering", icon: <Droplets />, color: "text-[#1B5E3C]", desc: "Sustainable hydraulic systems and mainline services for urban growth." }
                ].map((item) => (
                  <motion.div 
                    key={item.id}
                    onClick={() => setActiveAbout(activeAbout === item.id ? null : item.id)}
                    className="cursor-pointer"
                  >
                    <IconFeature 
                      title={item.title} 
                      icon={item.icon} 
                      color={item.color} 
                      active={activeAbout === item.id}
                    />
                    <AnimatePresence>
                      {activeAbout === item.id && (
                        <motion.p 
                          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest overflow-hidden"
                        >
                          {item.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 7. PROJECTS */}
      <section id="projects" className="bg-slate-50 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
             <h2 className="text-5xl font-black tracking-tighter">Regional Portfolio</h2>
             <div className="flex gap-2 p-1 bg-white rounded-full border border-slate-200">
                {['ALL', 'ROADS', 'BUILDINGS', 'WATER'].map((cat) => (
                  <button key={cat} onClick={() => setFilter(cat)} className={`px-8 py-3 rounded-full text-[10px] font-bold transition-all ${filter === cat ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-900'}`}>{cat}</button>
                ))}
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((p) => (
                <motion.div 
                  layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                  whileHover={{ y: -10 }}
                  key={p.id} className="bg-white rounded-[3rem] overflow-hidden border border-white shadow-xl relative group"
                >
                  <div className="h-64 relative overflow-hidden">
                    <Image src={p.img} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                       <span className="text-white text-[10px] font-black tracking-widest uppercase">View Technical specs</span>
                    </div>
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl font-black text-slate-800 mb-6">{p.name}</h3>
                    <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                      <span className="text-3xl font-black text-[#1B5E3C]">{p.status}</span>
                      <span className="text-xs italic font-medium text-slate-400">{p.id}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 8. CONTACT & MAP */}
      <section id="contacts" className="max-w-7xl mx-auto py-32 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          <div className="bg-white p-12 rounded-[3rem] border border-white shadow-xl">
            <h2 className="text-4xl font-black text-slate-800 mb-8 tracking-tighter">Nairobi HQ</h2>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-slate-50 rounded-2xl text-[#1B5E3C]"><MapPin size={24} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Headquarters</p>
                  <p className="text-slate-700 font-bold">P. O. Box 7190-00100 Nairobi, Kenya [cite: 3]</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="p-4 bg-slate-50 rounded-2xl text-[#1B5E3C]"><Phone size={24} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Phone Support</p>
                  <p className="text-slate-700 font-bold">+254 (0) 705 502142</p>
                </div>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              className="mt-12 w-full bg-[#25D366] text-white p-6 rounded-3xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-100"
            >
               <MessageCircle size={24} /> Connect via WhatsApp
            </motion.button>
          </div>
          <div className="bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl aspect-square md:aspect-auto group">
             <iframe 
                title="Zuhunain Nairobi HQ Map"
                className="w-full h-full grayscale opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.279401736181!2d36.8172!3d-1.2864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000"
                style={{ border: 0 }}
                allowFullScreen
             ></iframe>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-white pt-32 pb-12 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
             <h2 className="text-4xl font-black text-[#A64D2E] italic tracking-tighter mb-4">ZUHUNAIN</h2>
             <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8">International Investments Limited</p>
             <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.1 }} className="bg-slate-50 p-4 rounded-2xl cursor-pointer"><Linkedin size={20} /></motion.div>
                <motion.div whileHover={{ scale: 1.1 }} className="bg-slate-50 p-4 rounded-2xl cursor-pointer"><Twitter size={20} /></motion.div>
                <motion.div whileHover={{ scale: 1.1 }} className="bg-slate-50 p-4 rounded-2xl cursor-pointer"><Mail size={20} /></motion.div>
             </div>
          </div>
          <div>
             <h4 className="font-black uppercase text-xs tracking-widest mb-8 text-slate-800">Resources</h4>
             <ul className="space-y-4 text-sm text-slate-500 font-bold uppercase tracking-tighter">
                <li><a href="#about" className="hover:text-[#1B5E3C]">About Us</a></li>
                <li><a href="#projects" className="hover:text-[#1B5E3C]">Registry</a></li>
                <li><a href="#contacts" className="hover:text-[#1B5E3C]">Support</a></li>
             </ul>
          </div>
          <div>
             <h4 className="font-black uppercase text-xs tracking-widest mb-8 text-slate-800">Legal</h4>
             <ul className="space-y-4 text-sm text-slate-500 font-bold uppercase tracking-tighter">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Compliance</li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-50 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
          <p>© 2026 ZUHUNAIN INTERNATIONAL INVESTMENTS LIMITED™</p>
          <p>All Rights Reserved • Asterleigh Systems</p>
        </div>
      </footer>
    </div>
  );
}

interface IconFeatureProps {
  title: string;
  icon: React.ReactElement<{ size?: number; className?: string }>;
  color: string;
  active?: boolean;
}

function IconFeature({ title, icon, color, active }: IconFeatureProps) {
  return (
    <motion.div 
      whileHover={{ x: 10 }}
      className={`flex items-center gap-6 p-6 border transition-all rounded-4xl ${active ? 'bg-[#1B5E3C] border-[#1B5E3C]' : 'bg-white/50 border-white shadow-sm'}`}
    >
      <div className={`p-4 bg-white rounded-2xl shadow-inner ${color}`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <span className={`font-black uppercase text-xs tracking-widest ${active ? 'text-white' : 'text-slate-700'}`}>{title}</span>
    </motion.div>
  );
}