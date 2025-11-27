'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import { Gallery, GalleryImage } from '@/types/gallery';
import Link from 'next/link';

export default function GalleryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const [gallery, setGallery] = useState<Gallery | null>(null);
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Unwrap params
    const [id, setId] = useState<string>('');

    useEffect(() => {
        params.then((p) => setId(p.id));
    }, [params]);

    useEffect(() => {
        if (!id) return;
        async function fetchData() {
            try {
                const { data: galleryData } = await supabase
                    .from('galleries')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (galleryData) setGallery(galleryData);

                const { data: imagesData } = await supabase
                    .from('gallery_images')
                    .select('*')
                    .eq('gallery_id', id)
                    .order('display_order', { ascending: true });

                if (imagesData) setImages(imagesData);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    // Keyboard navigation for lightbox
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (lightboxIndex === null) return;

        if (e.key === 'Escape') setLightboxIndex(null);
        if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
        if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
    }, [lightboxIndex, images.length]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
    if (!gallery) return <div className="container mx-auto px-4 py-12 text-center">Galeri bulunamadı.</div>;

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-8">
                    <Link href="/foto-galeri" className="text-sm text-gray-500 hover:text-primary mb-4 inline-block">
                        &larr; Tüm Galeriler
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{gallery.title}</h1>
                    {gallery.description && <p className="text-lg text-gray-600 max-w-3xl">{gallery.description}</p>}

                    <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {images.length} Fotoğraf
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {new Date(gallery.created_at).toLocaleDateString('tr-TR')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Masonry Grid */}
            <div className="container mx-auto px-4 py-8">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {images.map((img, idx) => (
                        <div
                            key={img.id}
                            className="break-inside-avoid bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
                            onClick={() => setLightboxIndex(idx)}
                        >
                            <div className="relative">
                                <Image
                                    src={img.image_url}
                                    alt={img.caption || gallery.title}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-50 group-hover:scale-100 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                                </div>
                            </div>
                            {img.caption && (
                                <div className="p-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-700">{img.caption}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxIndex !== null && (
                <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm">
                    {/* Close Button */}
                    <button
                        onClick={() => setLightboxIndex(null)}
                        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-50"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1)); }}
                        className="absolute left-4 text-white/70 hover:text-white p-4 hidden md:block z-50 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0)); }}
                        className="absolute right-4 text-white/70 hover:text-white p-4 hidden md:block z-50 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {/* Main Image */}
                    <div className="relative w-full h-full max-w-7xl max-h-[90vh] p-4 flex flex-col items-center justify-center">
                        <div className="relative w-full h-full">
                            <Image
                                src={images[lightboxIndex].image_url}
                                alt={images[lightboxIndex].caption || gallery.title}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Caption & Counter */}
                        <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                            <p className="text-lg font-medium mb-2">{images[lightboxIndex].caption}</p>
                            <span className="text-sm text-white/60 bg-black/50 px-3 py-1 rounded-full">
                                {lightboxIndex + 1} / {images.length}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
