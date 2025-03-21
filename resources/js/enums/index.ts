export const RoleEnum = {
    ADMIN: '1',
    USER: '2',
    ALUMN: '3',
    SOCIALSERVICE: '4',
    INTERNSHIP: '5',
} as const;

export const roleLabel = (role: string): string => {
    switch (role) {
        case RoleEnum.ADMIN:
            return 'Admin';
        case RoleEnum.USER:
            return 'User';
        case RoleEnum.ALUMN:
            return 'Alumn';
        case RoleEnum.SOCIALSERVICE:
            return 'Social Service';
        case RoleEnum.INTERNSHIP:
            return 'Internship';
        default:
            return 'Unknown';
    }
};

export const MajorEnum = {
    ICO: '1',
    LIA: '2',
    LPS: '3',
    LAM: '4',
    LCN: '5',
    LDE: '6',
    OTHER: '7',
} as const;