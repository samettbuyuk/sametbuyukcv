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
    <div className="bg-white text-gray-800 p-12 max-w-[210mm] min-h-[297mm] mx-auto font-sans" style={{ width: '210mm' }}>
      <header className="mb-12 flex justify-between items-start">
        <div className="flex-1">
          <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-2">{profile.fullName}</h1>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6">{profile.title}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            <span>{profile.email}</span>
            <span>{profile.phone}</span>
            <span>{profile.location}</span>
            {profile.links?.website && <span>{profile.links.website}</span>}
          </div>
        </div>
        {profile.profileImageUrl && (
          <div className="w-24 h-24">
            <img src={profile.profileImageUrl} alt={profile.fullName} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="space-y-12">
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-8">Deneyim</h2>
          <div className="space-y-10">
            {experiences.map(exp => (
              <div key={exp.id} className="grid grid-cols-4 gap-8">
                <div className="col-span-1 text-[10px] font-bold text-gray-400 pt-1">
                  {exp.startDate} — {exp.endDate || 'Günümüz'}
                </div>
                <div className="col-span-3">
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
              <div key={proj.id} className="grid grid-cols-4 gap-8">
                <div className="col-span-1 text-[10px] font-bold text-gray-400 pt-1">
                   ÖNE ÇIKAN
                </div>
                <div className="col-span-3">
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

        <div className="grid grid-cols-2 gap-12 border-t border-gray-100 pt-12">
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
