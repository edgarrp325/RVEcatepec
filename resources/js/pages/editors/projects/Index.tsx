import AppPagination from '@/components/app-pagination';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Project, ProjectPagination } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Proyectos',
        href: '/dashboard/projects',
    },
];

interface ProjectsProps {
    projects: ProjectPagination;
}

export default function Index({ projects }: ProjectsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Proyectos" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">
                {/* Botón para nuevo proyecto */}
                <div className="px-4 md:px-6">
                    <Link className={buttonVariants({ variant: 'outline' })} href={route('projects.create')}>
                        <Plus /> Nuevo proyecto
                    </Link>
                </div>

                {/* Lista de proyectos */}
                <div className="flex flex-wrap gap-4 px-4 lg:px-6">
                    {projects.data.map((project: Project) => {
                        return (
                            <Link key={project.id} className="w-fit" href={route('projects.show', project.id)}>
                                <Card className="h-full w-xs">
                                    <CardHeader>
                                        <img className="aspect-video object-contain" src={`/storage/${project.image_url}`} alt={project.title} />
                                    </CardHeader>
                                    <CardContent className="flex flex-wrap items-center gap-2">
                                        <CardTitle className="w-full text-xl">
                                            <h1 className="line-clamp-1 text-lg">{project.title}</h1>
                                        </CardTitle>
                                        <CardDescription className="line-clamp-3">
                                            <div className="w-full" dangerouslySetInnerHTML={{ __html: project.description }} />
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                {/* Paginación */}
                <AppPagination items={projects} />
            </div>
        </AppLayout>
    );
}
