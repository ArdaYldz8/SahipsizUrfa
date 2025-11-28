'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { ZODIAC_SIGNS } from '@/types/burc';
                    </button >
    <button
        type="submit"
        disabled={saving}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
    >
        {saving ? 'Kaydediliyor...' : 'Kaydet'}
    </button>
                </div >
            </form >
        </div >
    );
}
