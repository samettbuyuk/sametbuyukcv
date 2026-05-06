import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Download, Globe, LayoutDashboard, Sun, Moon, MessageSquare } from 'lucide-react';
import { useCVData } from '../hooks/useCVData';
import { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Link } from 'react-router-dom';
import CVTemplateProfessional from '../components/cv-templates/CVTemplateProfessional';
import CVTemplateModern from '../components/cv-templates/CVTemplateModern';

export default function PublicCV() {
  const { profile, experiences, educations, projects, skills, loading } = useCVData();
  const [viewMode, setViewMode] = useState<'bento' | 'professional' | 'modern'>('bento');
  const [isDark, setIsDark] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${profile?.fullName || 'CV'} - Resume`,
  });

  const [showViewSelector, setShowViewSelector] = useState(false);

  const viewLabels = {
    bento: 'BENTO GÖRÜNÜM',
    professional: 'PROFESYONEL',
    modern: 'MODERN'
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.selector-container')) {
        setShowViewSelector(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-6">
          <LayoutDashboard className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">CV Henüz Hazır Değil</h1>
        <p className="text-slate-500 max-w-md mb-8">
          Bu portfolyo şu anda yayında değil. Eğer yöneticiyseniz, lütfen panelden bilgilerinizi doldurun.
        </p>
        <Link 
          to="/login" 
          className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95"
        >
          YÖNETİCİ PANELİNE GİT
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} selection:bg-primary/20 p-4 md:p-8 lg:p-12 pb-24 md:pb-12`}>
      {/* Fixed Nav Controls */}
      <nav className="fixed top-4 right-4 md:top-6 md:right-6 z-[100] flex items-center gap-2 md:gap-3 no-print">
        <div className="relative selector-container">
          <button 
            id="view-selector-btn"
            onClick={() => setShowViewSelector(!showViewSelector)}
            className={`flex items-center gap-2 px-3 py-2.5 md:px-5 md:py-3 rounded-2xl border shadow-xl font-bold text-[10px] md:text-xs transition-all ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-700'} active:scale-95`}
          >
            <LayoutDashboard className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="hidden sm:inline uppercase truncate max-w-[100px]">{viewLabels[viewMode]}</span>
          </button>

          <AnimatePresence>
            {showViewSelector && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className={`absolute top-full mt-3 right-0 w-64 p-2 rounded-2xl border shadow-2xl z-[101] ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}
              >
                {(Object.keys(viewLabels) as Array<keyof typeof viewLabels>).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => { setViewMode(mode); setShowViewSelector(false); }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-[10px] md:text-xs font-bold transition-all flex items-center justify-between group ${viewMode === mode ? 'bg-primary text-white' : isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'}`}
                  >
                    <span>{viewLabels[mode]}</span>
                    {viewMode === mode && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <button 
          onClick={() => setIsDark(!isDark)}
          className={`border p-2.5 md:p-3 rounded-2xl shadow-xl transition-all active:scale-90 ${isDark ? 'bg-slate-900 border-slate-700 text-yellow-400' : 'bg-white border-slate-200 text-slate-600'}`}
          title={isDark ? 'Gündüz Modu' : 'Gece Modu'}
        >
          {isDark ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
        </button>

        <button 
          onClick={() => handlePrint()} 
          className={`border p-2.5 md:p-3 rounded-2xl shadow-xl transition-all active:scale-90 ${isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-600'}`}
          title="PDF Olarak Kaydet"
        >
          <Download className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto overflow-hidden md:overflow-visible">
        <AnimatePresence mode="wait">
          {viewMode === 'bento' ? (
            <motion.div 
              key="bento"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-max"
            >
              
              {/* Hero Section - Main Identity */}
              <section className={`col-span-1 md:col-span-8 bento-card p-10 flex flex-col justify-center relative overflow-hidden group ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-colors group-hover:bg-primary/10" />
                <div className="relative">
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`inline-block px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6 ${isDark ? 'bg-slate-800 text-primary' : 'bg-indigo-50 text-primary'}`}
                  >
                    Kullanıcı Deneyimi Odaklı Portfolyo
                  </motion.span>
                  <h1 className={`text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Merhaba, Ben <br/>
                    <span className="text-primary italic serif">{profile.fullName || 'İsim Soyisim'}</span>
                  </h1>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    <p className={`text-xl md:text-2xl font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {profile.title || 'Rolünüzü buraya girin'}
                    </p>
                    {profile.phone && (
                      <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl border ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-400'}`}>
                        <Phone className="w-4 h-4" />
                        <span className="text-sm font-bold">{profile.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Profile Image & Contact Quick Links */}
              <section className="col-span-1 md:col-span-4 grid grid-rows-2 gap-6">
                <div className={`bento-card overflow-hidden h-full min-h-[240px] ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  {profile.profileImageUrl ? (
                    <img src={profile.profileImageUrl} alt={profile.fullName} className="w-full h-full object-cover transition-all duration-700 hover:scale-110" />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-slate-800 text-slate-600' : 'bg-slate-100 text-slate-300'}`}>
                      <div className="w-20 h-20 bg-current rounded-full opacity-20" />
                    </div>
                  )}
                </div>
                <div className={`bento-card p-6 flex flex-col justify-center space-y-4 ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.href = `mailto:${profile.email}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDark ? 'bg-slate-800 text-slate-400 group-hover:text-primary' : 'bg-slate-50 text-slate-400 group-hover:text-primary group-hover:bg-indigo-50'}`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">E-POSTA</p>
                      <p className={`text-sm font-bold truncate max-w-[180px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{profile.email || 'email@example.com'}</p>
                    </div>
                  </div>
                  {profile.phone && (
                    <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.href = `tel:${profile.phone}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDark ? 'bg-slate-800 text-slate-400 group-hover:text-primary' : 'bg-slate-50 text-slate-400 group-hover:text-primary group-hover:bg-indigo-50'}`}>
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">TELEFON</p>
                        <p className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{profile.phone}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDark ? 'bg-slate-800 text-slate-400 group-hover:text-primary' : 'bg-slate-50 text-slate-400 group-hover:text-primary group-hover:bg-indigo-50'}`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">KONUM</p>
                      <p className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{profile.location || 'Şehir, Ülke'}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Experience Grid - Spans Wide */}
              <section className={`col-span-1 md:col-span-12 lg:col-span-8 bento-card p-10 overflow-hidden relative ${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-900 text-white'}`}>
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_50%)]" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">İş Deneyimi</h2>
                    <div className="w-12 h-0.5 bg-primary/30" />
                  </div>
                  <div className="space-y-12">
                    {experiences.map((exp, idx) => (
                      <motion.div 
                        key={exp.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="relative pl-10 before:absolute before:left-0 before:top-2 before:w-1 before:h-full before:bg-white/10 before:rounded-full"
                      >
                        <div className="absolute left-[-4px] top-2 w-3 h-3 rounded-full bg-primary ring-4 ring-slate-900" />
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white tracking-tight">{exp.position}</h3>
                            <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mt-1">{exp.company}</p>
                          </div>
                          <span className="text-[10px] font-black uppercase text-slate-500 bg-white/5 px-3 py-1.5 rounded-lg h-fit mt-4 md:mt-0">
                            {exp.startDate} — {exp.endDate || 'Devam Ediyor'}
                          </span>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-base">
                          {exp.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Education & About - Vertical Stack */}
              <section className="col-span-1 md:col-span-12 lg:col-span-4 grid grid-cols-1 gap-6">
                <div className={`bento-card p-8 flex flex-col h-full ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h2 className={`text-xl font-bold tracking-tight mb-8 ${isDark ? 'text-white' : 'text-slate-800'}`}>Eğitim</h2>
                  <div className="space-y-6 flex-1">
                    {educations.map((edu) => (
                      <div key={edu.id} className="relative group">
                        <h3 className={`font-bold leading-tight group-hover:text-primary transition-colors ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{edu.school}</h3>
                        <p className="text-xs font-bold text-indigo-400 mt-1 uppercase tracking-widest">{edu.degree}</p>
                        <p className={`text-xs font-medium mt-2 italic ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{edu.startDate} - {edu.endDate}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bento-card p-8 bg-primary text-white flex flex-col justify-center overflow-hidden relative min-h-[200px]">
                  <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="relative">
                    <p className="text-lg font-medium leading-relaxed italic opacity-90">
                      "{profile.summary || 'Kişisel özetiniz buraya gelecek.'}"
                    </p>
                  </div>
                </div>
              </section>

              {/* Skills Grid - Mosaic style */}
              <section className={`col-span-1 md:col-span-12 bento-card p-10 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                  <div>
                    <h2 className={`text-3xl font-bold tracking-tight mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>Yetenekler</h2>
                    <div className="flex items-center gap-4">
                      <p className="text-slate-400 text-sm font-medium">Teknik araç setim ve uzmanlıklarım.</p>
                      <button 
                        onClick={() => setShowContactOptions(!showContactOptions)}
                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                        title="İletişime Geç"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => {
                      const levelLabel = skill.level <= 33 ? 'Temel' : skill.level <= 66 ? 'Orta' : 'İleri';
                      return (
                        <span key={skill.id} className={`px-5 py-2.5 border rounded-2xl text-xs font-bold cursor-default transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-primary hover:text-white hover:border-primary' : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-primary hover:text-white hover:border-primary'}`}>
                          {skill.name} • {levelLabel}
                        </span>
                      );
                    })}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {skills.slice(0, 12).map((skill, idx) => {
                    const levelLabel = skill.level <= 33 ? 'Temel' : skill.level <= 66 ? 'Orta' : 'İleri';
                    return (
                      <div key={skill.id} className={`p-6 rounded-3xl flex flex-col items-center justify-center text-center group transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-50 hover:bg-indigo-50'}`}>
                        <div className={`text-2xl font-black transition-colors mb-2 ${isDark ? 'text-slate-700 group-hover:text-primary' : 'text-slate-200 group-hover:text-primary'}`}>
                          0{idx + 1}
                        </div>
                        <p className={`font-bold tracking-tighter text-sm uppercase ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                          {skill.name}
                        </p>
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {levelLabel}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Projects - Horizontal Slider-like Grid */}
              <section className="col-span-1 md:col-span-12">
                <div className="flex items-center gap-4 mb-8 pl-2">
                  <h2 className={`text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Projeler</h2>
                  <div className={`flex-1 h-px ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((proj, idx) => (
                    <motion.div 
                      key={proj.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className={`bento-card group flex flex-col overflow-hidden h-full ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
                    >
                      <div className={`aspect-[4/3] overflow-hidden relative ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                        {proj.imageUrl ? (
                          <img 
                            src={proj.imageUrl} 
                            alt={proj.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300" />
                        )}
                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                          {proj.link && (
                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform shadow-xl">
                              <Globe className="w-6 h-6" />
                            </a>
                          )}
                          {proj.githubLink && (
                            <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform shadow-xl">
                              <Github className="w-6 h-6" />
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="p-8 flex-1 flex flex-col">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {proj.technologies?.slice(0, 3).map(tech => (
                            <span key={tech} className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ${isDark ? 'text-primary bg-primary/10' : 'text-primary bg-indigo-50'}`}>
                              {tech}
                            </span>
                          ))}
                        </div>
                        <h3 className={`text-xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>{proj.title}</h3>
                        <p className={`text-sm leading-relaxed line-clamp-3 mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {proj.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Final Call to Action / Socials */}
              <footer className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`col-span-1 md:col-span-2 bento-card p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="text-center md:text-left">
                    <h2 className={`text-3xl font-bold tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Hadi birlikte çalışalım!</h2>
                    <p className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Bana her zaman e-posta veya sosyal medya üzerinden ulaşabilirsiniz.</p>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => setShowContactOptions(!showContactOptions)}
                      className="px-10 py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 flex items-center gap-2"
                    >
                      <MessageSquare className="w-5 h-5" />
                      İLETİŞİME GEÇ
                    </button>

                    {showContactOptions && (
                      <div className={`absolute bottom-full mb-4 right-0 md:left-0 w-64 p-2 border rounded-2xl shadow-2xl z-20 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                        <a href={`mailto:${profile.email}`} className={`flex items-center gap-3 p-4 rounded-xl transition-all ${isDark ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-slate-50 text-slate-700'}`}>
                          <Mail className="w-5 h-5 text-primary" />
                          <div className="text-left">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">E-Posta</p>
                            <p className="text-sm font-bold truncate">{profile.email}</p>
                          </div>
                        </a>
                        {profile.phone && (
                          <a href={`tel:${profile.phone}`} className={`flex items-center gap-3 p-4 rounded-xl transition-all ${isDark ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-slate-50 text-slate-700'}`}>
                            <Phone className="w-5 h-5 text-primary" />
                            <div className="text-left">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Telefon</p>
                              <p className="text-sm font-bold">{profile.phone}</p>
                            </div>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className={`bento-card p-6 flex items-center justify-center gap-6 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <a href={profile.links?.linkedin} target="_blank" rel="noopener noreferrer" className={`p-4 rounded-2xl transition-all h-full flex items-center justify-center flex-1 ${isDark ? 'bg-slate-800 text-slate-400 hover:text-primary' : 'bg-slate-50 text-slate-400 hover:text-primary hover:bg-indigo-50'}`}>
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href={profile.links?.github} target="_blank" rel="noopener noreferrer" className={`p-4 rounded-2xl transition-all h-full flex items-center justify-center flex-1 ${isDark ? 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700' : 'bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}>
                    <Github className="w-6 h-6" />
                  </a>
                </div>
              </footer>
            </motion.div>
          ) : viewMode === 'professional' ? (
            <motion.div
              key="professional"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="bg-white text-slate-900 shadow-2xl rounded-3xl md:overflow-visible min-h-[1000px] max-w-5xl mx-auto"
            >
              <CVTemplateProfessional profile={profile} experiences={experiences} educations={educations} projects={projects} skills={skills} />
            </motion.div>
          ) : (
            <motion.div
              key="modern"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="bg-white text-slate-900 shadow-2xl rounded-3xl md:overflow-visible min-h-[1000px] max-w-5xl mx-auto"
            >
              <CVTemplateModern profile={profile} experiences={experiences} educations={educations} projects={projects} skills={skills} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Print Overlay - Hidden but reachable by printing libraries */}
      <div 
        className="print-only-container"
        style={{ 
          position: 'fixed', 
          opacity: 0, 
          pointerEvents: 'none', 
          left: '-10000px', 
          top: 0, 
          width: '210mm', 
          height: 'auto', 
          minHeight: '297mm',
          overflow: 'visible',
          zIndex: -1
        }}
      >
        <div ref={printRef} className="bg-white" style={{ width: '210mm', minHeight: '297mm', height: 'auto', margin: 0, padding: 0 }}>
          <style>{`
            @media print {
              @page {
                size: A4;
                margin: 0;
              }
              body {
                margin: 0 !important;
                padding: 0 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .print-container-wrapper {
                width: 210mm !important;
                height: auto !important;
                min-height: 297mm !important;
                overflow: visible !important;
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
              }
            }
          `}</style>
          <div className="print-container-wrapper">
            {viewMode === 'modern' ? (
              <CVTemplateModern profile={profile} experiences={experiences} educations={educations} projects={projects} skills={skills} />
            ) : (
              <CVTemplateProfessional profile={profile} experiences={experiences} educations={educations} projects={projects} skills={skills} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
