'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import { Gallery } from '@/types/gallery';

export default function AdminGalleryList() {
    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGalleries();
    }, []);

    async function fetchGalleries() {
        try {
            const { data, error } = await supabase
                .from('galleries')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setGalleries(data || []);
        } catch (error) {
            console.error('Error fetching galleries:', error);
            alert('Galeriler yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    }

    async function toggleStatus(id: string, currentStatus: boolean) {
        try {
            const { error } = await supabase
                .from('galleries')
                .update({ is_active: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            fetchGalleries();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Durum güncellenirken bir hata oluştu.');
        }
    }

    async function deleteGallery(id: string) {
        if (!confirm('Bu galeriyi ve içindeki tüm fotoğrafları silmek istediğinize emin misiniz?')) return;

        try {
            const { error } = await supabase
                .from('galleries')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchGalleries();
        } catch (error) {
            console.error('Error deleting gallery:', error);
            alert('Galeri silinirken bir hata oluştu.');
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Foto Galeriler</h1>
                <Link
                    href="/admin/galeri/yeni"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Yeni Galeri Ekle
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kapak</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Başlık</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Oluşturulma</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {galleries.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    Henüz hiç galeri oluşturulmamış.
                                </td>
                            </tr>
                        ) : (
                            galleries.map((gallery) => (
                                <tr key={gallery.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="relative h-16 w-24 bg-gray-100 rounded overflow-hidden">
                                            {gallery.cover_image ? (
                                                <Image
                                                    src={gallery.cover_image}
                                                    alt={gallery.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-400">
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{gallery.title}</div>
                                        <div className="text-sm text-gray-500 line-clamp-1">{gallery.description}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => toggleStatus(gallery.id, gallery.is_active)}
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${gallery.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {gallery.is_active ? 'Yayında' : 'Taslak'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(gallery.created_at).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-3">
                                            <Link
                                                href={`/admin/galeri/${gallery.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Düzenle
                                            </Link>
                                            <button
                                                onClick={() => deleteGallery(gallery.id)}
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
