import LivePlayer from '@/components/live/LivePlayer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Canlı Yayın - Urfadan Haber',
    description: 'Şanlıurfa\'dan son dakika gelişmeleri ve canlı yayınlar.',
};

export default function LiveStreamPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Canlı Yayın
                    </h1>
                    <p className="text-lg text-gray-600">
                        Şanlıurfa'nın nabzını canlı yayınlarımızla tutun.
                    </p>
                </div>

                <LivePlayer />

                {/* Info Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Bildirimleri Açın</h3>
                        <p className="text-sm text-gray-500">Yayın başladığında haberdar olmak için bildirimlere izin verin.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Paylaşın</h3>
                        <p className="text-sm text-gray-500">Yayını sevdiklerinizle paylaşarak daha fazla kişiye ulaşmamızı sağlayın.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Yorum Yapın</h3>
                        <p className="text-sm text-gray-500">Yayın hakkındaki düşüncelerinizi yorumlarda belirtin.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
