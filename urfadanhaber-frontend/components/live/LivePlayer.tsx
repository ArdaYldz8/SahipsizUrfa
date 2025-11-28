'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { LiveStreamConfig } from '@/types/settings';

export default function LivePlayer() {
    const [config, setConfig] = useState<LiveStreamConfig | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSettings();

        // Real-time subscription for immediate updates
        const channel = supabase
            .channel('site_settings_changes')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'site_settings',
                    filter: 'key=eq.live_stream'
                },
                (payload) => {
                    if (payload.new && payload.new.value) {
                        setConfig(payload.new.value);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    async function loadSettings() {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'live_stream')
                .single();

            if (data) {
                setConfig(data.value);
            }
        } catch (error) {
            console.error('Canlı yayın ayarları yüklenemedi:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div className="animate-pulse bg-gray-200 aspect-video rounded-xl"></div>;

    if (!config?.isActive) {
        return (
            <div className="aspect-video bg-gray-900 rounded-xl flex flex-col items-center justify-center text-white p-8 text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Şu an canlı yayın yok</h3>
                <p className="text-gray-400">Yeni bir yayın başladığında buradan izleyebilirsiniz.</p>
            </div>
        );
    }

    return (
        <div className="relative group">
            {/* Pulsing Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                CANLI
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <iframe
                    src={`${config.embedUrl}?autoplay=1&rel=0`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Title Overlay (Optional) */}
            {config.title && (
                <div className="mt-4">
                    <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span>Şu an izleniyor</span>
                    </div>
                </div>
            )}
        </div>
    );
}
