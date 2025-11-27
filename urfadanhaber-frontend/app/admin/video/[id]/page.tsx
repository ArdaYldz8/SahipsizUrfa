'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';

export default function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        youtube_url: '',
        is_active: true,
    });

    // Unwrap params
    const [id, setId] = useState<string>('');

    useEffect(() => {
        params.then((p) => setId(p.id));
    }, [params]);

    useEffect(() => {
        if (!id) return;
        async function fetchVideo() {
            try {
                const { data, error } = await supabase
                    .from('videos')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setFormData(data);
            } catch (error) {
                console.error('Error fetching video:', error);
                alert('Video bilgileri yüklenemedi.');
            } finally {
                setLoading(false);
            }
        }
        fetchVideo();
    }, [id]);

    // Helper to get YouTube thumbnail
    function getYoutubeThumbnail(url: string) {
        if (!url) return null;
        try {
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
        setSaving(true);

        try {
            const { error } = await supabase
                .from('videos')
                .update(formData)
                .eq('id', id);

            if (error) throw error;

            router.push('/admin/video');
        } catch (error) {
            console.error('Error updating video:', error);
            alert('Video güncellenirken bir hata oluştu.');
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Video Düzenle</h1>

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
