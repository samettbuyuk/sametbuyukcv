import GenericItemManager from './GenericItemManager';

export default function EducationManager() {
  return (
    <GenericItemManager
      collectionName="education"
      title="Eğitim Bilgileri"
      description="Akademik geçmişinizi yönetin."
      fields={[
        { name: 'degree', label: 'Derece / Bölüm', placeholder: 'Örn: Bilgisayar Mühendisliği Lisans', required: true },
        { name: 'school', label: 'Okul / Üniversite', placeholder: 'Örn: İstanbul Teknik Üniversitesi', required: true },
        { name: 'startDate', label: 'Başlangıç', placeholder: 'Örn: 2016', required: true },
        { name: 'endDate', label: 'Bitiş', placeholder: 'Örn: 2020' },
        { name: 'description', label: 'Açıklama', type: 'textarea' }
      ]}
    />
  );
}
