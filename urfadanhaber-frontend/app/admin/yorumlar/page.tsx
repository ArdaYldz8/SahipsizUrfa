'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Comment } from '@/types/comment';

export default function AdminCommentsPage() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchComments();
    }, []);

    async function fetchComments() {
        try {
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setComments(data || []);
        } catch (error) {
            console.error('Error fetching comments:', error);
            alert('Yorumlar yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(id: string, status: 'approved' | 'rejected') {
        try {
            const { error } = await supabase
                .from('comments')
                .update({ status })
                .eq('id', id);

            if (error) throw error;

            // Update local state
            setComments(comments.map(c => c.id === id ? { ...c, status } : c));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Durum güncellenirken bir hata oluştu.');
        }
    }

    async function deleteComment(id: string) {
        if (!confirm('Bu yorumu silmek istediğinize emin misiniz?')) return;

        try {
            const { error } = await supabase
                .from('comments')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Update local state
            setComments(comments.filter(c => c.id !== id));
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Yorum silinirken bir hata oluştu.');
        }
    }

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Yorum Yönetimi</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yorum</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {comments.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    Henüz hiç yorum yapılmamış.
                                </td>
                            </tr>
                        ) : (
                            comments.map((comment) => (
                                <tr key={comment.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{comment.user_name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 max-w-md">{comment.content}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${comment.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                comment.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {comment.status === 'approved' ? 'Onaylandı' :
                                                comment.status === 'rejected' ? 'Reddedildi' :
                                                    'Bekliyor'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(comment.created_at).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            {comment.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => updateStatus(comment.id, 'approved')}
                                                        className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded-md"
                                                    >
                                                        Onayla
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(comment.id, 'rejected')}
                                                        className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md"
                                                    >
                                                        Reddet
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => deleteComment(comment.id)}
                                                className="text-gray-400 hover:text-red-600 ml-2"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
