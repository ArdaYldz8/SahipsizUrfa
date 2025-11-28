'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { ReligiousDaily, RELIGIOUS_TYPES, ReligiousType } from '@/types/religious';

interface ReligiousFormProps {
    initialData?: ReligiousDaily;
}

export default function ReligiousForm({ initialData }: ReligiousFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: 'hadith' as ReligiousType,
        content: '',
        source: '',
        display_date: new Date().toISOString().split('T')[0]
    });

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        if (initialData) {
            setFormData({
                type: initialData.type,
                content: initialData.content,
                source: initialData.source || '',
                display_date: initialData.display_date
            });
        }
    }, [initialData]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSave = {
                ...formData,
                updated_at: new Date().toISOString() // Add updated_at if schema supports it, otherwise ignored
            };

            let error;
            if (initialData) {
                const { error: updateError } = await supabase
                    .from('religious_daily')
                    .update(dataToSave)
                    .eq('id', initialData.id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('religious_daily')
                    .insert([dataToSave]);
                error = insertError;
            }

            if (error) throw error;

            router.push('/admin/dini-bilgiler');
            router.refresh();
        } catch (error: any) {
            alert('Kaydetme hatası: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        İçerik Türü
                    </label>
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as ReligiousType })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        {RELIGIOUS_TYPES.map(t => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gösterim Tarihi
                    </label>
                    <input
                        type="date"
                        required
                        value={formData.display_date}
                        onChange={(e) => setFormData({ ...formData, display_date: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    İçerik Metni
                </label>
                <textarea
                    required
                    rows={4}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Hadis-i Şerif, Ayet meali veya Dua metni..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kaynak (Opsiyonel)
                </label>
                <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Örn: Buhârî, İlim 11 veya Bakara Suresi, 255"
                />
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-50 font-medium"
                >
                    İptal
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-medium disabled:opacity-50"
                >
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
            </div>
        </form>
    );
}
