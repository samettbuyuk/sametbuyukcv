import { useState, useEffect, FormEvent } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Experience, OperationType } from '../../types';
import { handleFirestoreError } from '../../lib/error-handler';
import { Plus, Trash2, Edit2, X, Check, GripVertical } from 'lucide-react';

export default function ExperienceManager() {
  const [items, setItems] = useState<Experience[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<Partial<Experience>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    order: 0
  });

  useEffect(() => {
    const q = query(collection(db, 'experience'), orderBy('order', 'asc'));
    return onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })) as Experience[]);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'experience'));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'experience', editingId), form);
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'experience'), { ...form, order: items.length });
        setShowAdd(false);
      }
      setForm({ company: '', position: '', startDate: '', endDate: '', description: '', order: 0 });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'experience');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Emin misiniz?')) return;
    try {
      await deleteDoc(doc(db, 'experience', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'experience');
    }
  };

  const startEdit = (item: Experience) => {
    setEditingId(item.id);
    setForm(item);
    setShowAdd(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10 overflow-hidden">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Deneyim Geçmişi</h1>
          <p className="text-slate-500 text-sm">İş tecrübelerinizi ekleyin veya düzenleyin.</p>
        </div>
        <button
          onClick={() => { setShowAdd(!showAdd); setEditingId(null); setForm({ company: '', position: '', startDate: '', endDate: '', description: '', order: items.length }); }}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary-dark transition-all active:scale-95"
        >
          {showAdd ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showAdd ? 'İPTAL' : 'YENİ EKLE'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleSubmit} className="bento-card p-8 mb-8 space-y-6">
          <h2 className="admin-section-title">İş Detayları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="admin-label">Şirket</label>
              <input 
                value={form.company} 
                onChange={e => setForm({...form, company: e.target.value})}
                className="admin-input" required 
              />
            </div>
            <div>
              <label className="admin-label">Pozisyon</label>
              <input 
                value={form.position} 
                onChange={e => setForm({...form, position: e.target.value})}
                className="admin-input" required 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="admin-label">Başlangıç Tarihi</label>
              <input 
                placeholder="Örn: Haziran 2020"
                value={form.startDate} 
                onChange={e => setForm({...form, startDate: e.target.value})}
                className="admin-input" required 
              />
            </div>
            <div>
              <label className="admin-label">Bitiş Tarihi</label>
              <input 
                placeholder="Örn: Devam Ediyor"
                value={form.endDate} 
                onChange={e => setForm({...form, endDate: e.target.value})}
                className="admin-input" 
              />
            </div>
          </div>
          <div>
            <label className="admin-label">Açıklama</label>
            <textarea 
              rows={4}
              value={form.description} 
              onChange={e => setForm({...form, description: e.target.value})}
              className="admin-input resize-none" required 
            />
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 font-bold text-sm tracking-widest">
            <Check className="w-5 h-5" /> {editingId ? 'GÜNCELLE' : 'EKLE'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bento-card p-6 flex items-center justify-between group">
            <div className="flex items-center gap-6">
              <div className="text-slate-300 group-hover:text-slate-400 cursor-grab active:cursor-grabbing transition-colors">
                <GripVertical className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 tracking-tight">{item.position}</h3>
                <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">{item.company} • {item.startDate} - {item.endDate || 'Present'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => startEdit(item)}
                className="p-3 text-slate-400 hover:text-primary hover:bg-indigo-50 rounded-xl transition-all"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleDelete(item.id)}
                className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-20 bg-white/50 border border-dashed border-slate-200 rounded-3xl text-slate-400 italic">Henüz bir deneyim eklenmemiş.</div>
        )}
      </div>
    </div>
  );
}
