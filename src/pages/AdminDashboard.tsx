import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { User, Briefcase, GraduationCap, FolderCode, Cpu, LayoutDashboard, LogOut } from 'lucide-react';
import { auth } from '../lib/firebase';
import ProfileEditor from '../components/admin/ProfileEditor';
import ExperienceManager from '../components/admin/ExperienceManager';
import EducationManager from '../components/admin/EducationManager';
import ProjectManager from '../components/admin/ProjectManager';
import SkillManager from '../components/admin/SkillManager';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminDashboard() {
  const location = useLocation();
  const currentTab = location.pathname.split('/').pop() || 'profile';

  const menuItems = [
    { id: 'profile', label: 'Profil', icon: User, path: '/admin' },
    { id: 'experience', label: 'Deneyim', icon: Briefcase, path: '/admin/experience' },
    { id: 'education', label: 'Eğitim', icon: GraduationCap, path: '/admin/education' },
    { id: 'projects', label: 'Projeler', icon: FolderCode, path: '/admin/projects' },
    { id: 'skills', label: 'Yetenekler', icon: Cpu, path: '/admin/skills' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Navigation Rail */}
      <nav className="w-20 bg-sidebar flex flex-col items-center py-8 space-y-8 shrink-0 no-print">
        <Link to="/" className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl transition-transform hover:scale-110">CV</Link>
        
        <div className="flex flex-col space-y-6">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id || (item.id === 'profile' && currentTab === 'admin');
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`p-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-white/10 text-primary shadow-lg' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
                title={item.label}
              >
                <item.icon className="w-6 h-6" />
              </Link>
            );
          })}
        </div>

        <div className="mt-auto flex flex-col items-center gap-6">
          <Link
            to="/"
            className="p-3 text-slate-400 hover:text-primary transition-all"
            title="SİTEYİ GÖR"
          >
            <LayoutDashboard className="w-6 h-6" />
          </Link>
          <button
            onClick={() => auth.signOut()}
            className="p-3 text-slate-400 hover:text-red-400 transition-all"
            title="Çıkış Yap"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Nav Top Bar */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between z-40 no-print">
          <span className="font-bold text-slate-800">ProCV Admin</span>
          <button onClick={() => auth.signOut()} className="p-2 text-red-500"><LogOut className="w-6 h-6" /></button>
        </div>

        {/* Header (Optional, or within sub-pages) */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-6 lg:p-12">
          <div className="max-w-4xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <Routes>
                  <Route path="/" element={<ProfileEditor />} />
                  <Route path="/experience" element={<ExperienceManager />} />
                  <Route path="/education" element={<EducationManager />} />
                  <Route path="/projects" element={<ProjectManager />} />
                  <Route path="/skills" element={<SkillManager />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
