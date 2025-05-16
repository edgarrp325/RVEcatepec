import { DataTable } from '@/components/data-table/data-table';
import ImacIcon from '@/components/imac-icon';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import AuthLayout from '@/layouts/auth-layout';
import { getPublicColumns } from '@/lib/data-tables/equipment/columns';
import { laboratoryFilter } from '@/lib/data-tables/equipment/filters';
import { transformPublicEquipmentData } from '@/lib/data-tables/equipment/transformer';
import { EquipmentResponseWithoutUser } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface ChooseEquipmentProps {
    equipment: EquipmentResponseWithoutUser[];
    isUsingComputer: boolean;
}

interface ChooseEquipmentForm {
    equipment_id: null | string;
    [key: string]: null | string;
}

export default function ChooseEquipment({ equipment, isUsingComputer }: ChooseEquipmentProps) {
    const { post, processing, data, setData, reset } = useForm<ChooseEquipmentForm>({
        equipment_id: null,
    });

    const startLoan = () => {
        post(route('equipment-loans.store'), {
            onSuccess: () => {
                toast.success('Préstamo de equipo iniciado correctamente');
                reset('equipment_id');
            },
            onError: () => {
                toast.error('Ocurrió un error');
                reset('equipment_id');
            },
        });
    };

    useEffect(() => {
        if (data.equipment_id) {
            startLoan();
        }
    }, [data]);

    const equipmentData = transformPublicEquipmentData(equipment);
    const iMacs = equipmentData.filter((equipment) => equipment.equipment_type_id === 1);

    const columns = getPublicColumns({ isUsingComputer });

    return (
        <AuthLayout
            title="Elegir equipo"
            description="Haz clic en el botón Usar para seleccionar el equipo que necesitas. Solo puedes elegir una computadora"
            size="full"
        >
            <Head title="Equipos" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 md:gap-6">
                        {/* Rejilla de tarjetas de iMacs */}
                        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 lg:px-6 @xl/main:grid-cols-3 @5xl/main:grid-cols-6">
                            {iMacs.map((iMac) => {
                                return (
                                    <Card key={iMac.id} className="@container/card">
                                        <CardContent>
                                            <div className="relative flex w-full justify-center">
                                                <ImacIcon className="size-28" />
                                                <p className="text-primary-foreground absolute bottom-1/2 z-10 text-2xl font-semibold tabular-nums">
                                                    {iMac.label}
                                                </p>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-end gap-4">
                                            <Button
                                                onClick={() => {
                                                    setData('equipment_id', iMac.id);
                                                }}
                                                disabled={processing || isUsingComputer}
                                            >
                                                Usar
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                        </div>
                        {/* Tabla de equipos */}
                        <div className="@container/main flex flex-1 flex-col gap-4 p-6">
                            <DataTable
                                data={equipmentData}
                                columns={columns}
                                searchableColumns={['id', 'equipment_type_name', 'label']}
                                filters={[laboratoryFilter]}
                                hideExportButton
                            />
                        </div>
                        <div className="ml-auto px-4 md:px-6">
                            <Link href={route('dashboard')} className={buttonVariants({ variant: 'default' })}>
                                Continuar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
