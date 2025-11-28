'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { Question } from '@/types/qa';

export default function AdminQAListPage() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'pending' | 'answered' | 'rejected'>('pending');

    useEffect(() => {
        fetchQuestions();
    }, []);

    async function fetchQuestions() {
        setLoading(true);
        const { data, error } = await supabase
            .from('questions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching questions:', error);
        } else {
            setQuestions(data || []);
        }
        setLoading(false);
    }

    const filteredQuestions = questions.filter(q => q.status === activeTab);

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Soru - Cevap Yönetimi</h1>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`pb-2 px-4 font-medium transition-colors relative ${activeTab === 'pending' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Bekleyenler
                    {questions.filter(q => q.status === 'pending').length > 0 && (
                        <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                            {questions.filter(q => q.status === 'pending').length}
                        </span>
                    )}
                    {activeTab === 'pending' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('answered')}
                    className={`pb-2 px-4 font-medium transition-colors relative ${activeTab === 'answered' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Cevaplananlar
                    {activeTab === 'answered' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('rejected')}
                    className={`pb-2 px-4 font-medium transition-colors relative ${activeTab === 'rejected' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Reddedilenler
                    {activeTab === 'rejected' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
                    )}
                </button>
            </div>

            {/* List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Soru</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredQuestions.length > 0 ? (
                            filteredQuestions.map((q) => (
                                <tr key={q.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(q.created_at).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {q.user_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {q.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">
                                        {q.question_text}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            href={`/admin/soru-cevap/${q.id}`}
                                            className="text-primary hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md"
                                        >
                                            {activeTab === 'pending' ? 'Cevapla' : 'Düzenle'}
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    Bu kategoride soru bulunamadı.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
