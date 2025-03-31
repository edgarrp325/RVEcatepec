import { Filter } from '@/types';

export const roleFilter: Filter = {
    columnKey: 'role',
    title: 'Role',
    options: [
        { value: 'Administrator', label: 'Administrator' },
        { value: 'User', label: 'User' },
        { value: 'Alumn', label: 'Alumn' },
        { value: 'Social Service', label: 'Social Service' },
        { value: 'Internship', label: 'Internship' },
    ],
};
