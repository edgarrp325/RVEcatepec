import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'sonner';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Desarrollos',
        href: '/developments',
    },
    {
        title: 'Crear',
        href: '/developments/Create',
    },
];

interface DevelopmentFormData {
    title: string;
    description: string;
    images: File[] | [];
    [key: string]: string | File[];
}

export default function Create() {
    const { data, setData, post, errors, processing } = useForm<DevelopmentFormData>({
        title: '',
        description: '',
        images: [],
    });

    const [imagesPreview, setImagesPreview] = useState<string[] | []>([]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('developments.store'), {
            onSuccess: () => {
                toast.success('Desarrollo creado exitosamente');
            },
            onError: () => {
                toast.error('Error al crear el desarrollo');
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const sortedFiles = Array.from(e.target.files).sort((a, b) => a.name.localeCompare(b.name));

            setData('images', sortedFiles);
            setImagesPreview(sortedFiles.map((file) => URL.createObjectURL(file)));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Crear desarrollo" />
            <div className="flex h-full flex-col items-center rounded-xl p-4">
                <form onSubmit={submit} className="my-4 w-full max-w-5xl space-y-6" encType="multipart/form-data">
                    <div className="grid gap-2">
                        <Label htmlFor="development_title">Título</Label>
                        <Input
                            id="development_title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Título del desarrollo"
                        />
                        <InputError className="mt-2" message={errors.title} />
                    </div>

                    <div className="grid gap-4 pb-10 text-wrap">
                        <Label htmlFor="development__description">Descripción</Label>
                        <ReactQuill
                            id="development__description"
                            theme="snow"
                            value={data.description}
                            onChange={(value) => setData('description', value)}
                            style={{ maxWidth: '64rem' }}
                        />
                        <InputError className="mt-10" message={errors.description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="development_images">Imágenes</Label>
                        <section className="flex flex-wrap items-center gap-2">
                            {imagesPreview &&
                                imagesPreview.length > 0 &&
                                imagesPreview.map((image, i) => (
                                    <img
                                        key={i}
                                        src={image}
                                        alt="Vista previa de imagen del desarrollo"
                                        className="aspect-video w-xs border-2 object-contain"
                                    />
                                ))}
                        </section>
                        <Input
                            id="development_images"
                            type="file"
                            accept="image/*"
                            multiple
                            className="mt-1 block w-full"
                            onChange={handleFileChange}
                        />
                        <small className="text-muted-foreground">Formatos permitidos: webp, jpeg, png, jpg, gif, svg</small>
                        <InputError className="mt-2" message={errors.images} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Crear
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
