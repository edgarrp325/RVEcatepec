import { ShineBorder } from '@/components/magicui/shine-border';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import AppPublicLayout from '@/layouts/app-public-layout';
import { BreadcrumbItem, Project, ProjectPagination } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Resources',
        href: '/resources',
    },
    {
        title: 'Projects',
        href: '/resources/projects',
    },
];
interface ProjectsProps {
    projects: ProjectPagination;
}

export default function Index({ projects }: ProjectsProps) {
    return (
        <AppPublicLayout breadcrumbs={breadcrumb}>
            <Head title="Projects" />
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
                <Pagination className="flex flex-col items-center gap-2">
                    <PaginationContent>
                        {projects.links.map((link) => {
                            return (
                                <PaginationItem key={link.label}>
                                    {link.label.includes('Previous') && link.url && <PaginationPrevious href={projects.prev_page_url || '#'} />}

                                    {link.label.includes('Next') && link.url && <PaginationNext href={projects.next_page_url || '#'} />}

                                    {!link.label.includes('Previous') && !link.label.includes('Next') && (
                                        <PaginationLink href={link.url || '#'} isActive={link.active}>
                                            {link.label}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            );
                        })}
                    </PaginationContent>
                    <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                        <span>
                            Page <strong>{projects.current_page}</strong> of <strong>{projects.last_page}</strong>
                        </span>
                        <span className="hidden sm:inline">|</span>
                        <span>
                            Showing <strong>{projects.from}</strong> - <strong>{projects.to}</strong> of <strong>{projects.total}</strong> items
                        </span>
                    </div>
                </Pagination>
            </div>
        </AppPublicLayout>
    );
}
