export interface Question {
    id: string;
    user_name: string;
    user_email?: string; // Only visible to admins
    category: string;
    question_text: string;
    answer_text?: string;
    expert_name?: string;
    expert_title?: string;
    status: 'pending' | 'answered' | 'rejected';
    created_at: string;
    answered_at?: string;
}

export const QA_CATEGORIES = [
    'Sağlık',
    'Hukuk',
    'Teknoloji',
    'Dini Bilgiler',
    'Eğitim',
    'Diğer'
];
