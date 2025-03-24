import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Equipment types',
        href: '/equipment-types',
    },
];

interface EquipmentTypes {
    id: string;
    name: string;
}

interface EquipmentTypesProps {
    equipmentTypes: EquipmentTypes[];
}

export default function EquipmentTypes({ equipmentTypes
 }: EquipmentTypesProps) {
    const { post, processing } = useForm({});   
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Equipment types" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex h-full flex-wrap items-center justify-center gap-4">
                <div className="flex flex-wrap gap-4">
                    
                </div>
                </div>
            </div>
        </AppLayout>
    );
}
