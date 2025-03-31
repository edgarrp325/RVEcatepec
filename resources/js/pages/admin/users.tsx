import { DataTable } from '@/components/data-table/data-table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RoleEnum } from '@/enums';
import AppLayout from '@/layouts/app-layout';
import { getColumns } from '@/lib/data-tables/users/columns';
import { roleFilter } from '@/lib/data-tables/users/filters';
import { transformUsersData } from '@/lib/data-tables/users/transformer';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Role, UserResponse, UsersTable } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

interface UsersProps {
    users: UserResponse[];
    roles: Role[];
}

interface UserForm {
    [key: string]: string;
    role_id: string;
}
export default function Users({ users, roles }: UsersProps) {
    const usersData = transformUsersData(users);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const [selectedUser, setSelectedUser] = useState<UsersTable | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const {
        data,
        setData,
        put,
        delete: destroy,
        processing,
        clearErrors,
        reset,
    } = useForm<UserForm>({
        role_id: RoleEnum.ALUMN,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('users.update', selectedUser?.id), {
            onSuccess: () => {
                toast.success('User role updated successfully');
                closeDialog();
            },
            onFinish: () => reset(),
        });
    };
    const deleteUser = () => {
        destroy(route('users.destroy', selectedUser?.id), {
            onSuccess: () => {
                toast.success('User deleted successfully');
                closeDialog();
            },
        });
    };
    const openDialog = () => {
        setData({
            role_id: selectedUser?.role_id.toString() || RoleEnum.ALUMN,
        });

        setIsDialogOpen(true);
    };
    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedUser(null);
        clearErrors();
        reset();
    };
    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedUser(null);
        clearErrors();
        reset();
    };

    useEffect(() => {
        if (selectedUser) {
            setData({
                role_id: selectedUser.role_id.toString(),
            });
        }
    }, [selectedUser]);

    useEffect(() => {
        if (!isDialogOpen) {
            setSelectedUser(null);
            clearErrors();
            reset();
        }
    }, [isDialogOpen]);

    const columns = getColumns({ setSelectedUser, openDialog, setIsDeleteDialogOpen });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Users table */}
                <div className="@container/main flex flex-1 flex-col gap-4 p-6">
                    <DataTable
                        data={usersData}
                        columns={columns}
                        searchableColumns={['account_number', 'name', 'paternal_surname', 'maternal_surname', 'email']}
                        filters={[roleFilter]}
                    />
                </div>
                {/* Dialog to edit user role  */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Role</DialogTitle>
                            <DialogDescription>
                                You can edit the user role for{' '}
                                {cn(selectedUser?.name, selectedUser?.paternal_surname, selectedUser?.maternal_surname)}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="equipment_types">Roles</Label>
                                    <Select value={data.role_id.toString()} onValueChange={(value) => setData('role_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select the role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem key={role.id} value={role.id.toString()}>
                                                    {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end gap-4">
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeDialog}>
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit" disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Edit
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
                {/* Alert dialog to delete user  */}
                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure to delete this user?</AlertDialogTitle>
                            <AlertDialogDescription>This will permanently delete this user and the associated information.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={closeDeleteDialog}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={deleteUser} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
