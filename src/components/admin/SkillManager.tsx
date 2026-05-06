import GenericItemManager from './GenericItemManager';

export default function SkillManager() {
  return (
    <GenericItemManager
      collectionName="skills"
      title="Yetenekler"
      description="Teknik ve sosyal yeteneklerinizi listeleyin."
      fields={[
        { name: 'name', label: 'Yetenek Adı', placeholder: 'Örn: React.js', required: true },
        { name: 'category', label: 'Kategori', placeholder: 'Örn: Frontend', required: true },
        { name: 'level', label: 'Seviye (1-100)', type: 'number', required: true }
      ]}
    />
  );
}
