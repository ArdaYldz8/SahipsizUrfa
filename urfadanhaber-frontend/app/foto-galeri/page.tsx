import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import { Gallery } from '@/types/gallery';

export const revalidate = 60; // Revalidate every minute

async function getGalleries() {
    const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching galleries:', error);
        return [];
    }
    return data as Gallery[];
}

export default async function GalleryListPage() {
    const galleries = await getGalleries();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 border-b-4 border-primary pb-4">
                <h1 className="text-4xl font-black uppercase tracking-tight text-gray-900">
                    Foto Galeri
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                    Şanlıurfa'dan ve dünyadan en çarpıcı kareler.
                </p>
            </div>

            {galleries.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">Henüz galeri bulunmuyor.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleries.map((gallery) => (
                        <Link
                            key={gallery.id}
                            href={`/foto-galeri/${gallery.id}`}
                            className="group block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={gallery.cover_image || '/images/placeholder.jpg'}
                                    alt={gallery.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <div className="bg-primary w-12 h-1 mb-3 rounded-full" />
                                    <h2 className="text-xl font-bold leading-tight mb-2 group-hover:text-yellow-400 transition-colors">
                                        {gallery.title}
                                    </h2>
                                    {gallery.description && (
                                        <p className="text-sm text-gray-300 line-clamp-2">
                                            {gallery.description}
                                        </p>
                                    )}
                                </div>

                                {/* Icon Overlay */}
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
