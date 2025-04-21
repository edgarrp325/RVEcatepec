import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DevelopmentResponse } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
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
import Gallery from '@/components/ui/gallery';

interface ShowProps {
    development: DevelopmentResponse;
}

export default function Show({ development }: ShowProps) {
    const { delete: destroy, processing } = useForm({});

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Developments',
            href: '/developments',
        },
        {
            title: development.title,
            href: '/developments/' + development.id,
        },
    ];

    const deleteProject = () => {
        destroy(route('developments.destroy', development.id), {
            onSuccess: () => {
                toast.success('Development deleted successfully');
            },
            onError: () => {
                toast.error('Error deleting development');
            },
        });
    };

    const images = development.images.map((image, index) => ({
        id: development.title + '-' + (index + 1),
        image: 'http://127.0.0.1:8000/storage/' + image.image_url,
        title: development.title + '-' + (index + 1),
    }));
    console.log(images);

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title={development.title} />
            <div className="flex h-full flex-col items-center rounded-xl p-4">
                <div className="flex w-full flex-col items-center">
                    <div className="flex w-full justify-center">
                        <Card className="w-full lg:max-w-3xl">
                            <CardHeader className="relative">
                                <CardTitle className="w-11/12 text-xl">{development.title}</CardTitle>
                                <CardDescription className="flex flex-wrap gap-x-2">
                                    <p>{cn('Published', getRelativeTime(development.created_at))}</p>
                                    {!dayjs(development.updated_at).isSame(development.created_at) && (
                                        <p>{cn('Last update', getRelativeTime(development.updated_at))}</p>
                                    )}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-8 p-6">
                                {/* Description */}
                                <div className="prose prose-p:m-0 prose-headings:first:mt-0 quill-content">
                                    <div dangerouslySetInnerHTML={{ __html: development.description }} />
                                </div>

                                {/* Gallery */}
                                <Gallery items={images} onlyImage />
                            </CardContent>

                            <CardFooter className="flex justify-between">
                                <div className="flex gap-2">
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
                                    <AlertDialogTitle>Are you sure to delete this development?</AlertDialogTitle>
                                    <AlertDialogDescription>This will permanently delete this development</AlertDialogDescription>
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
