'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Condolence } from '@/types/taziye';

export default function AdminTaziyeList() {
    const [condolences, setCondolences] = useState<Condolence[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCondolences();
    }, []);

    async function fetchCondolences() {
        try {
            const { data, error } = await supabase
                .from('condolences')
                .select('*')
                .order('death_date', { ascending: false });

            if (error) throw error;
            setCondolences(data || []);
        } catch (error) {
            console.error('Error fetching condolences:', error);
            alert('Taziyeler yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    }

    async function toggleStatus(id: string, currentStatus: boolean) {
        try {
            const { error } = await supabase
                .from('condolences')
                .update({ is_active: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            fetchCondolences();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Durum güncellenirken bir hata oluştu.');
        }
    }

    async function deleteCondolence(id: string) {
        if (!confirm('Bu taziye ilanını silmek istediğinize emin misiniz?')) return;

        try {
            const { error } = await supabase
                .from('condolences')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchCondolences();
        } catch (error) {
            console.error('Error deleting condolence:', error);
            alert('Taziye silinirken bir hata oluştu.');
        }
    }

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Taziye Köşesi Yönetimi</h1>
                <Link
                    href="/admin/taziye/yeni"
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Yeni Taziye Ekle
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merhum/Merhume</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vefat Tarihi</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {condolences.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    Henüz taziye ilanı eklenmemiş.
                                </td>
                            </tr>
                        ) : (
                            condolences.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{item.deceased_name}</div>
                                        <div className="text-xs text-gray-500 truncate max-w-xs">{item.funeral_info}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(item.death_date).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => toggleStatus(item.id, item.is_active)}
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${item.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {item.is_active ? 'Yayında' : 'Taslak'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-3">
                                            <Link
                                                href={`/admin/taziye/${item.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Düzenle
                                            </Link>
                                            <button
                                                onClick={() => deleteCondolence(item.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Sil
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
