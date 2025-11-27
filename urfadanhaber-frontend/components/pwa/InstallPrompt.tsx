'use client';

import { useState, useEffect } from 'react';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Check if already in standalone mode
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return;
        }

        // Check if iOS
        const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        setIsIOS(ios);

        // Handle Android/Chrome install prompt
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Show prompt for iOS users after a delay if not already dismissed
        if (ios && !localStorage.getItem('pwaPromptDismissed')) {
            setTimeout(() => setShowPrompt(true), 3000);
        }

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    async function handleInstall() {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setDeferredPrompt(null);
                setShowPrompt(false);
            }
        }
    }

    function handleDismiss() {
        setShowPrompt(false);
        localStorage.setItem('pwaPromptDismissed', 'true');
    }

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-2xl md:max-w-md md:left-auto md:right-4 md:bottom-4 md:rounded-xl md:border">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Uygulamayı Yükle</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Daha hızlı erişim ve bildirimler için Urfadan Haber'i ana ekranına ekle.
                    </p>

                    {isIOS ? (
                        <div className="mt-3 text-sm bg-gray-50 p-3 rounded border border-gray-100">
                            <p className="flex items-center gap-2">
                                1. <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg> <strong>Paylaş</strong> butonuna bas
                            </p>
                            <p className="flex items-center gap-2 mt-1">
                                2. <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg> <strong>Ana Ekrana Ekle</strong> de
                            </p>
                        </div>
                    ) : (
                        <button
                            onClick={handleInstall}
                            className="mt-3 w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                            Yükle
                        </button>
                    )}
                </div>
                <button
                    onClick={handleDismiss}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        </div>
    );
}
