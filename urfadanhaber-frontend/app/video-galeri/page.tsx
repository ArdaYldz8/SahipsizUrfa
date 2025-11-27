'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import { Video } from '@/types/video';

// Helper to get YouTube thumbnail
function getYoutubeThumbnail(url: string) {
    try {
        let videoId = '';
        if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('v=')[1]?.split('&')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1]?.split('?')[0];
        }
        if (!videoId) return '/images/placeholder.jpg';
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    } catch (e) {
        return '/images/placeholder.jpg';
    }
}

// Helper to get YouTube Embed URL
function getYoutubeEmbedUrl(url: string) {
    try {
        let videoId = '';
        if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('v=')[1]?.split('&')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1]?.split('?')[0];
        }
        if (!videoId) return '';
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } catch (e) {
        return '';
    }
}

export default function VideoGalleryPage() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    useEffect(() => {
        async function fetchVideos() {
            try {
                const { data, error } = await supabase
                    .from('videos')
                    .select('*')
                    .eq('is_active', true)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setVideos(data || []);
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchVideos();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 border-b-4 border-primary pb-4">
                <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900">
                    Video Galeri
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                    Şanlıurfa'dan en güncel ve özel video içerikler.
                </p>
            </div>

            {videos.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">Henüz video bulunmuyor.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                            onClick={() => setSelectedVideo(video)}
                        >
                            <div className="relative h-56 w-full">
                                <Image
                                    src={getYoutubeThumbnail(video.youtube_url)}
                                    alt={video.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                    {video.title}
                                </h3>
                                <div className="mt-3 flex items-center text-sm text-gray-500">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {new Date(video.created_at).toLocaleDateString('tr-TR')}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Video Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center backdrop-blur-sm p-4" onClick={() => setSelectedVideo(null)}>
                    <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <iframe
                            src={getYoutubeEmbedUrl(selectedVideo.youtube_url)}
                            title={selectedVideo.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}
