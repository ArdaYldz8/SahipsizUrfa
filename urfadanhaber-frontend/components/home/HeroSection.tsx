'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NewsItem {
    id: number;
    title: string;
    slug: string;
    image_url: string;
    category: string;
    published_at: string;
}

interface HeroSectionProps {
    news: NewsItem[];
}

export default function HeroSection({ news }: HeroSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderNews = news.slice(0, 5);
    const sideNews = news.slice(5, 10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % sliderNews.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [sliderNews.length]);

    if (!news || news.length === 0) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 h-auto lg:h-[500px]">
            {/* Main Slider (2/3) */}
            <div className="lg:col-span-2 relative group overflow-hidden h-[300px] lg:h-full">
                {sliderNews.map((item, index) => (
                    <div
                        key={item.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        <Link href={`/haber/${item.slug}`} className="block w-full h-full relative">
                            <Image
                                src={item.image_url}
                                alt={item.title}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase mb-3 rounded-sm">
                                        {item.category}
                                    </span>
                                    <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-md">
                                        {item.title}
                                    </h2>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

                {/* Slider Controls */}
                <div className="absolute bottom-6 right-6 z-20 flex gap-2">
                    {sliderNews.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white'
                                }`}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Arrows */}
                <button
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + sliderNews.length) % sliderNews.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % sliderNews.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>

            {/* Side Headlines (1/3) */}
            <div className="lg:col-span-1 bg-gray-50 flex flex-col h-full overflow-y-auto">
                {sideNews.map((item, index) => (
                    <Link
                        key={item.id}
                        href={`/haber/${item.slug}`}
                        className="flex gap-3 p-3 border-b border-gray-200 hover:bg-white transition-colors group min-h-[100px] lg:min-h-0 lg:h-1/5"
                    >
                        <div className="relative w-24 h-full flex-shrink-0 overflow-hidden rounded-sm">
                            <Image
                                src={item.image_url}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-[10px] font-bold text-primary uppercase mb-1">{item.category}</span>
                            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
