import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 0;

export default async function QuestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: question } = await supabase
        .from('questions')
        .select('*')
        .eq('id', id)
        .eq('status', 'answered')
        .single();

    if (!question) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <Link href="/uzmanina-sor" className="inline-flex items-center text-gray-600 hover:text-primary mb-6 transition-colors">
                    &larr; Tüm Sorulara Dön
                </Link>

                {/* Question Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                    <div className="bg-blue-50 px-8 py-6 border-b border-blue-100">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                                👤
                            </span>
                            <div>
                                <p className="font-bold text-gray-900">{question.user_name}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(question.created_at).toLocaleDateString('tr-TR')} tarihinde sordu
                                </p>
                            </div>
                            <span className="ml-auto px-3 py-1 rounded-full text-xs font-medium bg-white text-blue-700 border border-blue-200">
                                {question.category}
                            </span>
                        </div>
                        <h1 className="text-xl font-bold text-gray-900 leading-relaxed">
                            {question.question_text}
                        </h1>
                    </div>
                </div>

                {/* Answer Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-primary/10 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl border-2 border-primary/20">
                                👨‍⚕️
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-900">{question.expert_name || 'Uzman'}</p>
                                <p className="text-sm text-primary font-medium">{question.expert_title || 'Editör'}</p>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                            <p className="whitespace-pre-wrap">{question.answer_text}</p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-right text-sm text-gray-500 italic">
                            Cevaplanma Tarihi: {new Date(question.answered_at || question.updated_at).toLocaleDateString('tr-TR')}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
