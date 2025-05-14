import AppPagination from '@/components/app-pagination';
import { ShineBorder } from '@/components/magicui/shine-border';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppPublicLayout from '@/layouts/app-public-layout';
import { BreadcrumbItem, DevelopmentPagination, DevelopmentResponse } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Desarrollos',
        href: '/developments',
    },
];

interface DevelopmentsProps {
    developments: DevelopmentPagination;
}

export default function Index({ developments }: DevelopmentsProps) {
    return (
        <AppPublicLayout breadcrumbs={breadcrumb}>
            <Head title="Desarrollos" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">
                {/* Desarrollos */}
                <div className="flex flex-wrap gap-4 px-4 lg:px-6">
                    {developments.data.map((development: DevelopmentResponse) => {
                        return (
                            <Link key={development.id} className="w-fit" href={route('public.developments.show', development.id)}>
                                <Card className="relative h-full w-xs transition-all duration-300 hover:scale-105">
                                    <ShineBorder shineColor={['#679240', '#C3A701']} borderWidth={1} />

                                    <CardHeader className="">
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
        </AppPublicLayout>
    );
}
