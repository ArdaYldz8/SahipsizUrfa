'use client';

import Link from 'next/link';
import Image from 'next/image';

interface NewsItem {
    id: number;
    title: string;
    slug: string;
    image_url: string;
}

interface CategoryBlockProps {
    title: string;
    href: string;
    news: NewsItem[];
    color?: string; // Optional color override
}

export default function CategoryBlock({ title, href, news, color = 'text-primary' }: CategoryBlockProps) {
    if (!news || news.length === 0) return null;

    return (
        <section>
            <div className={`flex items-center justify-between mb-6 border-b-2 ${color === 'text-primary' ? 'border-primary' : 'border-gray-200'} pb-2`}>
                <h2 className={`text-xl font-bold ${color}`}>
                    {title}
                </h2>
                <Link href={href} className={`text-sm font-medium text-gray-500 hover:${color}`}>
                    Tümünü Gör →
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {news.map((item) => (
                    <Link key={item.id} href={`/haber/${item.slug}`} className="group">
                        <div className="relative h-32 rounded-md overflow-hidden mb-2">
                            <Image
                                src={item.image_url}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <h4 className="text-sm font-semibold text-gray-800 group-hover:text-primary line-clamp-2 transition-colors">
                            {item.title}
                        </h4>
                    </Link>
                ))}
            </div>
        </section>
    );
}
