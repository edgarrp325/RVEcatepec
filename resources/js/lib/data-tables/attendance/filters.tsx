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

export const isActiveFilter: Filter = {
    columnKey: 'is_active',
    title: 'Activo',
    options: [
        { value: 'active', label: 'Activo' },
        { value: 'finished', label: 'Finalizado' },
    ],
};
