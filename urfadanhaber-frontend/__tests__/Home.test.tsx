import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

// Mock the backend API
jest.mock('../lib/api/backend', () => ({
    getNews: jest.fn().mockResolvedValue([
        {
            id: '1',
            headline: 'Test Haber',
            description: 'Test Açıklama',
            author: 'Test Yazar',
            datePublished: '2023-01-01T12:00:00Z',
            image: 'https://example.com/image.jpg',
            publisher: 'UrfadanHaber',
            isAccessibleForFree: true,
            content: 'Test İçerik',
            category: 'gundem',
        },
    ]),
}));

describe('Home Page', () => {
    it('renders the headline', async () => {
        const ui = await Home();
        render(ui);

        expect(screen.getByText('Test Haber')).toBeInTheDocument();
        expect(screen.getByText('Test Açıklama')).toBeInTheDocument();
    });

    it('renders empty state when no news', async () => {
        const { getNews } = require('../lib/api/backend');
        getNews.mockResolvedValueOnce([]);

        const ui = await Home();
        render(ui);

        expect(screen.getByText(/Henüz haber eklenmemiş/i)).toBeInTheDocument();
    });
});
