import { useState, useEffect, FormEvent } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Project, OperationType } from '../../types';
import { handleFirestoreError } from '../../lib/error-handler';
import { Plus, Trash2, Edit2, X, Check, Globe, Github as GhIcon } from 'lucide-react';

export default function ProjectManager() {
  const [items, setItems] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<Partial<Project>>({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    githubLink: '',
    technologies: [],
    order: 0
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    return onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })) as Project[]);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'projects'));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), form);
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'projects'), { ...form, order: items.length });
        setShowAdd(false);
      }
      setForm({ title: '', description: '', imageUrl: '', link: '', githubLink: '', technologies: [], order: 0 });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'projects');
    }
  };

  const addTech = () => {
    if (techInput && !form.technologies?.includes(techInput)) {
      setForm({ ...form, technologies: [...(form.technologies || []), techInput] });
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setForm({ ...form, technologies: form.technologies?.filter(t => t !== tech) });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10 overflow-hidden">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Projeler</h1>
          <p className="text-slate-500 text-sm">Portfolyonuzu güncel tutun.</p>
        </div>
        <button
          onClick={() => { setShowAdd(!showAdd); setEditingId(null); setForm({ title: '', description: '', imageUrl: '', link: '', githubLink: '', technologies: [], order: items.length }); }}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary-dark transition-all active:scale-95"
        >
          {showAdd ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showAdd ? 'İPTAL' : 'YENİ PROJE'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleSubmit} className="bento-card p-8 mb-8 space-y-6">
          <h2 className="admin-section-title">Proje Detayları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="admin-label">Proje Başlığı</label>
                <input 
                  value={form.title} 
                  onChange={e => setForm({...form, title: e.target.value})}
                  className="admin-input" required 
                />
              </div>
              <div>
                <label className="admin-label">Açıklama</label>
                <textarea 
                  rows={5}
                  value={form.description} 
                  onChange={e => setForm({...form, description: e.target.value})}
                  className="admin-input resize-none" required 
                />
              </div>
              <div>
                <label className="admin-label">Teknolojiler</label>
                <div className="flex gap-2 mb-3">
                  <input 
                    value={techInput} 
                    onChange={e => setTechInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
                    className="admin-input flex-1" 
                    placeholder="Örn: React"
                  />
                  <button type="button" onClick={addTech} className="bg-slate-100 px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-200">+</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.technologies?.map(tech => (
                    <span key={tech} className="bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-2">
                      {tech} <button onClick={() => removeTech(tech)} className="text-indigo-300 hover:text-indigo-600">×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="admin-label">Görsel URL</label>
                <input 
                  type="url"
                  value={form.imageUrl} 
                  onChange={e => setForm({...form, imageUrl: e.target.value})}
                  className="admin-input" 
                />
                {form.imageUrl && (
                  <div className="mt-4 aspect-video rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden ring-4 ring-white shadow-sm">
                    <img src={form.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="admin-label">Canlı Link</label>
                  <input 
                    type="url"
                    value={form.link} 
                    onChange={e => setForm({...form, link: e.target.value})}
                    className="admin-input text-xs" 
                  />
                </div>
                <div>
                  <label className="admin-label">GitHub Link</label>
                  <input 
                    type="url"
                    value={form.githubLink} 
                    onChange={e => setForm({...form, githubLink: e.target.value})}
                    className="admin-input text-xs" 
                  />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-sm active:scale-95">
            <Check className="w-5 h-5" /> {editingId ? 'GÜNCELLE' : 'EKLE'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bento-card overflow-hidden flex flex-col group">
            <div className="aspect-video relative overflow-hidden bg-slate-100 border-b border-slate-100">
              {item.imageUrl && (
                <img src={item.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              )}
              <div className="absolute top-4 right-4 flex items-center gap-1">
                <button 
                  onClick={() => { setForm(item); setEditingId(item.id); setShowAdd(true); }}
                  className="p-3 bg-white/90 backdrop-blur-sm text-slate-600 hover:text-primary rounded-xl shadow-sm transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={async () => { if(confirm('Emin misiniz?')) await deleteDoc(doc(db, 'projects', item.id)); }}
                  className="p-3 bg-white/90 backdrop-blur-sm text-slate-600 hover:text-red-500 rounded-xl shadow-sm transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-slate-800 tracking-tight mb-2 uppercase">{item.title}</h3>
              <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">{item.description}</p>
              <div className="flex gap-4 pt-4 border-t border-slate-50">
                {item.link && <a href={item.link} target="_blank" className="text-slate-300 hover:text-slate-900 transition-colors"><Globe className="w-5 h-5" /></a>}
                {item.githubLink && <a href={item.githubLink} target="_blank" className="text-slate-300 hover:text-slate-900 transition-colors"><GhIcon className="w-5 h-5" /></a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
