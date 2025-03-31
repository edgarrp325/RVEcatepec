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

export const statusFilter: Filter = {
    columnKey: 'status',
    title: 'Status',
    options: [
        { value: 'Available', label: 'Available' },
        { value: 'In use', label: 'In use' },
        { value: 'Maintenance', label: 'Maintenance' },
    ],
};
