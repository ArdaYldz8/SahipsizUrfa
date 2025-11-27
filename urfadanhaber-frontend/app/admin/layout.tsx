'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session && pathname !== '/admin/login') {
                router.push('/admin/login');
            }
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (!session && pathname !== '/admin/login') {
                router.push('/admin/login');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [pathname, router]);

    // Hydration mismatch önlemek için mount edilene kadar bekle
    if (!isMounted) {
        return null;
    }

    return <>{children}</>;
}
