import { DataTable } from '@/components/data-table/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import texts from '@/config/texts';
import AppLayout from '@/layouts/app-layout';
import { getColumns } from '@/lib/data-tables/active-equipment-loans/columns';
import { laboratoryFilter } from '@/lib/data-tables/attendance/filters';
import { getPublicColumns } from '@/lib/data-tables/equipment/columns';
import { transformPublicEquipmentData } from '@/lib/data-tables/equipment/transformer';
import { formatTime } from '@/lib/utils';
import { EquipmentLoansResponseWithoutUser, EquipmentResponseWithoutUser, Laboratory, LaboratoryWithAttendance, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: texts.common.dashboard,
        href: '/dashboard',
    },
];

interface AlumnDashboardProps {
    attendance?: LaboratoryWithAttendance;
    laboratories?: Laboratory[];
    equipmentLoans: EquipmentLoansResponseWithoutUser[];
    availableEquipment: EquipmentResponseWithoutUser[];
    isUsingComputer: boolean;
}

interface AttendanceDashboardProps {
    attendance?: LaboratoryWithAttendance;
    laboratories?: Laboratory[];
}

interface ChooseLabForm {
    laboratory_id: number;
    [key: string]: number;
}

const AttendanceDashboard = ({ attendance, laboratories }: AttendanceDashboardProps) => {
    const { data, setData, put, post, processing } = useForm<ChooseLabForm>({
        laboratory_id: 1,
    });

    const finishAttendance: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('attendance.finish'));
    };
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('attendance.store'));
    };

    return (
        <>
            {attendance ? (
                <Card className="max-w-lg">
                    <CardHeader className="">
                        <CardTitle className="text-xl tracking-tight">{texts.dashboard.currentAttendance}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="grid gap-4">
                            <div>
                                <p className="text-muted-foreground text-sm">{texts.common.laboratory}</p>
                                <p className="text-2xl font-semibold">{attendance.name}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground text-sm">{texts.dashboard.attendanceStart}</p>
                                <p className="text-2xl font-semibold">{formatTime(attendance.pivot.date + attendance.pivot.start_time)}</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button size="lg" className="w-full" onClick={finishAttendance} disabled={processing}>
                            {texts.dashboard.finishAttendance}
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <Card className="max-w-lg">
                    <CardHeader className="">
                        <CardTitle className="text-xl tracking-tight">{texts.dashboard.chooseLaboratory}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="laboratories">{texts.common.laboratory}</Label>
                                    <Select value={data.laboratory_id.toString()} onValueChange={(value) => setData('laboratory_id', Number(value))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={texts.common.laboratory} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {laboratories?.map((laboratory) => (
                                                <SelectItem key={laboratory.id} value={laboratory.id.toString()}>
                                                    {laboratory.name.charAt(0).toUpperCase() + laboratory.name.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button type="submit" className="mt-2 w-full" disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    {texts.common.continue}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default function AlumnDashboard({ attendance, laboratories, equipmentLoans, availableEquipment, isUsingComputer }: AlumnDashboardProps) {
    const equipmentData = transformPublicEquipmentData(availableEquipment ?? []);
    const columns = getPublicColumns({ isUsingComputer });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h2 className="text-xl font-bold">{texts.dashboard.welcome}</h2>
                <AttendanceDashboard attendance={attendance} laboratories={laboratories} />
                <Separator className="my-4" />
                {/* Equipment loans table */}
                <div className="@container/main flex flex-1 flex-col gap-4 p-6">
                    <h3 className="text-xl font-bold">{texts.dashboard.myEquipmentLoans}</h3>
                    <DataTable
                        data={equipmentLoans ?? []}
                        columns={getColumns()}
                        searchableColumns={['id', 'label', 'equipment_type.name']}
                        hideExportButton
                    />
                </div>
                <Separator className="my-4" />
                {/* Available equipment table */}
                <div className="@container/main flex flex-1 flex-col gap-4 p-6">
                    <h3 className="text-xl font-bold">{texts.dashboard.availableEquipment}</h3>
                    <DataTable
                        data={equipmentData}
                        columns={columns}
                        searchableColumns={['id', 'equipment_type_name', 'label']}
                        filters={[laboratoryFilter]}
                        hideExportButton
                    />
                </div>
            </div>
        </AppLayout>
    );
}
