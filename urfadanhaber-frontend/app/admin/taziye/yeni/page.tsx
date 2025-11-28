'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function NewTaziyePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        deceased_name: '',
        death_date: new Date().toISOString().split('T')[0],
        funeral_info: '',
        condolence_address: '',
        is_active: true,
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('condolences')
                .insert([formData]);

            if (error) throw error;

            router.push('/admin/taziye');
        } catch (error) {
            console.error('Error creating condolence:', error);
            alert('Taziye eklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Yeni Taziye İlanı Ekle</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Merhum/Merhume Adı Soyadı</label>
                    <input
                        type="text"
                        required
                        value={formData.deceased_name}
                        onChange={(e) => setFormData({ ...formData, deceased_name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="Örn: Ahmet Yılmaz"
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
                        placeholder="Örn: Öğle namazına müteakip Yeni Mezarlık'ta defnedilecektir."
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
                        placeholder="Örn: Karaköprü Yasin Arıcı Taziye Evi"
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
                        disabled={loading}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Ekleniyor...' : 'Taziye Ekle'}
                    </button>
                </div>
            </form>
        </div>
    );
}
