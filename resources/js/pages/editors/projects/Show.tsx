import { Button, buttonVariants } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Project } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowUpRight, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'sonner';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, getRelativeTime } from '@/lib/utils';
import dayjs from 'dayjs';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ShowProps {
    project: Project;
}

export default function Show({ project }: ShowProps) {
    const { delete: destroy, processing } = useForm({});

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Projects',
            href: '/dashboard/projects',
        },
        {
            title: project.title,
            href: '/dashboard/tutorials/' + project.id,
        },
    ];

    const deleteProject = () => {
        destroy(route('projects.destroy', project.id), {
            onSuccess: () => {
                toast.success('Project deleted successfully');
            },
            onError: () => {
                toast.error('Error deleting project');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title={project.title} />
            <div className="flex h-full flex-col items-center rounded-xl p-4">
                <div className="flex w-full flex-col items-center">
                    <div className="flex w-full justify-center">
                        <Card className="max-w-3xl">
                            <CardHeader className="relative">
                                <CardTitle className="w-11/12 text-xl">{project.title}</CardTitle>
                                <CardDescription className="flex flex-wrap gap-x-2">
                                    <p>{cn('Published', getRelativeTime(project.created_at))}</p>
                                    {!dayjs(project.updated_at).isSame(project.created_at) && (
                                        <p>{cn('Last update', getRelativeTime(project.updated_at))}</p>
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
                                <div className="flex gap-2">
                                    <Link className={buttonVariants({ variant: 'outline' })} href={route('projects.edit', project.id)}>
                                        Edit
                                    </Link>
                                    <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                                        Delete
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>

                        {/* Alert dialog to delete project  */}
                        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure to delete this project?</AlertDialogTitle>
                                    <AlertDialogDescription>This will permanently delete this project</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={deleteProject} disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
