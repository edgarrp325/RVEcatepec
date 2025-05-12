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

export const isActiveFilter: Filter = {
    columnKey: 'is_active',
    title: texts.common.active,
    options: [
        { value: 'active', label: texts.common.active },
        { value: 'finished', label: texts.common.finished },
    ],
};
