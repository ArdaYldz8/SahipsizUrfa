export interface CategoryConfig {
    label: string;
    color: string; // Keep for reference if needed
    bgClass: string; // Full Tailwind class: bg-red-600
    textClass: string; // Full Tailwind class: text-red-600
    borderClass: string; // Full Tailwind class: border-red-600
    description: string;
}

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
    gundem: {
        label: 'Gündem',
        color: 'blue-600',
        bgClass: 'bg-blue-600',
        textClass: 'text-blue-600',
        borderClass: 'border-blue-600',
        description: 'Şanlıurfa ve Türkiye gündeminden en son haberler, sıcak gelişmeler.',
    },
    sanliurfa: {
        label: 'Şanlıurfa',
        color: 'amber-600',
        bgClass: 'bg-amber-600',
        textClass: 'text-amber-600',
        borderClass: 'border-amber-600',
        description: 'Şanlıurfa yerel haberleri, belediye çalışmaları ve şehirdeki gelişmeler.',
    },
    siyaset: {
        label: 'Siyaset',
        color: 'indigo-800',
        bgClass: 'bg-indigo-800',
        textClass: 'text-indigo-800',
        borderClass: 'border-indigo-800',
        description: 'Siyaset dünyasından son dakika haberleri, açıklamalar ve kulis bilgileri.',
    },
    ekonomi: {
        label: 'Ekonomi',
        color: 'green-600',
        bgClass: 'bg-green-600',
        textClass: 'text-green-600',
        borderClass: 'border-green-600',
        description: 'Ekonomi haberleri, altın fiyatları, döviz kurları ve piyasa analizleri.',
    },
    spor: {
        label: 'Spor',
        color: 'red-600',
        bgClass: 'bg-red-600',
        textClass: 'text-red-600',
        borderClass: 'border-red-600',
        description: 'Şanlıurfaspor ve spor dünyasından son dakika gelişmeler, maç sonuçları.',
    },
    egitim: {
        label: 'Eğitim',
        color: 'purple-600',
        bgClass: 'bg-purple-600',
        textClass: 'text-purple-600',
        borderClass: 'border-purple-600',
        description: 'Eğitim dünyasından haberler, okullar, sınavlar ve duyurular.',
    },
    saglik: {
        label: 'Sağlık',
        color: 'teal-600',
        bgClass: 'bg-teal-600',
        textClass: 'text-teal-600',
        borderClass: 'border-teal-600',
        description: 'Sağlık haberleri, doktor tavsiyeleri ve tıbbi gelişmeler.',
    },
    yasam: {
        label: 'Yaşam',
        color: 'pink-600',
        bgClass: 'bg-pink-600',
        textClass: 'text-pink-600',
        borderClass: 'border-pink-600',
        description: 'Yaşam haberleri, kültür sanat etkinlikleri ve insan hikayeleri.',
    },
    asayis: {
        label: 'Asayiş',
        color: 'slate-700',
        bgClass: 'bg-slate-700',
        textClass: 'text-slate-700',
        borderClass: 'border-slate-700',
        description: 'Son dakika asayiş haberleri, polis adliye haberleri.',
    },
};

export const DEFAULT_CATEGORY_CONFIG: CategoryConfig = {
    label: 'Haberler',
    color: 'primary',
    bgClass: 'bg-primary',
    textClass: 'text-primary',
    borderClass: 'border-primary',
    description: 'En güncel haberler.',
};

export function getCategoryConfig(slug: string): CategoryConfig {
    return CATEGORY_CONFIG[slug.toLowerCase()] || {
        ...DEFAULT_CATEGORY_CONFIG,
        label: slug.charAt(0).toUpperCase() + slug.slice(1),
    };
}
