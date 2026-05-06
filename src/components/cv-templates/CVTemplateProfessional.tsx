import { Profile, Experience, Education, Project, Skill } from '../../types';

interface TemplateProps {
  profile: Profile;
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
  skills: Skill[];
}

export default function CVTemplateProfessional({ profile, experiences, educations, projects, skills }: TemplateProps) {
  return (
    <div className="bg-white text-black p-6 md:p-12 w-full md:w-[210mm] min-h-screen md:min-h-[297mm] mx-auto font-serif print:w-[210mm] print:p-0 print:min-h-0" id="cv-professional">
      <style>{`
        @media print {
          #cv-professional {
            width: 210mm !important;
            height: 297mm !important;
            overflow: hidden !important;
            background: white !important;
            color: black !important;
            padding: 10mm !important;
            margin: 0 !important;
            display: block !important;
          }
          header { flex-direction: row !important; align-items: center !important; justify-content: space-between !important; margin-bottom: 10pt !important; border-width: 1pt !important; }
          h1 { font-size: 20pt !important; margin-bottom: 2pt !important; }
          h2 { font-size: 11pt !important; margin-bottom: 6pt !important; padding-bottom: 2pt !important; border-bottom: 0.5pt solid #ccc !important; }
          h3 { font-size: 9pt !important; }
          p, span, div { font-size: 8pt !important; line-height: 1.15 !important; color: black !important; }
          .mb-8 { margin-bottom: 10pt !important; }
          .space-y-6 > * + * { margin-top: 6pt !important; }
          .space-y-4 > * + * { margin-top: 4pt !important; }
          .w-24 { width: 1.5in !important; height: 1.5in !important; }
        }
      `}</style>
      {/* Header */}
      <header className="border-b-2 border-black pb-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          {profile.profileImageUrl && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-black">
              <img src={profile.profileImageUrl} alt={profile.fullName} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-tight mb-1">{profile.fullName}</h1>
            <p className="text-xl italic text-gray-700">{profile.title}</p>
          </div>
        </div>
        <div className="text-right text-sm space-y-1">
          <p>{profile.email}</p>
          <p>{profile.phone}</p>
          <p>{profile.location}</p>
          {profile.links?.website && <p>{profile.links.website}</p>}
        </div>
      </header>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 tracking-widest">Deneyim</h2>
        <div className="space-y-6">
          {experiences.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between font-bold text-sm mb-1">
                <span>{exp.position}</span>
                <span>{exp.startDate} — {exp.endDate || 'Günümüz'}</span>
              </div>
              <div className="italic text-sm mb-2 text-gray-800">{exp.company}</div>
              <p className="text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 tracking-widest">Eğitim</h2>
        <div className="space-y-4">
          {educations.map(edu => (
            <div key={edu.id}>
              <div className="flex justify-between font-bold text-sm mb-1">
                <span>{edu.degree}</span>
                <span>{edu.startDate} — {edu.endDate || 'Günümüz'}</span>
              </div>
              <div className="italic text-sm text-gray-800">{edu.school}</div>
              {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 tracking-widest">Yetenekler</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
          {skills.map((s) => (
            <div key={s.id} className="flex justify-between items-center border-b border-gray-50 pb-1">
              <span className="font-medium">{s.name}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-tight italic">
                {s.level <= 33 ? 'Temel' : s.level <= 66 ? 'Orta' : 'İleri'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 tracking-widest">Projeler</h2>
          <div className="space-y-6">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900 uppercase tracking-tight">{proj.title}</h3>
                  <div className="flex gap-2">
                    {proj.technologies?.map(tech => (
                      <span key={tech} className="text-[8px] font-black uppercase text-gray-400">#{tech}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed text-justify">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
