'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import { Video } from '@/types/video';

// Helper to get YouTube thumbnail
function getYoutubeThumbnail(url: string) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    if (!videoId) return '/images/placeholder.jpg';
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}

export default function AdminVideoList() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVideos();
    }, []);

    async function fetchVideos() {
        try {
            const { data, error } = await supabase
                .from('videos')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setVideos(data || []);
        } catch (error) {
            console.error('Error fetching videos:', error);
            alert('Videolar yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    }

    async function toggleStatus(id: string, currentStatus: boolean) {
        try {
            const { error } = await supabase
                .from('videos')
                .update({ is_active: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            fetchVideos();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Durum güncellenirken bir hata oluştu.');
        }
    }

    async function deleteVideo(id: string) {
        if (!confirm('Bu videoyu silmek istediğinize emin misiniz?')) return;

        try {
            const { error } = await supabase
                .from('videos')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchVideos();
        } catch (error) {
            console.error('Error deleting video:', error);
            alert('Video silinirken bir hata oluştu.');
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
                <h1 className="text-2xl font-bold text-gray-900">Video Galeri</h1>
                <Link
                    href="/admin/video/yeni"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Yeni Video Ekle
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Önizleme</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Başlık</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Oluşturulma</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {videos.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    Henüz hiç video eklenmemiş.
                                </td>
                            </tr>
                        ) : (
                            videos.map((video) => (
                                <tr key={video.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="relative h-16 w-24 bg-gray-100 rounded overflow-hidden">
                                            <Image
                                                src={getYoutubeThumbnail(video.youtube_url)}
                                                alt={video.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{video.title}</div>
                                        <a href={video.youtube_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline truncate block max-w-xs">
                                            {video.youtube_url}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => toggleStatus(video.id, video.is_active)}
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${video.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {video.is_active ? 'Yayında' : 'Taslak'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(video.created_at).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-3">
                                            <Link
                                                href={`/admin/video/${video.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Düzenle
                                            </Link>
                                            <button
                                                onClick={() => deleteVideo(video.id)}
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
