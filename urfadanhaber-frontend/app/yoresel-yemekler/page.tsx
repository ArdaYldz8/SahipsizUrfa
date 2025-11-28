import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import RecipeCard from '@/components/recipes/RecipeCard';
import { Recipe, RECIPE_CATEGORIES } from '@/types/recipe';
import Link from 'next/link';

export const metadata = {
    title: 'Yöresel Yemekler - Urfadan Haber',
    description: 'Şanlıurfa\'nın eşsiz lezzetleri, yöresel yemek tarifleri ve mutfak kültürü.',
};

export default async function RecipesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const { category } = await searchParams;
    const cookieStore = await cookies();

    // Create a Supabase client for server components
    const supabaseClient = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );

    let query = supabaseClient.from('recipes').select('*').order('created_at', { ascending: false });

    if (category) {
        query = query.eq('category', category);
    }

    const { data: recipes } = await query;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Şanlıurfa Mutfağı
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Acının, baharatın ve lezzetin harmanlandığı kadim toprakların eşsiz tarifleri.
                </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                <Link
                    href="/yoresel-yemekler"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!category
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Tümü
                </Link>
                {RECIPE_CATEGORIES.map(cat => (
                    <Link
                        key={cat}
                        href={`/yoresel-yemekler?category=${cat}`}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {cat}
                    </Link>
                ))}
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes?.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe as Recipe} />
                ))}
            </div>

            {recipes?.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    Bu kategoride henüz tarif bulunmuyor.
                </div>
            )}
        </div>
    );
}
