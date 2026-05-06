import { useState, useEffect, FormEvent } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { OperationType } from '../../types';
import { handleFirestoreError } from '../../lib/error-handler';
import { Plus, Trash2, Edit2, X, Check, GripVertical } from 'lucide-react';

interface Props {
  collectionName: string;
  title: string;
  description: string;
  fields: { name: string; label: string; placeholder?: string; type?: string; required?: boolean }[];
}

export default function GenericItemManager({ collectionName, title, description, fields }: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy('order', 'asc'));
    return onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, collectionName));
  }, [collectionName]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, collectionName, editingId), form);
        setEditingId(null);
      } else {
        await addDoc(collection(db, collectionName), { ...form, order: items.length });
        setShowAdd(false);
      }
      setForm({});
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, collectionName);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Emin misiniz?')) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, collectionName);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">{title}</h1>
          <p className="text-slate-500 text-sm">{description}</p>
        </div>
        <button
          onClick={() => { setShowAdd(!showAdd); setEditingId(null); setForm({}); }}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary-dark transition-all active:scale-95"
        >
          {showAdd ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showAdd ? 'İPTAL' : 'YENİ EKLE'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleSubmit} className="bento-card p-8 mb-8 space-y-6">
          <h2 className="admin-section-title">Kayıt Bilgileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(f => (
              <div key={f.name} className={f.type === 'textarea' ? 'md:col-span-2' : ''}>
                <label className="admin-label">{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea
                    value={form[f.name] || ''}
                    onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                    className="admin-input resize-none"
                    rows={4}
                    required={f.required}
                  />
                ) : (
                  <input
                    type={f.type || 'text'}
                    value={form[f.name] || ''}
                    onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                    className="admin-input"
                    placeholder={f.placeholder}
                    required={f.required}
                  />
                )}
              </div>
            ))}
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 font-bold text-sm tracking-widest uppercase">
            <Check className="w-5 h-5" /> {editingId ? 'GÜNCELLE' : 'KAYDET'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bento-card p-6 flex items-center justify-between group">
            <div className="flex items-center gap-6">
              <GripVertical className="w-6 h-6 text-slate-200 group-hover:text-slate-400 transition-colors" />
              <div>
                <h3 className="font-bold text-slate-800 tracking-tight">{item[fields[0].name]}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{item[fields[1].name]}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => { setForm(item); setEditingId(item.id); setShowAdd(true); }}
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
          <div className="text-center py-20 bg-white/50 border border-dashed border-slate-200 rounded-3xl text-slate-400 italic">Henüz bir kayıt eklenmemiş.</div>
        )}
      </div>
    </div>
  );
}
