export interface Comment {
    id: string;
    news_id: string;
    user_name: string;
    content: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}
