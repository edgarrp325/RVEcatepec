import texts from '@/config/texts';
import { Filter } from '@/types';

export const laboratoryFilter: Filter = {
    columnKey: 'laboratory_name',
    title: texts.common.laboratories,
    options: [
        { value: 'Realidad virtual', label: 'Realidad virtual' },
        { value: 'Software', label: 'Software' },
        { value: 'Fabricación y prototipos', label: 'Fabricación y prototipos' },
        { value: 'Electrónica', label: 'Electrónica' },
    ],
};

export const statusFilter: Filter = {
    columnKey: 'status',
    title: texts.common.status,
    options: [
        { value: 'Available', label: texts.common.available },
        { value: 'In use', label: texts.common.inUse },
        { value: 'Maintenance', label: texts.common.maintenance },
    ],
};
