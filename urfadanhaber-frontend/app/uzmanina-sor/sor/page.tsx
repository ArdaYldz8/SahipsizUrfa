'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { QA_CATEGORIES } from '@/types/qa';

export default function AskQuestionPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        category: '',
        question_text: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('questions')
                .insert([
                    {
                        user_name: formData.user_name,
                        user_email: formData.user_email,
                        category: formData.category,
                        question_text: formData.question_text,
                        status: 'pending'
                    }
                ]);

            if (error) throw error;

            alert('Sorunuz başarıyla iletildi! Uzmanlarımız inceledikten sonra yayınlanacaktır.');
            router.push('/uzmanina-sor');
        } catch (error) {
            console.error('Error submitting question:', error);
            alert('Bir hata oluştu. Lütfen tekrar deneyiniz.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-primary px-8 py-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            ✏️ Uzmanına Sor
                        </h2>
                        <p className="text-blue-100 mt-2">
                            Sorularınız uzmanlarımız tarafından incelenip cevaplanacaktır.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Adınız Soyadınız (veya Rumuz)
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="Örn: Ahmet Y."
                                    value={formData.user_name}
                                    onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    E-posta Adresiniz
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="Cevaplandığında bildirim için"
                                    value={formData.user_email}
                                    onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                                />
                                <p className="text-xs text-gray-500 mt-1">E-posta adresiniz asla yayınlanmayacaktır.</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kategori
                            </label>
                            <select
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="">Seçiniz</option>
                                {QA_CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sorunuz
                            </label>
                            <textarea
                                required
                                rows={5}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="Sorunuzu detaylı bir şekilde yazınız..."
                                value={formData.question_text}
                                onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? 'Gönderiliyor...' : 'Soruyu Gönder 🚀'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
