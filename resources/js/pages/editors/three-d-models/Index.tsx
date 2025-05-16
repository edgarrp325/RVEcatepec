import AppPagination from '@/components/app-pagination';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { cn, getCompactNumber } from '@/lib/utils';
import { BreadcrumbItem, ThreeDModelResponse, ThreeDModelResponsePagination } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Modelos 3D',
        href: '/dashboard/three-d-models',
    },
];

interface ThreeDModelsProps {
    models: ThreeDModelResponsePagination;
}

export default function Index({ models }: ThreeDModelsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Modelos 3D" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">
                {/* Botón para nuevo modelo 3D */}
                <div className="px-4 md:px-6">
                    <Link className={buttonVariants({ variant: 'outline' })} href={route('three-d-models.create')}>
                        <Plus /> Nuevo modelo 3D
                    </Link>
                </div>
                {/* Modelos 3D */}
                <div className="flex flex-wrap gap-4 px-4 lg:px-6">
                    {models.data.map((model: ThreeDModelResponse) => {
                        return (
                            <Link key={model.id} className="w-fit" href={route('three-d-models.show', model.id)}>
                                <Card className="h-full w-xs">
                                    <CardHeader>
                                        <img className="aspect-video object-contain" src={`/storage/${model.img_url}`} alt={model.name} />
                                        <CardDescription>{cn('Polígonos:', getCompactNumber(model.poligons))}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-wrap items-center gap-2">
                                        {model.textures && <Badge>Texturizado</Badge>}
                                        {model.animations && <Badge>Animado</Badge>}
                                        {model.rigged && <Badge>Riggeado</Badge>}
                                    </CardContent>
                                    <CardFooter className="mt-auto flex justify-between gap-4">
                                        <CardTitle className="text-xl">
                                            <h1 className="line-clamp-1 text-lg">{model.name}</h1>
                                        </CardTitle>
                                        <span className="text-muted-foreground font-semibold">{model.format.name}</span>
                                    </CardFooter>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
                {/* Paginación */}
                <AppPagination items={models} />
            </div>
        </AppLayout>
    );
}
