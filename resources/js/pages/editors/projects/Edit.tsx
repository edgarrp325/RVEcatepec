import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Project } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import '@justinribeiro/lite-youtube';
import { FormEventHandler, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'sonner';

interface ProjectFormData {
    title: string;
    description: string;
    image: File | null;
    download_url: string;
    [key: string]: string | File | null;
}

interface EditProps {
    project: Project;
}

export default function Edit({ project }: EditProps) {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Proyectos',
            href: '/dashboard/projects',
        },
        {
            title: project.title,
            href: '/dashboard/projects/' + project.id,
        },
        {
            title: 'Editar',
            href: '/dashboard/projects/' + project.id + '/edit',
        },
    ];

    const [data, setData] = useState<ProjectFormData>({
        title: project.title,
        description: project.description,
        image: null,
        download_url: project.download_url,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { errors } = usePage().props;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(
            route('projects.update', project.id),
            {
                _method: 'put',
                ...data,
            },
            {
                onSuccess: () => {
                    toast.success('Proyecto actualizado exitosamente');
                },
                onError: () => {
                    toast.error('Error al actualizar el proyecto');
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Editar proyecto" />
            <div className="flex h-full flex-col items-center rounded-xl p-4">
                <form onSubmit={submit} className="my-4 w-full max-w-5xl space-y-6" encType="multipart/form-data">
                    <div className="grid gap-2">
                        <Label htmlFor="project_title">Título</Label>
                        <Input
                            id="project_title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            placeholder="Título del proyecto"
                        />
                        <InputError className="mt-2" message={errors.title} />
                    </div>
                    <div className="grid gap-4 pb-10 text-wrap">
                        <Label htmlFor="project_description">Descripción</Label>
                        <ReactQuill
                            id="project_description"
                            theme="snow"
                            value={data.description}
                            onChange={(value) => setData({ ...data, description: value })}
                            style={{ maxWidth: '64rem' }}
                        />
                        <InputError className="mt-10" message={errors.description} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="project_image">Imagen de vista previa</Label>
                        <img
                            src={imagePreview ? imagePreview : `/storage/${project.image_url}`}
                            alt="Vista previa de imagen del proyecto"
                            className="aspect-video w-3xl object-contain"
                        />
                        <Input
                            id="project_image"
                            type="file"
                            accept="image/*"
                            className="mt-1 block w-full"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setData({ ...data, image: e.target.files[0] });
                                    setImagePreview(URL.createObjectURL(e.target.files[0]));
                                }
                            }}
                        />
                        <InputError className="mt-2" message={errors.image} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="project_download_url">URL de descarga</Label>
                        <Input
                            id="project_download_url"
                            className="mt-1 block w-full"
                            value={data.download_url}
                            onChange={(e) => setData({ ...data, download_url: e.target.value })}
                            placeholder="URL de descarga del proyecto (Mega, Mediafire, Drive, etc...)"
                        />
                        <InputError className="mt-2" message={errors.download_url} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit">Actualizar</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
