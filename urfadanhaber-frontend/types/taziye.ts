export interface Condolence {
    id: string;
    deceased_name: string;
    death_date: string;
    funeral_info: string;
    condolence_address: string;
    latitude?: number;
    longitude?: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}
