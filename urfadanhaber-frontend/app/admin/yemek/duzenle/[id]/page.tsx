'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import RecipeForm from '@/components/admin/RecipeForm';
import { Recipe } from '@/types/recipe';

export default function EditRecipePage({ params }: { params: { id: string } }) {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadRecipe() {
            const { data, error } = await supabase
                .from('recipes')
                .select('*')
                .eq('id', params.id)
                .single();

            if (data) setRecipe(data);
            setLoading(false);
        }
        loadRecipe();
    }, [params.id]);

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;
    if (!recipe) return <div className="p-8 text-center">Yemek bulunamadı.</div>;

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Tarifi Düzenle</h1>
            <RecipeForm initialData={recipe} isEdit={true} />
        </div>
    );
}
