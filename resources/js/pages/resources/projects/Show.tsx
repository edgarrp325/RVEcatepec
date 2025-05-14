import { buttonVariants } from '@/components/ui/button';
import { BreadcrumbItem, Project } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import 'react-quill-new/dist/quill.snow.css';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, getRelativeTime } from '@/lib/utils';
import dayjs from 'dayjs';

import AppPublicLayout from '@/layouts/app-public-layout';

interface ShowProps {
    project: Project;
}

export default function Show({ project }: ShowProps) {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Recursos',
            href: '/resources',
        },
        {
            title: 'Proyectos',
            href: '/resources/projects',
        },
        {
            title: project.title,
            href: '/resources/projects/' + project.id,
        },
    ];

    return (
        <AppPublicLayout breadcrumbs={breadcrumb}>
            <Head title={project.title} />
            <div className="flex h-full flex-col items-center rounded-xl p-4">
                <div className="flex w-full flex-col items-center">
                    <div className="flex w-full justify-center">
                        <Card className="max-w-3xl">
                            <CardHeader className="relative">
                                <CardTitle className="w-11/12 text-xl">{project.title}</CardTitle>
                                <CardDescription className="flex flex-wrap gap-x-2">
                                    <p>{cn('Publicado', getRelativeTime(project.created_at))}</p>
                                    {!dayjs(project.updated_at).isSame(project.created_at) && (
                                        <p>{cn('Última actualización', getRelativeTime(project.updated_at))}</p>
                                    )}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-8 p-6">
                                {/* Description */}
                                <div className="prose prose-p:m-0 prose-headings:first:mt-0 quill-content">
                                    <div dangerouslySetInnerHTML={{ __html: project.description }} />
                                </div>

                                {/* Image */}
                                <div className="flex w-full items-center justify-center">
                                    <img
                                        src={`/storage/${project.image_url}`}
                                        alt={project.title}
                                        className="aspect-video w-full rounded-xl object-cover shadow-md"
                                    />
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-between">
                                <a
                                    href={project.download_url}
                                    className={buttonVariants({ variant: 'default' })}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Github <ArrowUpRight className="ml-2" />
                                </a>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </AppPublicLayout>
    );
}
