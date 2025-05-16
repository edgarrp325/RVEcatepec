import AppPagination from '@/components/app-pagination';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, TutorialResponse, TutorialResponsePagination } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Tutoriales',
        href: '/dashboard/tutorials',
    },
];

interface TutorialsProps {
    tutorials: TutorialResponsePagination;
}

export default function Index({ tutorials }: TutorialsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Tutoriales" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">
                {/* Botón para nuevo tutorial */}
                <div className="px-4 md:px-6">
                    <Link className={buttonVariants({ variant: 'outline' })} href={route('tutorials.create')}>
                        <Plus /> Nuevo tutorial
                    </Link>
                </div>
                {/* Lista de tutoriales */}
                <div className="flex flex-wrap gap-4 px-4 lg:px-6">
                    {tutorials.data.map((tutorial: TutorialResponse) => {
                        return (
                            <Link key={tutorial.id} className="w-fit" href={route('tutorials.show', tutorial.id)}>
                                <Card className="h-full w-xs">
                                    <CardHeader>
                                        <img className="aspect-video object-contain" src={`/storage/${tutorial.image_url}`} alt={tutorial.title} />
                                    </CardHeader>
                                    <CardContent className="flex flex-wrap items-center gap-2">
                                        <CardTitle className="w-full text-xl">
                                            <h1 className="line-clamp-1 text-lg">{tutorial.title}</h1>
                                        </CardTitle>
                                        <CardDescription className="line-clamp-3">
                                            <div className="w-full" dangerouslySetInnerHTML={{ __html: tutorial.description }} />
                                        </CardDescription>
                                    </CardContent>
                                    <CardFooter className="mt-auto flex justify-end gap-4">
                                        <span className="text-muted-foreground font-semibold">{tutorial.tutorial_type.name}</span>
                                    </CardFooter>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
                {/* Paginación */}
                <AppPagination items={tutorials} />
            </div>
        </AppLayout>
    );
}
