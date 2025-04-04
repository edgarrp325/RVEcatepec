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
    maternal_surname: string | null;
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

export interface AttendanceTable {
    laboratory_name: string;
    account_number: string;
    user_full_name: string;
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
export interface AttendanceResponse extends Laboratory{
    users: UserWithAttendance[];
}

// the equipment types is the same that the response from the model equipment types
export interface EquipmentType {
    id: number; 
    name: string;
}

export interface Equipment {
    id: string;
    label: string;
    equipment_type_id: number;
    status: 'In use' | 'Available' | 'Maintenance';
    used_time: number; // In minutes
    laboratory_id: number;
}

export interface Loan {
    id: number;
    date: string;
    start_time: string;
    end_time: string | null;
    equipment_id: number;
    user_id: number;
}

export interface UserWithLoan extends User {
    pivot: Loan;
}

export interface UserWithLoans extends User {
    pivot: Loan[];
}
export interface EquipmentResponse extends Equipment {
    users_in_use: UserWithLoan[] | [];
    laboratory: Laboratory;
    equipment_type: EquipmentType;
}

export interface EquipmentTable extends Equipment {
    laboratory_name: string;
    equipment_type_name: string;
    user_full_name: string | null;
    loan_id: number | null;
}

export interface EquipmentLoansResponse extends Equipment {
    equipment_type: EquipmentType;
    users: UserWithLoans[];
}

export interface EquipmentLoansTable{
    equipment_id: string;
    equipment_label: string;
    equipment_type: string;
    user_full_name: string;
    loan_date: string;
    loan_start_time: string;
    loan_end_time: string | null;
}

export interface Origin {
    id: number;
    name: string;
    user_id: number;
}
export interface UserResponse extends User {
    role: Role;
    major: Major[] | [];
    origin: Origin | null;
}

export interface UsersTable{
    id: number;
    account_number: string;
    name: string;
    paternal_surname: string;
    maternal_surname: string | null;
    major: string | null;
    origin: string | null;
    email: string;
    role_id: number;
    role: string;
    created_at: string;
}

export interface ThreeDModel{
    id: number;
    name: string;
    format_id: number;
    poligons: number;
    textures: boolean;
    animations: boolean;
    rigged: boolean;
    img_url: string;
    model_url: string;
    download_url:string;
    created_at: string;
    updated_at: string;
}

export interface Format {
    id:number;
    name:string;
}

export interface ThreeDModelResponse extends ThreeDModel{
    format: Format;
}

// Data table interfaces

export interface FilterOption {
    label: string;
    value: string;
}

export interface Filter {
    columnKey: string;
    title: string;
    options: FilterOption[];
}

// Pagination interfac

export interface Pagination {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    path: string;
    from: number;
    to: number;
    links: {label: string, url: string, active: boolean}[];
}

export interface ThreeDModelResponsePagination extends Pagination{
    data: ThreeDModelResponse[];
}