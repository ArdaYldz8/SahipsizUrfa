export interface SiteSetting {
    id: string;
    key: string;
    value: any;
    description?: string;
    created_at: string;
    updated_at: string;
}

export interface LiveStreamConfig {
    isActive: boolean;
    embedUrl: string;
    title?: string;
}
