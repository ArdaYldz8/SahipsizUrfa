'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getNews } from '@/lib/api/backend';

export default function BreakingNews() {
    const [news, setNews] = useState<any[]>([]);

    useEffect(() => {
        async function fetchNews() {
            try {
                const data = await getNews();
                if (data && Array.isArray(data)) {
                    setNews(data.slice(0, 10)); // Get top 10 news
                }
            } catch (error) {
                console.error('Failed to fetch breaking news', error);
            }
        }
        fetchNews();
    }, []);

    if (news.length === 0) return null;

    return (
        <div className="bg-[#A90432] text-white text-sm relative z-40 border-b border-[#8a0328] h-10 overflow-hidden">
            <div className="max-w-7xl mx-auto flex items-center h-full">
                <div className="bg-[#8a0328] h-full px-4 font-bold uppercase tracking-wider text-xs md:text-sm whitespace-nowrap z-20 shadow-lg flex items-center gap-2 relative">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Son Dakika
                    {/* Slanted edge effect */}
                    <div className="absolute top-0 right-[-12px] w-0 h-0 border-t-[40px] border-t-[#8a0328] border-r-[12px] border-r-transparent z-20"></div>
                </div>
                <div className="flex-1 overflow-hidden relative h-full flex items-center">
                    <div className="absolute top-0 left-0 whitespace-nowrap animate-marquee flex items-center h-full gap-8 pl-4">
                        {news.map((item, index) => (
                            <Link
                                key={index}
                                href={`/haber/${item.slug}`}
                                className="hover:underline hover:text-red-100 transition-colors font-medium inline-flex items-center gap-2 text-white"
                            >
                                <span className="text-white/70">•</span>
                                {item.headline}
                            </Link>
                        ))}
                        {/* Duplicate for seamless loop */}
                        {news.map((item, index) => (
                            <Link
                                key={`dup-${index}`}
                                href={`/haber/${item.slug}`}
                                className="hover:underline hover:text-red-100 transition-colors font-medium inline-flex items-center gap-2 text-white"
                            >
                                <span className="text-white/70">•</span>
                                {item.headline}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
