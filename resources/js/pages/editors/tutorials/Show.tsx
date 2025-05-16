import { Button, buttonVariants } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Tutorial } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'sonner';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, getRelativeTime } from '@/lib/utils';
import '@justinribeiro/lite-youtube';
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
    tutorial: Tutorial;
}

export default function Show({ tutorial }: ShowProps) {
    const { delete: destroy, processing } = useForm({});

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Tutoriales',
            href: '/dashboard/tutorials',
        },
        {
            title: tutorial.title,
            href: '/dashboard/tutorials/' + tutorial.id,
        },
    ];

    const deleteTutorial = () => {
        destroy(route('tutorials.destroy', tutorial.id), {
            onSuccess: () => {
                toast.success('Tutorial eliminado correctamente');
            },
            onError: () => {
                toast.error('Error al eliminar el tutorial');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title={tutorial.title} />
            <div className="flex h-full flex-col items-center rounded-xl p-4">
                <div className="flex w-full flex-col items-center">
                    <div className="flex w-full justify-center">
                        <Card className="max-w-3xl">
                            <CardHeader className="relative">
                                <CardTitle className="w-11/12 text-xl">{tutorial.title}</CardTitle>
                                <CardDescription className="flex flex-wrap gap-x-2">
                                    <p>{cn('Publicado', getRelativeTime(tutorial.created_at))}</p>
                                    {!dayjs(tutorial.updated_at).isSame(tutorial.created_at) && (
                                        <p>{cn('Última actualización', getRelativeTime(tutorial.updated_at))}</p>
                                    )}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-8 p-6">
                                <div
                                    className="prose prose-p:m-0 prose-headings:first:mt-0 quill-content"
                                    dangerouslySetInnerHTML={{ __html: tutorial.description }}
                                />
                                {tutorial.tutorial_type_id === 1 ? (
                                    <lite-youtube
                                        className="flex aspect-video h-fit w-full items-center justify-center rounded-xl shadow-md"
                                        videoId={tutorial.embed_url}
                                    />
                                ) : (
                                    <embed
                                        className="mt-4 flex aspect-video h-fit w-full items-center justify-center rounded-xl object-cover shadow-md"
                                        src={`/storage/${tutorial.embed_url}`}
                                        type="application/pdf"
                                    ></embed>
                                )}
                            </CardContent>

                            <CardFooter className="flex gap-2">
                                <Link className={buttonVariants({ variant: 'outline' })} href={route('tutorials.edit', tutorial.id)}>
                                    Editar
                                </Link>
                                <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                                    Eliminar
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Diálogo de confirmación para eliminar el tutorial */}
                        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>¿Estás seguro de eliminar este tutorial?</AlertDialogTitle>
                                    <AlertDialogDescription>Esta acción eliminará el tutorial de forma permanente.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={deleteTutorial} disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Eliminar
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
