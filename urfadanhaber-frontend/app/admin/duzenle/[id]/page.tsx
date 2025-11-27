'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';
import Editor from '@/components/Editor';
import { supabase } from '@/lib/supabase/client';

export default function HaberDuzenle({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        headline: '',
        description: '',
        content: '',
        category: 'gundem',
        author: '',
        publisher: '',
        image: '',
        slug: '',
        isAccessibleForFree: true
    });

    useEffect(() => {
        loadNews();
    }, [id]);

    async function loadNews() {
        try {
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                throw error;
            }

            setFormData({
                headline: data.headline,
                description: data.description,
                content: data.content,
                category: data.category,
                author: data.author,
                publisher: data.publisher,
                image: data.image,
                slug: data.slug,
                isAccessibleForFree: data.is_accessible_for_free
            });
        } catch (error) {
            console.error('Yükleme hatası:', error);
            alert('Haber yüklenirken hata oluştu');
            router.push('/admin');
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            setFormData(prev => ({ ...prev, image: data.publicUrl }));
        } catch (error) {
            console.error('Upload error:', error);
            alert('Resim yüklenemedi. Lütfen "images" adında public bir bucket oluşturduğunuzdan emin olun.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const { error } = await supabase
                .from('news')
                .update({
                    headline: formData.headline,
                    description: formData.description,
                    content: formData.content,
                    category: formData.category,
                    author: formData.author,
                    publisher: formData.publisher,
                    image: formData.image,
                    slug: formData.slug,
                    is_accessible_for_free: formData.isAccessibleForFree,
                    date_modified: new Date().toISOString(),
                })
                .eq('id', id);

            if (error) {
                throw error;
            }

            alert('Haber başarıyla güncellendi!');
            router.push('/admin');
        } catch (error) {
            console.error('Submit error:', error);
            alert('Haber güncellenirken bir hata oluştu.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Haberi Düzenle</h1>
                <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                    &larr; Geri Dön
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                    <input
                        type="text"
                        name="headline"
                        required
                        value={formData.headline}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                    <input
                        type="text"
                        name="slug"
                        required
                        value={formData.slug}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 text-gray-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                    >
                        <option value="gundem">Gündem</option>
                        <option value="ekonomi">Ekonomi</option>
                        <option value="spor">Spor</option>
                        <option value="kultur-sanat">Kültür Sanat</option>
                        <option value="egitim">Eğitim</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Özet (Description)</label>
                    <textarea
                        name="description"
                        required
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">İçerik</label>
                    <Editor
                        value={formData.content}
                        onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Görsel</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                    {formData.image && (
                        <div className="mt-2 relative h-40 w-full">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={formData.image} alt="Önizleme" className="h-full object-contain" />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yazar</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 bg-white"
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </button>
            </form>
        </div>
    );
}
