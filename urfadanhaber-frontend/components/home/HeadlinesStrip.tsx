'use client';

import Link from 'next/link';
import Image from 'next/image';

interface NewsItem {
    id: number;
    title: string;
    slug: string;
    image_url: string;
}

interface HeadlinesStripProps {
    news: NewsItem[];
}

export default function HeadlinesStrip({ news }: HeadlinesStripProps) {
    if (!news || news.length === 0) return null;

    return (
        <div className="bg-white py-6 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 border-l-4 border-primary pl-3">
                        GÜNÜN MANŞETLERİ
                    </h2>
                    <div className="flex gap-2">
                        <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
                    {news.map((item) => (
                        <Link
                            key={item.id}
                            href={`/haber/${item.slug}`}
                            className="flex-shrink-0 w-64 group snap-start"
                        >
                            <div className="relative w-full h-40 overflow-hidden rounded-lg mb-3">
                                <Image
                                    src={item.image_url}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            </div>
                            <h3 className="text-sm font-bold text-gray-800 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                {item.title}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
