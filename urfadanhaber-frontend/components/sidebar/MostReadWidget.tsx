'use client';

import Link from 'next/link';

interface NewsItem {
    id: number;
    title: string;
    slug: string;
}

interface MostReadWidgetProps {
    news: NewsItem[];
}

export default function MostReadWidget({ news }: MostReadWidgetProps) {
    if (!news || news.length === 0) return null;

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-bold text-lg mb-4 border-b pb-2 flex items-center gap-2">
                <span className="text-red-600">🔥</span> ÇOK OKUNANLAR
            </h3>
            <ul className="space-y-4">
                {news.map((item, idx) => (
                    <Link key={item.id} href={`/haber/${item.slug}`}>
                        <li className="flex gap-3 items-start group cursor-pointer">
                            <span className="text-2xl font-bold text-gray-200 group-hover:text-primary transition-colors">
                                {idx + 1}
                            </span>
                            <div>
                                <h4 className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
                                    {item.title}
                                </h4>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}
