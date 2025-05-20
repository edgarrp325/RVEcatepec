import AppPagination from '@/components/app-pagination';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppPublicLayout from '@/layouts/app-public-layout';
import { DevelopmentPagination, DevelopmentResponse } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface DevelopmentsProps {
    developments: DevelopmentPagination;
}

export default function Index({ developments }: DevelopmentsProps) {
    return (
        <AppPublicLayout>
            <Head title="Desarrollos" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">
                {/* Desarrollos */}
                <section className="prose prose-p:m-0 prose-stone flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4 md:ml-16 md:p-6">
                    <h1>Desarrollos</h1>
                    <p>
                        En esta sección encontrarás una lista de los proyectos desarrollados en el laboratorio, incluyendo simulaciones, aplicaciones
                        educativas, experiencias interactivas y software de realidad virtual. Cada desarrollo contará con:
                    </p>
                    <ul>
                        <li>
                            <b>Descripción del proyecto</b>
                        </li>
                        <li>
                            <b>Objetivo y aplicaciones</b>
                        </li>
                        <li>
                            <b>Enlace para probar la aplicación o descargar el software</b>
                        </li>
                    </ul>
                </section>
                <div className="flex flex-wrap gap-4 px-4 md:ml-16 md:px-6">
                    {developments.data.map((development: DevelopmentResponse) => {
                        return (
                            <Link key={development.id} className="w-fit" href={route('public.developments.show', development.id)}>
                                <Card className="h-full w-xs transition-all duration-300 hover:scale-105">
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
