import { Profile, Experience, Education, Project, Skill } from '../../types';

interface TemplateProps {
  profile: Profile;
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
  skills: Skill[];
}

export default function CVTemplateModern({ profile, experiences, educations, projects, skills }: TemplateProps) {
  return (
    <div className="flex flex-col md:flex-row w-full md:w-[210mm] min-h-screen md:min-h-[297mm] mx-auto overflow-hidden shadow-2xl font-sans print:w-[210mm] print:h-[297mm] print:shadow-none" id="cv-modern">
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          #cv-modern {
            width: 210mm !important;
            height: auto !important;
            min-height: 297mm !important;
            display: flex !important;
            flex-direction: row !important;
            background: white !important;
            overflow: visible !important;
            margin: 0 !important;
            box-sizing: border-box !important;
          }
          aside { 
            width: 28% !important; 
            padding: 5pt !important; 
            background-color: #111827 !important; 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact;
            display: block !important;
            min-height: 297mm !important;
            height: auto !important;
          }
          main { 
            width: 72% !important; 
            padding: 8pt !important; 
            background: white !important; 
            display: block !important;
            min-height: 297mm !important;
            height: auto !important;
          }
          h1 { font-size: 11pt !important; margin-bottom: 1pt !important; }
          h2 { font-size: 6.5pt !important; margin-bottom: 2pt !important; padding-bottom: 1pt !important; }
          h3 { font-size: 7pt !important; }
          p, span, div { font-size: 6pt !important; line-height: 1.0 !important; color: inherit !important; }
          .w-32 { width: 0.7in !important; height: 0.7in !important; }
          .space-y-10 > * + * { margin-top: 3pt !important; }
          .space-y-8 > * + * { margin-top: 2pt !important; }
          .space-y-6 > * + * { margin-top: 2pt !important; }
          .mb-6 { margin-bottom: 2pt !important; }
          .pl-6 { padding-left: 3pt !important; }
        }
      `}</style>
      {/* Sidebar */}
      <aside className="w-full md:w-1/3 bg-gray-900 text-white p-8 space-y-10">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-gray-800 mb-6 bg-gray-800 flex items-center justify-center">
            {profile.profileImageUrl ? (
              <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-16 h-16 bg-gray-700 rounded-2xl" />
            )}
          </div>
          <h1 className="text-xl font-bold text-center tracking-tight leading-tight mb-1">{profile.fullName}</h1>
          <p className="text-gray-400 text-xs font-medium uppercase tracking-[0.2em]">{profile.title}</p>
        </div>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#FF6B35] mb-4 border-b border-gray-800 pb-2">İletişim</h2>
          <div className="space-y-3 text-xs opacity-90">
            <p className="truncate overflow-hidden">{profile.email}</p>
            <p>{profile.phone}</p>
            <p>{profile.location}</p>
            {profile.links?.linkedin && <p className="truncate overflow-hidden">LI: {profile.links.linkedin.replace('https://', '')}</p>}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#FF6B35] mb-4 border-b border-gray-800 pb-2">Yetenekler</h2>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {skills.map(s => (
              <div key={s.id} className="text-[10px] bg-gray-800 px-3 py-2 rounded-lg flex flex-col gap-0.5">
                <span className="font-bold text-gray-100">{s.name}</span>
                <span className="text-[8px] text-[#FF6B35] uppercase font-black tracking-tighter opacity-80">
                  {s.level <= 33 ? 'Temel' : s.level <= 66 ? 'Orta' : 'İleri'}
                </span>
              </div>
            ))}
          </div>
        </section>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-2/3 p-10 space-y-10 bg-white">
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-gray-200"></span> İş Deneyimi
          </h2>
          <div className="space-y-8">
            {experiences.map(exp => (
              <div key={exp.id} className="relative pl-6 border-l border-gray-100">
                <div className="absolute left-[-4px] top-1 w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-[10px] font-bold text-gray-400">{exp.startDate} — {exp.endDate || 'Günümüz'}</span>
                </div>
                <div className="text-xs font-medium text-[#FF6B35] mb-3">{exp.company}</div>
                <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-gray-200"></span> Eğitim
          </h2>
          <div className="space-y-6">
            {educations.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-[10px] font-bold text-gray-400">{edu.startDate} — {edu.endDate || 'Günümüz'}</span>
                </div>
                <p className="text-xs text-gray-600">{edu.school}</p>
              </div>
            ))}
          </div>
        </section>

        {projects.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-gray-200"></span> Projeler
            </h2>
            <div className="space-y-6">
              {projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900">{proj.title}</h3>
                    <div className="flex gap-2">
                       {proj.technologies?.map(t => (
                         <span key={t} className="text-[8px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 uppercase font-black">{t}</span>
                       ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
