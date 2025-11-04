'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AramaKutusu() {
  const [aramaMetni, setAramaMetni] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aramaMetni.trim()) {
      router.push(`/arama?q=${encodeURIComponent(aramaMetni.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <input
        type="search"
        placeholder="Haber ara..."
        value={aramaMetni}
        onChange={(e) => setAramaMetni(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary hidden md:block w-64 text-gray-900"
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark hidden md:block"
      >
        Ara
      </button>
    </form>
  );
}
