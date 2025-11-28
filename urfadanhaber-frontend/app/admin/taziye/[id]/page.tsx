'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function EditTaziyePage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        deceased_name: '',
        death_date: '',
        funeral_info: '',
        condolence_address: '',
        is_active: true,
    });

    const [id, setId] = useState<string>('');

    useEffect(() => {
        params.then((p) => setId(p.id));
    }, [params]);

    useEffect(() => {
        if (!id) return;
        async function fetchCondolence() {
            try {
                const { data, error } = await supabase
                    .from('condolences')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setFormData(data);
            } catch (error) {
                console.error('Error fetching condolence:', error);
                alert('Taziye bilgileri yüklenemedi.');
            } finally {
                setLoading(false);
            }
        }
        fetchCondolence();
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);

        try {
            const { error } = await supabase
                .from('condolences')
                .update(formData)
                .eq('id', id);

            if (error) throw error;

            router.push('/admin/taziye');
        } catch (error) {
            console.error('Error updating condolence:', error);
            alert('Taziye güncellenirken bir hata oluştu.');
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Taziye Düzenle</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Merhum/Merhume Adı Soyadı</label>
                    <input
                        type="text"
                        required
                        value={formData.deceased_name}
                        onChange={(e) => setFormData({ ...formData, deceased_name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vefat Tarihi</label>
                    <input
                        type="date"
                        required
                        value={formData.death_date}
                        onChange={(e) => setFormData({ ...formData, death_date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Defin Bilgileri</label>
                    <textarea
                        required
                        rows={3}
                        value={formData.funeral_info}
                        onChange={(e) => setFormData({ ...formData, funeral_info: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Taziye Adresi</label>
                    <textarea
                        required
                        rows={3}
                        value={formData.condolence_address}
                        onChange={(e) => setFormData({ ...formData, condolence_address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="is_active"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                        Hemen Yayınla
                    </label>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        İptal
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                    </button>
                </div>
            </form>
        </div>
    );
}
