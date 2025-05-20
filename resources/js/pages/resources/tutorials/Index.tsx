import AppPagination from '@/components/app-pagination';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppPublicLayout from '@/layouts/app-public-layout';
import { BreadcrumbItem, TutorialResponse, TutorialResponsePagination } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Repositorio',
        href: '/resources',
    },
    {
        title: 'Tutoriales',
        href: '/resources/tutorials',
    },
];

interface TutorialsProps {
    tutorials: TutorialResponsePagination;
}

export default function Index({ tutorials }: TutorialsProps) {
    return (
        <AppPublicLayout breadcrumbs={breadcrumb}>
            <Head title="Tutoriales" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">
                {/* Tutoriales */}
                <div className="flex flex-wrap gap-4 px-4 lg:px-6">
                    {tutorials.data.map((tutorial: TutorialResponse) => {
                        return (
                            <Link key={tutorial.id} className="w-fit" href={route('resources.tutorials.show', tutorial.id)}>
                                <Card className="h-full w-xs transition-all duration-300 hover:scale-105">
                                    <CardHeader className="">
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
                {/* Paginación  */}
                <AppPagination items={tutorials} />
            </div>
        </AppPublicLayout>
    );
}
