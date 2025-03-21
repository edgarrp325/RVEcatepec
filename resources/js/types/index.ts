import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;

    account_number: string;
    paternal_surname: string;
    maternal_surname: string;
    role_id: number;

    [key: string]: unknown; // This allows for additional properties...
}

// Aditional interfaces

export interface Role {
    id: number;
    name: string;
    description: string;
}

export interface Major {
    id: number;
    name: string;
}

export interface Laboratory {
    id: number;
    name: string;
    opening_time: string;
    closing_time: string;
}

export interface Attendance {
    laboratory_name: string;
    account_number: string;
    user_name: string;
    user_paternal_surname: string;
    user_maternal_surname: string;
    role_id: number;
    attendance_id: number;
    date: string;
    start_time: string;
    end_time: string | null;
    is_active: string;
}

export interface UserWithAttendance extends User {
    pivot: {
        id: number;
        date: string;
        start_time: string;
        end_time: string | null;
        laboratory_id: number;
        user_id: number;
    };
}

// Comes from the relashionship Many-to-many Laboratory-User
export interface AttendanceResponse {
    id: number; // Lab id
    name: string; // Lab name
    opening_time: string;
    closing_time: string;
    users: UserWithAttendance[];
}
