export interface Recipe {
    id: string;
    title: string;
    slug: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    prep_time: string;
    cook_time: string;
    serving_size: string;
    calories: string;
    image_url: string;
    category: 'Kebaplar' | 'Çorbalar' | 'Tatlılar' | 'Hamur İşleri' | 'Diğer';
    created_at: string;
}

export const RECIPE_CATEGORIES = [
    'Kebaplar',
    'Çorbalar',
    'Tatlılar',
    'Hamur İşleri',
    'Diğer'
] as const;
