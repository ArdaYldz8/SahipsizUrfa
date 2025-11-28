'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { LiveStreamConfig } from '@/types/settings';

export default function LiveStreamAdmin() {
    const [config, setConfig] = useState<LiveStreamConfig>({
        isActive: false,
        embedUrl: '',
        title: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    async function loadSettings() {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'live_stream')
                .single();

            if (error) throw error;

            if (data) {
                setConfig(data.value);
            }
        } catch (error) {
            console.error('Ayarlar yüklenemedi:', error.message, error.details, error.hint);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave() {
        setSaving(true);
        try {
            // Extract video ID if full URL is pasted (simple check for YouTube)
            let finalUrl = config.embedUrl;
            if (finalUrl.includes('youtube.com/watch?v=')) {
                const videoId = finalUrl.split('v=')[1].split('&')[0];
                finalUrl = `https://www.youtube.com/embed/${videoId}`;
            } else if (finalUrl.includes('youtu.be/')) {
                const videoId = finalUrl.split('youtu.be/')[1];
                finalUrl = `https://www.youtube.com/embed/${videoId}`;
            }

            const newConfig = { ...config, embedUrl: finalUrl };

            const { error } = await supabase
                .from('site_settings')
                .upsert({
                    key: 'live_stream',
                    value: newConfig,
                    description: 'Live stream configuration'
                }, { onConflict: 'key' });

            if (error) throw error;

            setConfig(newConfig);
            alert('Ayarlar kaydedildi!');
        } catch (error) {
            console.error('Kaydetme hatası:', error);
            alert('Bir hata oluştu');
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Canlı Yayın Yönetimi</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
                <div className="space-y-6">
                    {/* Status Toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <h3 className="font-medium text-gray-900">Yayın Durumu</h3>
                            <p className="text-sm text-gray-500">Yayını aktif veya pasif duruma getirin.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={config.isActive}
                                onChange={(e) => setConfig({ ...config, isActive: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                    </div>

                    {/* Embed URL Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Yayın Linki (Embed URL veya YouTube Linki)
                        </label>
                        <input
                            type="text"
                            value={config.embedUrl}
                            onChange={(e) => setConfig({ ...config, embedUrl: e.target.value })}
                            placeholder="https://www.youtube.com/embed/..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            YouTube video linkini direkt yapıştırabilirsiniz, otomatik olarak embed formatına çevrilecektir.
                        </p>
                    </div>

                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Yayın Başlığı (Opsiyonel)
                        </label>
                        <input
                            type="text"
                            value={config.title || ''}
                            onChange={(e) => setConfig({ ...config, title: e.target.value })}
                            placeholder="Örn: Şanlıurfa'da Son Dakika Gelişmeleri"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                    </div>

                    {/* Preview */}
                    {config.embedUrl && (
                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Önizleme</h3>
                            <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                <iframe
                                    src={config.embedUrl}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="pt-4">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Kaydediliyor...
                                </>
                            ) : (
                                'Ayarları Kaydet'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
