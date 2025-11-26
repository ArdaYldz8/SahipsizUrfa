'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Editor from '@/components/Editor';

export default function YeniHaber() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        headline: '',
        description: '',
        content: '',
        category: 'gundem',
        author: 'Admin',
        publisher: 'UrfadanHaber',
        image: '',
        slug: '',
        isAccessibleForFree: true
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8080/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data,
            });

            if (res.ok) {
                const json = await res.json();
                setFormData(prev => ({ ...prev, image: json.url }));
            } else if (res.status === 401) {
                alert('Oturum süreniz dolmuş.');
                router.push('/admin/login');
            } else {
                alert('Resim yüklenirken hata oluştu');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Resim yüklenemedi');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Otomatik slug oluştur (basitçe)
        if (!formData.slug) {
            formData.slug = formData.headline
                .toLowerCase()
                .replace(/ğ/g, 'g')
                .replace(/ü/g, 'u')
                .replace(/ş/g, 's')
                .replace(/ı/g, 'i')
                .replace(/ö/g, 'o')
                .replace(/ç/g, 'c')
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-');
        }

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8080/api/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    datePublished: new Date().toISOString(),
                    dateModified: new Date().toISOString(),
                }),
            });

            if (res.ok) {
                alert('Haber başarıyla eklendi!');
                router.push('/admin');
            } else if (res.status === 401) {
                alert('Oturum süreniz dolmuş.');
                router.push('/admin/login');
            } else {
                alert('Haber eklenirken bir hata oluştu.');
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('Bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Yeni Haber Ekle</h1>
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
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? 'Kaydediliyor...' : 'Haberi Kaydet'}
                </button>
            </form>
        </div>
    );
}
