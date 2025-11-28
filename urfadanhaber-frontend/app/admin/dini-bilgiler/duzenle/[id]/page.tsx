import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import ReligiousForm from '@/components/admin/ReligiousForm';
import { ReligiousDaily } from '@/types/religious';

export default async function EditReligiousPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { cookies: { get(name: string) { return cookieStore.get(name)?.value; } } }
    );

    const { data: item } = await supabase
        .from('religious_daily')
        .select('*')
        .eq('id', id)
        .single();

    if (!item) notFound();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">İçeriği Düzenle</h1>
            <ReligiousForm initialData={item as ReligiousDaily} />
        </div>
    );
}
