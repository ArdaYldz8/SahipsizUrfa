'use client';

import Image from 'next/image';
import Link from 'next/link';

const authors = [
    {
        id: 1,
        name: 'Ahmet Yılmaz',
        title: 'Şanlıurfa\'da Tarımın Geleceği',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    {
        id: 2,
        name: 'Ayşe Demir',
        title: 'Eğitimde Yeni Vizyon',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    {
        id: 3,
        name: 'Mehmet Öztürk',
        title: 'Yerel Yönetimler ve Hizmet',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
    {
        id: 4,
        name: 'Fatma Kaya',
        title: 'Kültürel Mirasımız',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    },
];

export default function AuthorsWidget() {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b pb-2">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="text-primary">✍️</span> KÖŞE YAZARLARI
                </h3>
                <Link href="/kose-yazarlari" className="text-xs font-medium text-gray-500 hover:text-primary">
                    Tümü
                </Link>
            </div>
            <ul className="space-y-4">
                {authors.map((author) => (
                    <li key={author.id} className="group">
                        <Link href="#" className="flex items-center gap-3">
                            <div className="relative w-12 h-12 flex-shrink-0">
                                <Image
                                    src={author.image}
                                    alt={author.name}
                                    fill
                                    className="object-cover rounded-full border-2 border-gray-100 group-hover:border-primary transition-colors"
                                />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                                    {author.name}
                                </h4>
                                <p className="text-xs text-gray-600 line-clamp-1 group-hover:text-gray-800">
                                    {author.title}
                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
