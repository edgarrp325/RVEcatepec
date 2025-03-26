import { DataTable } from '@/components/data-table/data-table';
import AppLayout from '@/layouts/app-layout';
import { getColumns } from '@/lib/data-tables/equipment-types/columns';
import { EquipmentType, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Equipment types',
        href: '/equipment-types',
    },
];

interface EquipmentTypesProps {
    equipmentTypes: EquipmentType[];
}

export default function EquipmentTypes({ equipmentTypes }: EquipmentTypesProps) {   
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const columns = getColumns(setSelectedEquipment, setIsDialogOpen);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Equipment types" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Lab attendances table */}
                <div className="@container/main flex flex-1 flex-col gap-4 p-6">
                    <DataTable
                        data={equipmentTypes}
                        columns={columns}
                        searchableColumns={['name']}
                    /> 
                </div>
            </div>
        </AppLayout>
    );
}
