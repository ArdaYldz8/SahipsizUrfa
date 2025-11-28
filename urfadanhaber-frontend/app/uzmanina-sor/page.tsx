import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Question } from '@/types/qa';

export const revalidate = 0;

export default async function QAPage() {
    const supabase = await createClient();

    const { data: questions } = await supabase
        .from('questions')
        .select('*')
        .eq('status', 'answered')
        .order('answered_at', { ascending: false });

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Uzmanına Sor</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        Aklınıza takılan soruları uzmanlarımıza sorun, en doğru cevapları alın.
                        Sağlıktan hukuka, teknolojiden eğitime her konuda yanınızdayız.
                    </p>
                    <Link
                        href="/uzmanina-sor/sor"
                        className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform hover:scale-105"
                    >
                        ✏️ Soru Sor
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {questions && questions.length > 0 ? (
                        questions.map((q: Question) => (
                            <Link
                                key={q.id}
                                href={`/uzmanina-sor/${q.id}`}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 flex flex-col h-full"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                        {q.category}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(q.answered_at || q.created_at).toLocaleDateString('tr-TR')}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                                    {q.question_text}
                                </h3>
                                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                                        👨‍⚕️
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{q.expert_name || 'Uzman'}</p>
                                        <p className="text-xs text-gray-500">{q.expert_title || 'Editör'}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-xl font-medium text-gray-900">Henüz cevaplanmış soru yok.</h3>
                            <p className="text-gray-500 mt-2">İlk soruyu siz sormak ister misiniz?</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
