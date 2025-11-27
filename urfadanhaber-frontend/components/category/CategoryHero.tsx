'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NewsArticle } from '@/types/news';
import { CategoryConfig } from '@/lib/constants/categories';

interface CategoryHeroProps {
    news: NewsArticle[];
    config: CategoryConfig;
}

export default function CategoryHero({ news, config }: CategoryHeroProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % news.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [news.length]);

    if (!news || news.length === 0) return null;

    const currentNews = news[currentIndex];

    return (
        <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-xl shadow-2xl mb-10 group">
            {/* Main Slider Image */}
            <div className="absolute inset-0">
                <Image
                    src={currentNews.image || '/images/placeholder.jpg'}
                    alt={currentNews.headline}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent`} />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white z-10">
                <div className="max-w-3xl">
                    <span className={`inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider rounded-full ${config.bgClass} text-white`}>
                        {config.label} Manşet
                    </span>
                    <Link href={`/haber/${currentNews.id}`}>
                        <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-3 hover:text-gray-200 transition-colors">
                            {currentNews.headline}
                        </h2>
                    </Link>
                    <p className="text-gray-300 line-clamp-2 md:text-lg mb-4 hidden md:block">
                        {currentNews.description}
                    </p>
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                {news.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex
                            ? `${config.bgClass} w-8`
                            : 'bg-white/50 hover:bg-white'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Navigation Arrows (Optional, visible on hover) */}
            <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + news.length) % news.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % news.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>
    );
}
