import { Filter } from '@/types';

export const roleFilter: Filter = {
    columnKey: 'role',
    title: 'Roles',
    options: [
        { value: 'Administrador', label: 'Administrador' },
        { value: 'Usuario', label: 'Usuario' },
        { value: 'Alumno', label: 'Alumno' },
        { value: 'Servicio Social', label: 'Servicio Social' },
        { value: 'Prácticas profesionales', label: 'Prácticas profesionales' },
    ],
};
