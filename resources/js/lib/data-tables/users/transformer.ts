import { UserResponse } from '@/types';

export const transformUsersData = (users: UserResponse[]) => {
    return users.map((user) => ({
        id: user.id,
        account_number: user.account_number,
        name: user.name,
        paternal_surname: user.paternal_surname,
        maternal_surname: user.maternal_surname,
        major: user.major.length > 0 ? user.major[0].name : null,
        origin: user.origin ? user.origin.name : null,
        email: user.email,
        role_id: user.role.id,
        role: user.role.name,
        created_at: user.created_at,
    }));
};
