'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Comment } from '@/types/comment';

export default function CommentSection({ newsId }: { newsId: string }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState({ user_name: '', content: '' });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchComments();
    }, [newsId]);

    async function fetchComments() {
        try {
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('news_id', newsId)
                .eq('status', 'approved')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setComments(data || []);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        try {
            const { error } = await supabase
                .from('comments')
                .insert([{
                    news_id: newsId,
                    user_name: newComment.user_name,
                    content: newComment.content,
                    status: 'pending' // Default status
                }]);

            if (error) throw error;

            setMessage({
                type: 'success',
                text: 'Yorumunuz başarıyla gönderildi. Editör onayından sonra yayınlanacaktır.'
            });
            setNewComment({ user_name: '', content: '' });
        } catch (error) {
            console.error('Error submitting comment:', error);
            setMessage({
                type: 'error',
                text: 'Yorum gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'
            });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="bg-gray-50 p-6 rounded-xl mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Yorumlar ({comments.length})</h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-12 bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-4">Yorum Yap</h4>

                {message && (
                    <div className={`p-4 mb-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adınız Soyadınız</label>
                        <input
                            type="text"
                            required
                            value={newComment.user_name}
                            onChange={(e) => setNewComment({ ...newComment, user_name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            placeholder="Adınız"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Yorumunuz</label>
                        <textarea
                            required
                            rows={4}
                            value={newComment.content}
                            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            placeholder="Düşüncelerinizi paylaşın..."
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full md:w-auto px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {submitting ? 'Gönderiliyor...' : 'Yorumu Gönder'}
                    </button>
                </div>
            </form>

            {/* Comment List */}
            <div className="space-y-6">
                {loading ? (
                    <div className="text-center py-4">Yükleniyor...</div>
                ) : comments.length === 0 ? (
                    <div className="text-center text-gray-500 py-4">Henüz yorum yapılmamış. İlk yorumu siz yapın!</div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-gray-900">{comment.user_name}</span>
                                <span className="text-xs text-gray-500">
                                    {new Date(comment.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
