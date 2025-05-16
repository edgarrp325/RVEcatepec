import { Filter } from '@/types';

export const laboratoryFilter: Filter = {
    columnKey: 'laboratory_name',
    title: 'Laboratorios',
    options: [
        { value: 'Realidad virtual', label: 'Realidad virtual' },
        { value: 'Software', label: 'Software' },
        { value: 'Fabricación y prototipos', label: 'Fabricación y prototipos' },
        { value: 'Electrónica', label: 'Electrónica' },
    ],
};

export const statusFilter: Filter = {
    columnKey: 'status',
    title: 'Estado',
    options: [
        { value: 'Available', label: 'Disponible' },
        { value: 'In use', label: 'En uso' },
        { value: 'Maintenance', label: 'Mantenimiento' },
    ],
};
