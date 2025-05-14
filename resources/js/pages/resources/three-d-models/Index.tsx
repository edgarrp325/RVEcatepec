import AppPagination from '@/components/app-pagination';
import { ShineBorder } from '@/components/magicui/shine-border';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppPublicLayout from '@/layouts/app-public-layout';
import { cn, getCompactNumber } from '@/lib/utils';
import { BreadcrumbItem, ThreeDModelResponse, ThreeDModelResponsePagination } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Recursos',
        href: '/resources',
    },
    {
        title: 'Modelos 3D',
        href: '/resources/three-d-models',
    },
];

interface ThreeDModelsProps {
    models: ThreeDModelResponsePagination;
}

export default function Index({ models }: ThreeDModelsProps) {
    return (
        <AppPublicLayout breadcrumbs={breadcrumb}>
            <Head title="Modelos 3D" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">
                {/* Modelos 3D */}
                <div className="flex flex-wrap gap-4 px-4 lg:px-6">
                    {models.data.map((model: ThreeDModelResponse) => {
                        return (
                            <Link key={model.id} className="w-fit" href={route('resources.three-d-models.show', model.id)}>
                                <Card className="relative h-full w-xs overflow-hidden transition-all duration-300 hover:scale-105">
                                    <ShineBorder shineColor={['#679240', '#C3A701']} borderWidth={1} />
                                    <CardHeader>
                                        <img className="aspect-video object-contain" src={`/storage/${model.img_url}`} alt={model.name} />
                                        <CardDescription>{cn('Polígonos:', getCompactNumber(model.poligons))}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-wrap items-center gap-2">
                                        {model.textures && <Badge>Texturizado</Badge>}
                                        {model.animations && <Badge>Animado</Badge>}
                                        {model.rigged && <Badge>Con esqueleto</Badge>}
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
        </AppPublicLayout>
    );
}
