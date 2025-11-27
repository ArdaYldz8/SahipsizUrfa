'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';

export default function NewVideoPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        youtube_url: '',
        is_active: true,
    });

    // Helper to get YouTube thumbnail
    function getYoutubeThumbnail(url: string) {
        if (!url) return null;
        try {
            // Handle various YouTube URL formats
            let videoId = '';
            if (url.includes('youtube.com/watch?v=')) {
                videoId = url.split('v=')[1]?.split('&')[0];
            } else if (url.includes('youtu.be/')) {
                videoId = url.split('youtu.be/')[1]?.split('?')[0];
            }

            if (!videoId) return null;
            return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
        } catch (e) {
            return null;
        }
    }

    const thumbnail = getYoutubeThumbnail(formData.youtube_url);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('videos')
                .insert([formData]);

            if (error) throw error;

            router.push('/admin/video');
        } catch (error) {
            console.error('Error creating video:', error);
            alert('Video eklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Yeni Video Ekle</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Video Başlığı</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="Örn: Şanlıurfaspor Maç Özeti"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Linki</label>
                    <input
                        type="url"
                        required
                        value={formData.youtube_url}
                        onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="https://www.youtube.com/watch?v=..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Sadece YouTube linkleri desteklenir.</p>
                </div>

                {/* Thumbnail Preview */}
                {thumbnail && (
                    <div className="mt-4">
                        <span className="block text-sm font-medium text-gray-700 mb-2">Önizleme</span>
                        <div className="relative w-full h-48 bg-black rounded-lg overflow-hidden">
                            <Image
                                src={thumbnail}
                                alt="Video önizleme"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                )}

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
                        {loading ? 'Ekleniyor...' : 'Video Ekle'}
                    </button>
                </div>
            </form>
        </div>
    );
}
