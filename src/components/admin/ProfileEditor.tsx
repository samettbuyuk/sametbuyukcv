import { useState, useEffect, FormEvent } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Profile, OperationType } from '../../types';
import { handleFirestoreError } from '../../lib/error-handler';
import { Save, Loader2 } from 'lucide-react';

export default function ProfileEditor() {
  const [profile, setProfile] = useState<Profile>({
    fullName: '',
    title: '',
    summary: '',
    email: '',
    phone: '',
    location: '',
    profileImageUrl: '',
    links: { linkedin: '', github: '', twitter: '', website: '' }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(doc(db, 'profile', 'data'));
        if (snap.exists()) {
          setProfile(snap.data() as Profile);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, 'profile/data');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'profile', 'data'), profile);
      alert('Profil güncellendi!');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'profile/data');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-10 overflow-hidden">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Profil Düzenle</h1>
          <p className="text-slate-500 text-sm">Kişisel bilgilerinizi buradan güncelleyebilirsiniz.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-3 hover:bg-primary-dark transition-all disabled:opacity-50 active:scale-95"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          KAYDET
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8 bento-card p-8">
        <div className="space-y-6">
          <h2 className="admin-section-title">Temel Bilgiler</h2>
          <div className="space-y-4">
            <div>
              <label className="admin-label">Ad Soyad</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                className="admin-input"
                placeholder="Örn: John Doe"
                required
              />
            </div>
            <div>
              <label className="admin-label">Unvan / Rol</label>
              <input
                type="text"
                value={profile.title}
                onChange={e => setProfile({ ...profile, title: e.target.value })}
                className="admin-input"
                placeholder="Örn: Kıdemli Yazılım Geliştirici"
                required
              />
            </div>
            <div>
              <label className="admin-label">Özet Bilgi</label>
              <textarea
                rows={5}
                value={profile.summary}
                onChange={e => setProfile({ ...profile, summary: e.target.value })}
                className="admin-input resize-none"
                placeholder="Kendinizden bahsedin..."
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="admin-section-title">İletişim & Sosyal</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="admin-label">E-posta</label>
              <input
                type="email"
                value={profile.email}
                onChange={e => setProfile({ ...profile, email: e.target.value })}
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="admin-label">Telefon</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={e => setProfile({ ...profile, phone: e.target.value })}
                className="admin-input"
              />
            </div>
            <div>
              <label className="admin-label">Konum</label>
              <input
                type="text"
                value={profile.location}
                onChange={e => setProfile({ ...profile, location: e.target.value })}
                className="admin-input"
                placeholder="Örn: İstanbul"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div className="space-y-4">
              <div>
                <label className="admin-label">Profil Resmi URL</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="url"
                    value={profile.profileImageUrl}
                    onChange={e => setProfile({ ...profile, profileImageUrl: e.target.value })}
                    className="admin-input flex-1"
                    placeholder="https://..."
                  />
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                    {profile.profileImageUrl && <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" />}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="admin-label">LinkedIn</label>
                  <input
                    type="url"
                    value={profile.links?.linkedin}
                    onChange={e => setProfile({ ...profile, links: { ...profile.links, linkedin: e.target.value } })}
                    className="admin-input text-xs"
                  />
                </div>
                <div>
                  <label className="admin-label">GitHub</label>
                  <input
                    type="url"
                    value={profile.links?.github}
                    onChange={e => setProfile({ ...profile, links: { ...profile.links, github: e.target.value } })}
                    className="admin-input text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
