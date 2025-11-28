'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';
import { ReligiousDaily, RELIGIOUS_TYPES } from '@/types/religious';

export default function AdminReligiousPage() {
    const [items, setItems] = useState<ReligiousDaily[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        loadItems();
    }, []);

    async function loadItems() {
        try {
            const { data, error } = await supabase
                .from('religious_daily')
                .select('*')
                .order('display_date', { ascending: false });

            if (error) throw error;
            setItems(data || []);
        } catch (error: any) {
            console.error('İçerikler yüklenemedi:', error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Bu içeriği silmek istediğinize emin misiniz?')) return;

        try {
            const { error } = await supabase
                .from('religious_daily')
                .delete()
                .eq('id', id);

            if (error) throw error;
            loadItems();
        } catch (error: any) {
            alert('Silme işlemi başarısız: ' + error.message);
        }
    }

    function getTypeLabel(type: string) {
        return RELIGIOUS_TYPES.find(t => t.value === type)?.label || type;
    }

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Dini Bilgiler Yönetimi</h1>
                <Link
                    href="/admin/dini-bilgiler/yeni"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    + Yeni İçerik Ekle
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-gray-600">Tarih</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Tür</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">İçerik</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Kaynak</th>
                            <th className="p-4 text-sm font-semibold text-gray-600 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                                    {new Date(item.display_date).toLocaleDateString('tr-TR')}
                                </td>
                                <td className="p-4">
                                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                                        ${item.type === 'hadith' ? 'bg-emerald-100 text-emerald-700' :
                                            item.type === 'verse' ? 'bg-blue-100 text-blue-700' :
                                                'bg-purple-100 text-purple-700'}`}>
                                        {getTypeLabel(item.type)}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-800 max-w-md truncate" title={item.content}>
                                    {item.content}
                                </td>
                                <td className="p-4 text-sm text-gray-500">
                                    {item.source || '-'}
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <Link
                                        href={`/admin/dini-bilgiler/duzenle/${item.id}`}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        Düzenle
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500">
                                    Henüz içerik eklenmemiş.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
