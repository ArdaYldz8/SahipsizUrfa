'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Recipe } from '@/types/recipe';

export default function AdminRecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRecipes();
    }, []);

    async function loadRecipes() {
        try {
            const { data, error } = await supabase
                .from('recipes')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRecipes(data || []);
        } catch (error: any) {
            console.error('Yemekler yüklenemedi:', error.message, error.details, error.hint);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Bu tarifi silmek istediğinize emin misiniz?')) return;

        try {
            const { error } = await supabase
                .from('recipes')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setRecipes(recipes.filter(r => r.id !== id));
        } catch (error) {
            console.error('Silme hatası:', error);
            alert('Silinirken bir hata oluştu.');
        }
    }

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Yöresel Yemekler</h1>
                <Link
                    href="/admin/yemek/yeni"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Yeni Tarif Ekle
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-medium text-gray-500">Yemek Adı</th>
                            <th className="px-6 py-4 font-medium text-gray-500">Kategori</th>
                            <th className="px-6 py-4 font-medium text-gray-500">Hazırlama Süresi</th>
                            <th className="px-6 py-4 font-medium text-gray-500 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {recipes.map((recipe) => (
                            <tr key={recipe.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{recipe.title}</td>
                                <td className="px-6 py-4 text-gray-600">
                                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                        {recipe.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{recipe.prep_time}</td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <Link
                                        href={`/admin/yemek/duzenle/${recipe.id}`}
                                        className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(recipe.id)}
                                        className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {recipes.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    Henüz hiç tarif eklenmemiş.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
