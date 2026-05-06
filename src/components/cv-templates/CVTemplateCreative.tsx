import { Profile, Experience, Education, Project, Skill } from '../../types';

interface TemplateProps {
  profile: Profile;
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
  skills: Skill[];
}

export default function CVTemplateCreative({ profile, experiences, educations, projects, skills }: TemplateProps) {
  return (
    <div className="bg-[#f8f9fa] text-slate-900 p-4 md:p-10 w-full md:w-[210mm] min-h-screen md:min-h-[297mm] mx-auto font-sans flex flex-col gap-4 md:gap-6 print:w-[210mm] print:h-[297mm] print:p-6" id="cv-creative">
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          #cv-creative {
            width: 210mm !important;
            height: auto !important;
            min-height: 297mm !important;
            overflow: visible !important;
            padding: 10mm !important;
            margin: 0 !important;
            background: #f8f9fa !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 10pt !important;
            box-sizing: border-box !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          header { padding: 15pt !important; border-radius: 15pt !important; background-color: #0f172a !important; color: white !important; margin-bottom: 5pt !important; display: flex !important; flex-direction: row !important; justify-content: space-between !important; align-items: center !important; }
          section { padding: 12pt !important; border-radius: 15pt !important; margin-bottom: 0 !important; background: white !important; }
          h1 { font-size: 18pt !important; }
          h2 { font-size: 10pt !important; margin-bottom: 8pt !important; }
          h3 { font-size: 11pt !important; }
          p, div, span { font-size: 8.5pt !important; line-height: 1.2 !important; }
          .flex.flex-col.lg\\:grid { display: grid !important; grid-template-columns: repeat(12, 1fr) !important; gap: 10pt !important; }
          .lg\\:col-span-8 { grid-column: span 8 !important; }
          .lg\\:col-span-4 { grid-column: span 4 !important; }
          .lg\\:col-span-12 { grid-column: span 12 !important; }
          .space-y-8 > * + * { margin-top: 8pt !important; }
          .space-y-6 > * + * { margin-top: 5pt !important; }
          .w-24 { width: 1.2in !important; height: 1.2in !important; }
          .rounded-\\[40px\\] { border-radius: 12pt !important; }
          .grid { display: grid !important; gap: 10pt !important; }
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr) !important; }
          .lg\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
      {/* Header Bento Box */}
      <header className="bg-slate-900 text-white p-10 rounded-[40px] flex flex-col md:flex-row justify-between items-center relative overflow-hidden gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="flex items-center gap-8 relative z-10 w-full md:w-auto">
          {profile.profileImageUrl && (
            <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-primary/20 rotate-3">
              <img src={profile.profileImageUrl} alt={profile.fullName} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">{profile.fullName}</h1>
            <p className="text-primary font-bold text-sm tracking-[0.3em] uppercase">{profile.title}</p>
          </div>
        </div>
        <div className="text-center md:text-right text-[11px] font-bold text-slate-400 space-y-1 relative z-10 w-full md:w-auto">
          <p>{profile.email}</p>
          <p>{profile.phone}</p>
          <p>{profile.location}</p>
        </div>
      </header>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
        {/* Experience Bento */}
        <section className="col-span-1 lg:col-span-8 bg-white p-6 md:p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <h2 className="text-lg font-black uppercase tracking-tight mb-8 flex items-center gap-2">
             DENEYİM
            <span className="h-0.5 flex-1 bg-slate-50" />
          </h2>
          <div className="space-y-8">
            {experiences.map(exp => (
              <div key={exp.id} className="group">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">{exp.position}</h3>
                  <span className="text-[10px] w-fit bg-slate-50 px-3 py-1 rounded-full font-bold text-slate-500 uppercase">{exp.startDate} — {exp.endDate || 'Günümüz'}</span>
                </div>
                <p className="text-xs font-bold text-primary italic mb-3 uppercase tracking-wider">{exp.company}</p>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sidebar Bento Column */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          {/* Skills Bento */}
          <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Yetenekler</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <div key={s.id} className="text-[10px] font-bold bg-slate-50 px-3 py-2 rounded-2xl border border-slate-100">
                  {s.name}
                </div>
              ))}
            </div>
          </section>

          {/* Education Bento */}
          <section className="bg-primary text-white p-8 rounded-[40px] shadow-lg shadow-primary/20">
            <h2 className="text-xs font-black uppercase tracking-widest opacity-60 mb-6">Eğitim</h2>
            <div className="space-y-6">
              {educations.map(edu => (
                <div key={edu.id}>
                  <h3 className="text-sm font-black tracking-tight">{edu.degree}</h3>
                  <p className="text-[10px] font-bold opacity-80 uppercase mt-1">{edu.school}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Projects Bento - Wide Bottom */}
        <section className="col-span-1 lg:col-span-12 bg-white p-6 md:p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <h2 className="text-lg font-black uppercase tracking-tight mb-8">PROJELER</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(proj => (
              <div key={proj.id} className="p-6 bg-slate-50 rounded-3xl group hover:bg-slate-900 hover:text-white transition-all cursor-default">
                <h3 className="font-black text-sm mb-2 uppercase tracking-tight">{proj.title}</h3>
                <div className="flex gap-2 mb-3">
                  {proj.technologies?.map(t => (
                    <span key={t} className="text-[8px] font-black uppercase opacity-40">#{t}</span>
                  ))}
                </div>
                <p className="text-[11px] opacity-60 group-hover:opacity-80 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
