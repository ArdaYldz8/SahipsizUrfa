'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Recipe, RECIPE_CATEGORIES } from '@/types/recipe';

interface RecipeFormProps {
    initialData?: Recipe;
    isEdit?: boolean;
}

export default function RecipeForm({ initialData, isEdit = false }: RecipeFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Recipe>>({
        title: '',
        description: '',
        category: 'Kebaplar',
        prep_time: '',
        cook_time: '',
        serving_size: '',
        calories: '',
        image_url: '',
        ingredients: [''],
        instructions: ['']
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleArrayChange = (
        index: number,
        value: string,
        field: 'ingredients' | 'instructions'
    ) => {
        const newArray = [...(formData[field] || [])];
        newArray[index] = value;
        setFormData({ ...formData, [field]: newArray });
    };

    const addArrayItem = (field: 'ingredients' | 'instructions') => {
        setFormData({ ...formData, [field]: [...(formData[field] || []), ''] });
    };

    const removeArrayItem = (index: number, field: 'ingredients' | 'instructions') => {
        const newArray = [...(formData[field] || [])];
        newArray.splice(index, 1);
        setFormData({ ...formData, [field]: newArray });
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            // Generate slug from title
            const slug = formData.title!
                .toLowerCase()
                .replace(/ğ/g, 'g')
                .replace(/ü/g, 'u')
                .replace(/ş/g, 's')
                .replace(/ı/g, 'i')
                .replace(/ö/g, 'o')
                .replace(/ç/g, 'c')
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-');

            const dataToSave = {
                ...formData,
                slug,
                // Filter out empty strings
                ingredients: formData.ingredients?.filter(i => i.trim() !== ''),
                instructions: formData.instructions?.filter(i => i.trim() !== '')
            };

            if (isEdit && initialData) {
                const { error } = await supabase
                    .from('recipes')
                    .update(dataToSave)
                    .eq('id', initialData.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('recipes')
                    .insert([dataToSave]);
                if (error) throw error;
            }

            router.push('/admin/yemek');
            router.refresh();
        } catch (error) {
            console.error('Kaydetme hatası:', error);
            alert('Kaydedilirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Yemek Adı</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kısa Açıklama</label>
                    <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                        {RECIPE_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Görsel URL</label>
                    <input
                        type="text"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hazırlama Süresi</label>
                    <input
                        type="text"
                        value={formData.prep_time}
                        onChange={(e) => setFormData({ ...formData, prep_time: e.target.value })}
                        placeholder="Örn: 30 dk"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pişirme Süresi</label>
                    <input
                        type="text"
                        value={formData.cook_time}
                        onChange={(e) => setFormData({ ...formData, cook_time: e.target.value })}
                        placeholder="Örn: 45 dk"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kaç Kişilik</label>
                    <input
                        type="text"
                        value={formData.serving_size}
                        onChange={(e) => setFormData({ ...formData, serving_size: e.target.value })}
                        placeholder="Örn: 4-6 Kişilik"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kalori (Opsiyonel)</label>
                    <input
                        type="text"
                        value={formData.calories}
                        onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                        placeholder="Örn: 350 kcal"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                </div>
            </div>

            {/* Ingredients */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Malzemeler</h3>
                    <button
                        type="button"
                        onClick={() => addArrayItem('ingredients')}
                        className="text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                        + Malzeme Ekle
                    </button>
                </div>
                <div className="space-y-3">
                    {formData.ingredients?.map((item, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => handleArrayChange(index, e.target.value, 'ingredients')}
                                placeholder={`Malzeme ${index + 1}`}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayItem(index, 'ingredients')}
                                className="text-red-500 hover:text-red-700 px-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Instructions */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Yapılış Adımları</h3>
                    <button
                        type="button"
                        onClick={() => addArrayItem('instructions')}
                        className="text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                        + Adım Ekle
                    </button>
                </div>
                <div className="space-y-3">
                    {formData.instructions?.map((item, index) => (
                        <div key={index} className="flex gap-2">
                            <span className="flex-shrink-0 w-8 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 font-bold">
                                {index + 1}
                            </span>
                            <textarea
                                rows={2}
                                value={item}
                                onChange={(e) => handleArrayChange(index, e.target.value, 'instructions')}
                                placeholder={`Adım ${index + 1}`}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayItem(index, 'instructions')}
                                className="text-red-500 hover:text-red-700 px-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                    İptal
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
            </div>
        </form>
    );
}
