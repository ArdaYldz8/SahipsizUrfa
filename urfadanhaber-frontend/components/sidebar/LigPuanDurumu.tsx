'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getStandings } from '@/lib/api/external';

interface Takim {
  rank: number;
  team: string;
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals_for: number;
  goals_against: number;
  goal_diff: number;
  points: number;
  logo?: string;
}

export default function LigPuanDurumu() {
  const [takimlar, setTakimlar] = useState<Takim[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState('tff-1-lig');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getStandings(selectedLeague);
      setTakimlar(data);
      setLoading(false);
    }
    fetchData();
  }, [selectedLeague]);

  // Helper to generate a logo URL with team colors
  const getTeamLogo = (teamName: string) => {
    const lowerName = teamName.toLowerCase();
    let bg = '6b7280'; // Default gray
    let color = 'ffffff';

    if (lowerName.includes('galatasaray')) { bg = 'A90432'; color = 'FDB912'; }
    else if (lowerName.includes('fenerbahçe')) { bg = '002d72'; color = 'f6eb16'; }
    else if (lowerName.includes('beşiktaş')) { bg = '000000'; color = 'ffffff'; }
    else if (lowerName.includes('trabzon')) { bg = '8e1b39'; color = '29c5f6'; }
    else if (lowerName.includes('şanlıurfaspor') || lowerName.includes('urfa')) { bg = '006400'; color = 'FFFF00'; }
    else if (lowerName.includes('amed')) { bg = 'e7000b'; color = '00933c'; }
    else if (lowerName.includes('bursaspor')) { bg = '169944'; color = 'ffffff'; }
    else if (lowerName.includes('sakaryaspor')) { bg = '006400'; color = '000000'; }
    else if (lowerName.includes('kocaelispor')) { bg = '006400'; color = '000000'; }

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=${bg}&color=${color}&size=64&font-size=0.33&bold=true`;
  };

  // Static map of team logos (simplified for common teams)
  const teamLogos: { [key: string]: string } = {
    'galatasaray': 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Galatasaray_Sports_Club_Logo.png',
    'fenerbahçe': 'https://upload.wikimedia.org/wikipedia/tr/8/86/Fenerbah%C3%A7e_SK.png',
    'beşiktaş': 'https://upload.wikimedia.org/wikipedia/commons/2/20/Besiktas_jk.png',
    'trabzonspor': 'https://upload.wikimedia.org/wikipedia/tr/a/ab/Trabzonspor_Amblemi.png',
    'şanlıurfaspor': 'https://upload.wikimedia.org/wikipedia/tr/9/98/%C5%9Eanl%C4%B1urfaspor_logosu.png',
  };

  const getLogo = (teamName: string) => {
    const lowerName = teamName.toLowerCase();
    for (const [key, url] of Object.entries(teamLogos)) {
      if (lowerName.includes(key)) return url;
    }
    return getTeamLogo(teamName);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="text-blue-600">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900">Lig Puan Durumu</h3>
      </div>

      {/* League Selector */}
      <div className="mb-4">
        <div className="relative">
          <select
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-sm font-medium"
          >
            <option value="super-lig">Süper Lig</option>
            <option value="tff-1-lig">TFF 1. Lig</option>
            <option value="tff-2-lig">TFF 2. Lig</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-sm min-w-[350px]">
          <thead className="sticky top-0 bg-white z-10 shadow-sm">
            <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
              <th className="py-2 px-1 text-center w-6">#</th>
              <th className="py-2 px-1 text-left">Takım</th>
              <th className="py-2 px-1 text-center w-6" title="Oynadığı">O</th>
              <th className="py-2 px-1 text-center w-6" title="Galibiyet">G</th>
              <th className="py-2 px-1 text-center w-6" title="Beraberlik">B</th>
              <th className="py-2 px-1 text-center w-6" title="Mağlubiyet">M</th>
              <th className="py-2 px-1 text-center w-6" title="Averaj">Av</th>
              <th className="py-2 px-1 text-center w-6 font-bold" title="Puan">P</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {takimlar.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  Veri bulunamadı.
                </td>
              </tr>
            ) : (
              takimlar.map((takim, index) => {
                const isUrfaspor = takim.team?.toLowerCase().includes('şanlıurfa') || takim.team?.toLowerCase().includes('urfa');

                // Rank Color Logic
                let rankColorClass = 'bg-gray-100 text-gray-600';
                if (index === 0) rankColorClass = 'bg-yellow-400 text-white'; // 1st
                else if (index === 1) rankColorClass = 'bg-green-500 text-white'; // 2nd
                else if (index === 2) rankColorClass = 'bg-blue-500 text-white'; // 3rd
                else if (index <= 6) rankColorClass = 'bg-blue-400 text-white'; // Play-off spots
                else if (index >= takimlar.length - 4) rankColorClass = 'bg-red-500 text-white'; // Relegation zone

                return (
                  <tr
                    key={`${takim.team}-${index}`}
                    className={`hover:bg-gray-50 transition-colors ${isUrfaspor ? 'bg-green-50' : ''}`}
                  >
                    <td className="py-2 px-1 text-center">
                      <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${rankColorClass}`}>
                        {takim.rank}
                      </span>
                    </td>
                    <td className="py-2 px-1">
                      <div className="flex items-center gap-2">
                        <div className="relative w-5 h-5 flex-shrink-0">
                          <Image
                            src={takim.logo || getLogo(takim.team)}
                            alt={takim.team}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                        <span className={`font-medium truncate max-w-[100px] text-xs ${isUrfaspor ? 'text-green-700 font-bold' : 'text-gray-900'}`}>
                          {takim.team}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-1 text-center text-gray-500 text-xs">
                      {takim.played}
                    </td>
                    <td className="py-2 px-1 text-center text-gray-500 text-xs">
                      {takim.win}
                    </td>
                    <td className="py-2 px-1 text-center text-gray-500 text-xs">
                      {takim.draw}
                    </td>
                    <td className="py-2 px-1 text-center text-gray-500 text-xs">
                      {takim.lose}
                    </td>
                    <td className="py-2 px-1 text-center text-gray-500 text-xs">
                      {takim.goal_diff}
                    </td>
                    <td className="py-2 px-1 text-center font-bold text-gray-900 text-xs">
                      {takim.points}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafb;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
