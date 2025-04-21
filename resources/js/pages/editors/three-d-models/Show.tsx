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
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { cn, downloadFile, getCompactNumber, getRelativeTime } from '@/lib/utils';
import { BreadcrumbItem, ThreeDModelResponse } from '@/types';
import '@google/model-viewer';
import { Head, Link, useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ShowProps {
    model: ThreeDModelResponse;
}

export default function Show({ model }: ShowProps) {
    const { delete: destroy, processing } = useForm({});
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: '3D Models',
            href: '/dashboard/three-d-models',
        },
        {
            title: model.name,
            href: '/dashboard/three-d-models/' + model.id,
        },
    ];

    const deleteModel = () => {
        destroy(route('three-d-models.destroy', model.id), {
            onSuccess: () => {
                toast.success('3D Model deleted successfully');
            },
            onError: () => {
                toast.error('Error deleting 3D Model');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title={model.name} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full flex-col items-center">
                    <model-viewer
                        src={`/storage/${model.model_url}`}
                        auto-rotate
                        camera-controls
                        touch-actions="pan-x"
                        ar
                        shadow-intensity="1"
                        style={{ width: '100%', height: '60dvh' }}
                    />

                    <div className="w-full max-w-2xl">
                        <Card>
                            <CardHeader className="relative">
                                <CardTitle className="w-11/12 text-xl">{model.name}</CardTitle>
                                <CardDescription className="flex flex-wrap gap-x-2">
                                    <p>{cn('Published', getRelativeTime(model.created_at))}</p>
                                    {!dayjs(model.updated_at).isSame(model.created_at) && (
                                        <p>{cn('Last update', getRelativeTime(model.updated_at))}</p>
                                    )}
                                </CardDescription>
                                <div className="absolute top-0 right-4 h-fit w-fit">
                                    <span className="text-muted-foreground font-semibold">{model.format.name}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-wrap items-center justify-between">
                                <div className="flex gap-2 py-2">
                                    {model.textures && <Badge>Textured</Badge>}
                                    {model.animations && <Badge>Animated</Badge>}
                                    {model.rigged && <Badge>Rigged</Badge>}
                                </div>
                                <p className="text-muted-foreground text-lg tabular-nums @[250px]/card:text-sm">
                                    {cn('Poligons:', getCompactNumber(model.poligons))}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button
                                    onClick={() => {
                                        downloadFile(`/storage/${model.download_url}`);
                                        toast.info('Your download will start automatically.');
                                    }}
                                >
                                    Download
                                </Button>
                                <div className="flex gap-2">
                                    <Link className={buttonVariants({ variant: 'outline' })} href={route('three-d-models.edit', model.id)}>
                                        Edit
                                    </Link>
                                    <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                                        Delete
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                        {/* Alert dialog to delete model  */}
                        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure to delete this 3D model?</AlertDialogTitle>
                                    <AlertDialogDescription>This will permanently delete this 3D model</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={deleteModel} disabled={processing}>
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
