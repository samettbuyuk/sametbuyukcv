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
    <div className="bg-white text-[#1a1a1a] w-full md:w-[210mm] min-h-[1000px] md:min-h-[297mm] h-auto mx-auto font-serif shadow-sm print:shadow-none" id="cv-professional" style={{ width: '210mm', padding: '20mm 15mm 20mm 25mm', boxSizing: 'border-box', overflow: 'visible' }}>
      <style>{`
        @media screen {
          #cv-professional {
            width: 794px !important;
            min-height: 1123px !important;
            height: auto !important;
            margin: 2rem auto !important;
            border: 1px solid #e2e8f0;
          }
        }
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          #cv-professional {
            width: 210mm !important;
            height: auto !important;
            min-height: 297mm !important;
            padding: 20mm 15mm 20mm 25mm !important;
            margin: 0 !important;
            display: block !important;
            box-sizing: border-box !important;
            background: white !important;
            color: #1a1a1a !important;
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          header { margin-bottom: 20pt !important; border-bottom-width: 1.5pt !important; border-color: #1a1a1a !important; padding-bottom: 12pt !important; }
          h1 { font-size: 18pt !important; margin-bottom: 4pt !important; line-height: 1.2 !important; color: #1a1a1a !important; }
          h2 { font-size: 14pt !important; margin-bottom: 8pt !important; padding-bottom: 4pt !important; border-bottom: 0.5pt solid #1a1a1a !important; line-height: 1.5 !important; }
          h3 { font-size: 12pt !important; color: #1a1a1a !important; }
          p, span, div, li { font-size: 11pt !important; line-height: 1.5 !important; color: #1a1a1a !important; }
          section { margin-bottom: 15pt !important; page-break-inside: avoid !important; break-inside: avoid !important; }
          .mb-8 { margin-bottom: 12pt !important; }
          .space-y-6 > * + * { margin-top: 10pt !important; }
          .space-y-4 > * + * { margin-top: 8pt !important; }
          .w-24 { width: 1.0in !important; height: 1.0in !important; }
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
