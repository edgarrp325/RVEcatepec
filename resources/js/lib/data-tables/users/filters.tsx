import texts from '@/config/texts';
import { Filter } from '@/types';

export const roleFilter: Filter = {
    columnKey: 'role',
    title: texts.common.role,
    options: [
        { value: texts.common.administrator, label: texts.common.administrator },
        { value: texts.common.user, label: texts.common.user },
        { value: texts.common.alumn , label: texts.common.alumn },
        { value: texts.common.socialService, label: texts.common.socialService },
        { value: texts.common.internship, label: texts.common.internship },
    ],
};
