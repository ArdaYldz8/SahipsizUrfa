import { NewsArticle } from '@/types/news';

const API_URL = 'http://localhost:8080/api';

export async function getNews(): Promise<NewsArticle[]> {
    try {
        const res = await fetch(`${API_URL}/news`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch news');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

export async function getNewsDetail(id: string): Promise<NewsArticle | null> {
    try {
        const res = await fetch(`${API_URL}/news/${id}`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error('Failed to fetch news detail');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching news detail:', error);
        return null;
    }
}

export async function getNewsByCategory(category: string): Promise<NewsArticle[]> {
    try {
        // In a real app, this would be a separate endpoint like /api/news?category=...
        // For now, we fetch all news and filter on the client side or mock it
        const allNews = await getNews();
        return allNews.filter(article => article.category === category);
    } catch (error) {
        console.error('Error fetching news by category:', error);
        return [];
    }
}
