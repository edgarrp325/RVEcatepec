import AppPagination from '@/components/app-pagination';
import { ShineBorder } from '@/components/magicui/shine-border';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import texts from '@/config/texts';
import AppPublicLayout from '@/layouts/app-public-layout';
import { BreadcrumbItem, Project, ProjectPagination } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: texts.resources.title,
        href: '/resources',
    },
    {
        title: texts.resources.projects.title,
        href: '/resources/projects',
    },
];
interface ProjectsProps {
    projects: ProjectPagination;
}

export default function Index({ projects }: ProjectsProps) {
    return (
        <AppPublicLayout breadcrumbs={breadcrumb}>
            <Head title={texts.resources.projects.title}/>
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">
                {/* Projects */}
                <div className="flex flex-wrap gap-4 px-4 lg:px-6">
                    {projects.data.map((project: Project) => {
                        return (
                            <Link key={project.id} className="w-fit" href={route('resources.projects.show', project.id)}>
                                <Card className="relative h-full w-xs transition-all duration-300 hover:scale-105">
                                    <ShineBorder shineColor={['#679240', '#C3A701']} borderWidth={1} />
                                    <CardHeader className="">
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
                {/* Pagination  */}
                <AppPagination items={projects} />
            </div>
        </AppPublicLayout>
    );
}
