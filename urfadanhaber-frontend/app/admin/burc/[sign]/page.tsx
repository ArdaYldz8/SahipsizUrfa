'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { ZODIAC_SIGNS } from '@/types/burc';

export default function EditBurcPage() {
    const params = useParams();
    const sign = params?.sign as string;
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        daily_comment: '',
        love_rating: 3,
        money_rating: 3,
        health_rating: 3,
        motto: '',
        lucky_number: '',
        lucky_color: '',
    });

    const zodiacName = ZODIAC_SIGNS.find(z => z.id === sign)?.name || sign;

    useEffect(() => {
        async function loadBurc() {
            if (!sign) return;

            // Get today's date in YYYY-MM-DD format
            const today = new Date().toISOString().split('T')[0];

            const { data, error } = await supabase
                .from('horoscopes')
                .select('*')
                .eq('zodiac_sign', sign)
                .eq('date', today)
                .single();

            if (data) {
                setFormData({
                    daily_comment: data.daily_comment || '',
                    love_rating: data.love_rating || 3,
                    money_rating: data.money_rating || 3,
                    health_rating: data.health_rating || 3,
                    motto: data.motto || '',
                    lucky_number: data.lucky_number || '',
                    lucky_color: data.lucky_color || '',
                });
            }
            setLoading(false);
        }
        loadBurc();
    }, [sign]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const today = new Date().toISOString().split('T')[0];

        const { error } = await supabase
            .from('horoscopes')
            .upsert({
                zodiac_sign: sign,
                date: today,
                ...formData
            }, { onConflict: 'zodiac_sign,date' });

        if (error) {
            alert('Hata: ' + error.message);
        } else {
            alert('Başarıyla kaydedildi!');
            router.push('/admin/burc');
        }
        setSaving(false);
    };

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">{zodiacName} Burcu - Günlük Yorum Düzenle</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Günlük Yorum</label>
                    <textarea
                        required
                        rows={5}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        value={formData.daily_comment}
                        onChange={(e) => setFormData({ ...formData, daily_comment: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Aşk (1-5)</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={formData.love_rating}
                            onChange={(e) => setFormData({ ...formData, love_rating: parseInt(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Para (1-5)</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={formData.money_rating}
                            onChange={(e) => setFormData({ ...formData, money_rating: parseInt(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sağlık (1-5)</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={formData.health_rating}
                            onChange={(e) => setFormData({ ...formData, health_rating: parseInt(e.target.value) })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Günün Mottosu</label>
                    <input
                        type="text"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={formData.motto}
                        onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Şanslı Sayı</label>
                        <input
                            type="text"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={formData.lucky_number}
                            onChange={(e) => setFormData({ ...formData, lucky_number: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Şanslı Renk</label>
                        <input
                            type="text"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={formData.lucky_color}
                            onChange={(e) => setFormData({ ...formData, lucky_color: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        İptal
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {saving ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                </div>
            </form>
        </div>
    );
}
