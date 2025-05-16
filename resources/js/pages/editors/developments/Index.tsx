import AppPagination from '@/components/app-pagination';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DevelopmentPagination, DevelopmentResponse } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Desarrollos',
        href: '/dashboard/developments',
    },
];

interface DevelopmentsProps {
    developments: DevelopmentPagination;
}

export default function Index({ developments }: DevelopmentsProps) {
    console.log(developments);

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Desarrollos" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">
                {/* Botón de nuevo desarrollo */}
                <div className="px-4 md:px-6">
                    <Link className={buttonVariants({ variant: 'outline' })} href={route('developments.create')}>
                        <Plus /> Nuevo desarrollo
                    </Link>
                </div>

                {/* Lista de desarrollos */}
                <div className="flex flex-wrap gap-4 px-4 lg:px-6">
                    {developments.data.map((development: DevelopmentResponse) => {
                        return (
                            <Link key={development.id} className="w-fit" href={route('developments.show', development.id)}>
                                <Card className="h-full w-xs">
                                    <CardHeader>
                                        <img
                                            className="aspect-video object-contain"
                                            src={`/storage/${development.images[0].image_url}`}
                                            alt={development.title}
                                        />
                                    </CardHeader>
                                    <CardContent className="flex flex-wrap items-center gap-2">
                                        <CardTitle className="w-full text-xl">
                                            <h1 className="line-clamp-1 text-lg">{development.title}</h1>
                                        </CardTitle>
                                        <CardDescription className="line-clamp-3">
                                            <div className="w-full" dangerouslySetInnerHTML={{ __html: development.description }} />
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                {/* Paginación */}
                <AppPagination items={developments} />
            </div>
        </AppLayout>
    );
}
