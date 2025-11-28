'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Question, QA_CATEGORIES } from '@/types/qa';

export default function AdminQAEditPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [question, setQuestion] = useState<Question | null>(null);
    const [id, setId] = useState<string>('');

    // Form State
    const [answerText, setAnswerText] = useState('');
    const [expertName, setExpertName] = useState('');
    const [expertTitle, setExpertTitle] = useState('');
    const [questionText, setQuestionText] = useState(''); // Allow editing typo
    const [category, setCategory] = useState('');

    useEffect(() => {
        params.then((p) => setId(p.id));
    }, [params]);

    useEffect(() => {
        if (!id) return;
        fetchQuestion();
    }, [id]);

    async function fetchQuestion() {
        const { data, error } = await supabase
            .from('questions')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching question:', error);
            alert('Soru bulunamadı.');
            router.push('/admin/soru-cevap');
        } else {
            setQuestion(data);
            setQuestionText(data.question_text);
            setCategory(data.category);
            setAnswerText(data.answer_text || '');
            setExpertName(data.expert_name || 'UrfadanHaber Uzmanı');
            setExpertTitle(data.expert_title || 'Editör');
            setLoading(false);
        }
    }

    async function handleSave(status: 'pending' | 'answered' | 'rejected') {
        setSaving(true);
        try {
            const updates: any = {
                question_text: questionText,
                category: category,
                answer_text: answerText,
                expert_name: expertName,
                expert_title: expertTitle,
                status: status,
                updated_at: new Date().toISOString(),
            };

            if (status === 'answered' && !question?.answered_at) {
                updates.answered_at = new Date().toISOString();
            }

            const { error } = await supabase
                .from('questions')
                .update(updates)
                .eq('id', id);

            if (error) throw error;

            alert(status === 'answered' ? 'Soru cevaplandı ve yayınlandı!' : 'Değişiklikler kaydedildi.');
            router.push('/admin/soru-cevap');
        } catch (error) {
            console.error('Error updating question:', error);
            alert('Bir hata oluştu.');
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!confirm('Bu soruyu tamamen silmek istediğinize emin misiniz?')) return;

        setSaving(true);
        const { error } = await supabase.from('questions').delete().eq('id', id);

        if (error) {
            alert('Silinirken hata oluştu.');
            setSaving(false);
        } else {
            router.push('/admin/soru-cevap');
        }
    }

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;
    if (!question) return null;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Soruyu Cevapla / Düzenle</h1>
                <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${question.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            question.status === 'answered' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                        }`}>
                        {question.status === 'pending' ? 'Bekliyor' :
                            question.status === 'answered' ? 'Yayında' : 'Reddedildi'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: User Info & Question */}
                <div className="lg:col-span-2 space-y-6">
                    {/* User Info Card */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-2">Kullanıcı Bilgileri</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="block text-blue-500 text-xs">Ad Soyad</span>
                                <span className="font-medium text-gray-900">{question.user_name}</span>
                            </div>
                            <div>
                                <span className="block text-blue-500 text-xs">E-posta (Gizli)</span>
                                <span className="font-medium text-gray-900">{question.user_email}</span>
                            </div>
                            <div>
                                <span className="block text-blue-500 text-xs">Tarih</span>
                                <span className="font-medium text-gray-900">{new Date(question.created_at).toLocaleDateString('tr-TR')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Question Edit */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                {QA_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Soru Metni (Düzenlenebilir)</label>
                            <textarea
                                rows={4}
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>

                    {/* Answer Section */}
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-primary/20">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            ✍️ Cevap Yaz
                        </h3>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Uzman Adı</label>
                                <input
                                    type="text"
                                    value={expertName}
                                    onChange={(e) => setExpertName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Örn: Dr. Ahmet Yılmaz"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Unvanı</label>
                                <input
                                    type="text"
                                    value={expertTitle}
                                    onChange={(e) => setExpertTitle(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Örn: Kardiyoloji Uzmanı"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cevap Metni</label>
                            <textarea
                                rows={10}
                                value={answerText}
                                onChange={(e) => setAnswerText(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                placeholder="Cevabınızı buraya yazınız..."
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Actions */}
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 sticky top-4">
                        <h3 className="font-bold text-gray-900 mb-4">İşlemler</h3>

                        <button
                            onClick={() => handleSave('answered')}
                            disabled={saving || !answerText}
                            className="w-full mb-3 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ✅ Yayınla (Cevapla)
                        </button>

                        <button
                            onClick={() => handleSave('pending')}
                            disabled={saving}
                            className="w-full mb-3 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium disabled:opacity-50"
                        >
                            💾 Taslak Kaydet
                        </button>

                        <button
                            onClick={() => handleSave('rejected')}
                            disabled={saving}
                            className="w-full mb-3 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 font-medium disabled:opacity-50"
                        >
                            🚫 Reddet (Arşivle)
                        </button>

                        <hr className="my-4 border-gray-200" />

                        <button
                            onClick={handleDelete}
                            disabled={saving}
                            className="w-full bg-red-50 text-red-600 py-2 px-4 rounded-md hover:bg-red-100 font-medium border border-red-200"
                        >
                            🗑️ Tamamen Sil
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
