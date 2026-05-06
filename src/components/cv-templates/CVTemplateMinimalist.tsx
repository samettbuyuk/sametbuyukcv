import { Profile, Experience, Education, Project, Skill } from '../../types';

interface TemplateProps {
  profile: Profile;
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
  skills: Skill[];
}

export default function CVTemplateMinimalist({ profile, experiences, educations, projects, skills }: TemplateProps) {
  return (
    <div className="bg-white text-gray-800 p-6 md:p-12 w-full md:w-[210mm] min-h-screen md:min-h-[297mm] mx-auto font-sans print:w-[210mm] print:h-[297mm]" id="cv-minimalist">
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          #cv-minimalist {
            width: 210mm !important;
            height: auto !important;
            min-height: 297mm !important;
            padding: 15mm !important;
            margin: 0 !important;
            background: white !important;
            overflow: visible !important;
            box-sizing: border-box !important;
            display: block !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          header { display: flex !important; flex-direction: row !important; align-items: start !important; justify-content: space-between !important; margin-bottom: 15pt !important; }
          h1 { font-size: 20pt !important; margin-bottom: 4pt !important; }
          h2 { font-size: 8pt !important; margin-bottom: 8pt !important; }
          h3 { font-size: 10pt !important; margin-bottom: 2pt !important; }
          p, span, div { font-size: 8.5pt !important; line-height: 1.2 !important; }
          .mb-12 { margin-bottom: 10pt !important; }
          .space-y-12 > * + * { margin-top: 12pt !important; }
          .space-y-10 > * + * { margin-top: 8pt !important; }
          .pt-12 { padding-top: 10pt !important; }
          .w-24 { width: 1.2in !important; height: 1.2in !important; }
          .flex-col.md\\:grid { display: grid !important; grid-template-columns: repeat(4, 1fr) !important; gap: 15pt !important; }
          .md\\:col-span-1 { grid-column: span 1 !important; }
          .md\\:col-span-3 { grid-column: span 3 !important; }
          .md\\:grid-cols-2 { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 15pt !important; }
        }
      `}</style>
      <header className="mb-12 flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-6">
        <div className="flex-1">
          <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2">{profile.fullName}</h1>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6">{profile.title}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            <span>{profile.email}</span>
            <span>{profile.phone}</span>
            <span>{profile.location}</span>
            {profile.links?.website && <span>{profile.links.website}</span>}
          </div>
        </div>
        {profile.profileImageUrl && (
          <div className="w-24 h-24 flex-shrink-0">
            <img src={profile.profileImageUrl} alt={profile.fullName} className="w-full h-full object-cover rounded-sm" />
          </div>
        )}
      </header>

      <div className="space-y-12">
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-8">Deneyim</h2>
          <div className="space-y-10">
            {experiences.map(exp => (
              <div key={exp.id} className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-8">
                <div className="md:col-span-1 text-[10px] font-bold text-gray-400 pt-1">
                  {exp.startDate} — {exp.endDate || 'Günümüz'}
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-bold text-gray-900 mb-1">{exp.position}</h3>
                  <p className="text-xs font-bold text-gray-500 mb-4">{exp.company}</p>
                  <p className="text-xs leading-loose text-gray-500">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-8">Projeler</h2>
          <div className="space-y-10">
            {projects.map(proj => (
              <div key={proj.id} className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-8">
                <div className="md:col-span-1 text-[10px] font-bold text-gray-400 pt-1">
                   ÖNE ÇIKAN
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-bold text-gray-900 mb-1">{proj.title}</h3>
                  <div className="flex gap-2 mb-3">
                    {proj.technologies?.map(t => (
                      <span key={t} className="text-[9px] text-gray-400">#{t}</span>
                    ))}
                  </div>
                  <p className="text-xs leading-loose text-gray-500">{proj.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-100 pt-12">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">Eğitim</h2>
            <div className="space-y-6">
              {educations.map(edu => (
                <div key={edu.id}>
                  <p className="text-[10px] font-bold text-gray-400 mb-1">{edu.startDate} — {edu.endDate}</p>
                  <h3 className="text-xs font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-xs text-gray-500">{edu.school}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">Yetenekler</h2>
            <div className="grid grid-cols-2 gap-4">
              {skills.map(s => (
                <div key={s.id} className="flex flex-col">
                  <span className="text-xs font-bold text-gray-900">{s.name}</span>
                  <span className="text-[9px] text-gray-400 uppercase tracking-tighter">
                    {s.level <= 33 ? 'Temel' : s.level <= 66 ? 'Orta' : 'İleri'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
