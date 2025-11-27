export interface Gallery {
    id: string;
    title: string;
    description: string | null;
    cover_image: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface GalleryImage {
    id: string;
    gallery_id: string;
    image_url: string;
    caption: string | null;
    display_order: number;
    created_at: string;
}
