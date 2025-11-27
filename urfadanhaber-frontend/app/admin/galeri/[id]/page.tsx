'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import { Gallery, GalleryImage } from '@/types/gallery';
import { useDropzone } from 'react-dropzone';

export default function EditGalleryPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [gallery, setGallery] = useState<Gallery | null>(null);
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Unwrap params
    const [id, setId] = useState<string>('');

    useEffect(() => {
        params.then((p) => setId(p.id));
    }, [params]);

    const fetchGalleryData = useCallback(async () => {
        if (!id) return;
        try {
            // Fetch gallery details
            const { data: galleryData, error: galleryError } = await supabase
                .from('galleries')
                .select('*')
                .eq('id', id)
                .single();

            if (galleryError) throw galleryError;
            setGallery(galleryData);

            // Fetch gallery images
            const { data: imagesData, error: imagesError } = await supabase
                .from('gallery_images')
                .select('*')
                .eq('gallery_id', id)
                .order('display_order', { ascending: true });

            if (imagesError) throw imagesError;
            setImages(imagesData || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Veriler yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchGalleryData();
    }, [fetchGalleryData]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (!gallery) return;
        setUploading(true);

        try {
            for (const file of acceptedFiles) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${gallery.id}/${fileName}`;

                // Upload image
                const { error: uploadError } = await supabase.storage
                    .from('gallery-images')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                // Get public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('gallery-images')
                    .getPublicUrl(filePath);

                // Insert into database
                const { error: dbError } = await supabase
                    .from('gallery_images')
                    .insert({
                        gallery_id: gallery.id,
                        image_url: publicUrl,
                        display_order: images.length, // Append to end
                    });

                if (dbError) throw dbError;
            }

            // Refresh images
            fetchGalleryData();
        } catch (error) {
            console.error('Upload error:', error);
            alert('Fotoğraf yüklenirken bir hata oluştu.');
        } finally {
            setUploading(false);
        }
    }, [gallery, images.length, fetchGalleryData]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        }
    });

    async function setCoverImage(imageUrl: string) {
        if (!gallery) return;
        try {
            const { error } = await supabase
                .from('galleries')
                .update({ cover_image: imageUrl })
                .eq('id', gallery.id);

            if (error) throw error;
            setGallery({ ...gallery, cover_image: imageUrl });
        } catch (error) {
            console.error('Error updating cover:', error);
            alert('Kapak fotoğrafı güncellenemedi.');
        }
    }

    async function deleteImage(imageId: string) {
        if (!confirm('Bu fotoğrafı silmek istediğinize emin misiniz?')) return;
        try {
            const { error } = await supabase
                .from('gallery_images')
                .delete()
                .eq('id', imageId);

            if (error) throw error;
            fetchGalleryData();
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Fotoğraf silinemedi.');
        }
    }

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;
    if (!gallery) return <div className="p-8 text-center">Galeri bulunamadı.</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{gallery.title}</h1>
                    <p className="text-gray-500">{gallery.description}</p>
                </div>
                <button
                    onClick={() => router.push('/admin/galeri')}
                    className="text-gray-600 hover:text-gray-900"
                >
                    &larr; Listeye Dön
                </button>
            </div>

            {/* Upload Area */}
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors mb-8 ${isDragActive ? 'border-primary bg-blue-50' : 'border-gray-300 hover:border-primary'
                    }`}
            >
                <input {...getInputProps()} />
                {uploading ? (
                    <div className="text-primary font-medium">Fotoğraflar yükleniyor, lütfen bekleyin...</div>
                ) : (
                    <div>
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">
                            Fotoğrafları buraya sürükleyin veya seçmek için tıklayın
                        </p>
                    </div>
                )}
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((img) => (
                    <div key={img.id} className="group relative bg-white rounded-lg shadow overflow-hidden aspect-square">
                        <Image
                            src={img.image_url}
                            alt="Galeri fotoğrafı"
                            fill
                            className="object-cover"
                        />

                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                            <button
                                onClick={() => setCoverImage(img.image_url)}
                                className={`px-3 py-1 rounded text-xs font-medium ${gallery.cover_image === img.image_url
                                    ? 'bg-green-500 text-white'
                                    : 'bg-white text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                {gallery.cover_image === img.image_url ? 'Kapak Fotoğrafı' : 'Kapak Yap'}
                            </button>
                            <button
                                onClick={() => deleteImage(img.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700"
                            >
                                Sil
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
