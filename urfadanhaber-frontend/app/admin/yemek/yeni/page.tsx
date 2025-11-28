import RecipeForm from '@/components/admin/RecipeForm';

export default function NewRecipePage() {
    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Yeni Tarif Ekle</h1>
            <RecipeForm />
        </div>
    );
}
