import { NewsArticle } from '@/types/news';
import { supabase } from '@/lib/supabase/client';

export async function getNews(): Promise<NewsArticle[]> {
    try {
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('date_published', { ascending: false });

        if (error) {
            console.error('Error fetching news:', error);
            return [];
        }

        return mapSupabaseDataToNewsArticle(data);
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

export async function getNewsByCategory(category: string): Promise<NewsArticle[]> {
    try {
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .eq('category', category)
            .order('date_published', { ascending: false });

        if (error) {
            console.error(`Error fetching news for category ${category}:`, error);
            return [];
        }

        return mapSupabaseDataToNewsArticle(data);
    } catch (error) {
        console.error(`Error fetching news for category ${category}:`, error);
        return [];
    }
}

export async function getNewsDetail(slug: string): Promise<NewsArticle | null> {
    try {
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            console.error(`Error fetching news detail for slug ${slug}:`, error);
            return null;
        }

        return mapSupabaseDataToNewsArticle([data])[0];
    } catch (error) {
        console.error(`Error fetching news detail for slug ${slug}:`, error);
        return null;
    }
}

// Helper function to map Supabase data to our NewsArticle type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSupabaseDataToNewsArticle(data: any[]): NewsArticle[] {
    if (!data) return [];

    return data.map(item => ({
        id: item.id,
        headline: item.headline,
        description: item.description,
        content: item.content,
        author: item.author,
        datePublished: item.date_published,
        dateModified: item.date_modified,
        image: item.image,
        publisher: item.publisher,
        isAccessibleForFree: item.is_accessible_for_free,
        category: item.category,
        slug: item.slug
    }));
}
