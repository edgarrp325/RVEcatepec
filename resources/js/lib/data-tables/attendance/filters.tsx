import { Filter } from '@/types';

export const laboratoryFilter: Filter = {
    columnKey: 'laboratory_name',
    title: 'Labs',
    options: [
        { value: 'Realidad virtual', label: 'Realidad virtual' },
        { value: 'Software', label: 'Software' },
        { value: 'Fabricación y prototipos', label: 'Fabricación y prototipos' },
        { value: 'Electrónica', label: 'Electrónica' },
    ],
};

export const isActiveFilter: Filter = {
    columnKey: 'is_active',
    title: 'Active',
    options: [
        { value: 'active', label: 'Active' },
        { value: 'finished', label: 'Finished' },
    ],
};
