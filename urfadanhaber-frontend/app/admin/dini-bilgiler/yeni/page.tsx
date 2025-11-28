import ReligiousForm from '@/components/admin/ReligiousForm';

export default function NewReligiousPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Yeni Dini İçerik Ekle</h1>
            <ReligiousForm />
        </div>
    );
}
