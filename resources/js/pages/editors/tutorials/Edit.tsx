import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Tutorial } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import '@justinribeiro/lite-youtube';
import { FormEventHandler, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'sonner';

interface TutorialFormData {
    title: string;
    description: string;
    image: File | null;
    pdf: File | null;
    embed_url: string;
    tutorial_type_id: number;
    [key: string]: string | number | File | null;
}
interface EditProps {
    tutorial: Tutorial;
}
export default function Create({ tutorial }: EditProps) {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Tutorials',
            href: '/dashboard/tutorials',
        },
        {
            title: tutorial.title,
            href: '/dashboard/tutorials/' + tutorial.id,
        },
        {
            title: 'Edit',
            href: '/dashboard/tutorials/' + tutorial.id + '/edit',
        },
    ];

    const [data, setData] = useState<TutorialFormData>({
        title: tutorial.title,
        description: tutorial.description,
        image: null,
        pdf: null,
        embed_url: tutorial.embed_url,
        tutorial_type_id: tutorial.tutorial_type_id,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [pdfPreview, setPdfPreview] = useState<string | null>(null);
    const { errors } = usePage().props;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(
            route('tutorials.update', tutorial.id),
            {
                _method: 'put',
                ...data,
            },
            {
                onSuccess: () => {
                    toast.success('Tutorial updated successfully');
                },
                onError: () => {
                    toast.error('Error updating tutorial');
                },
            },
        );
    };

    console.log(data);

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Edit tutorial" />
            <div className="flex h-full flex-col items-center rounded-xl p-4">
                <form onSubmit={submit} className="my-4 w-full max-w-5xl space-y-6" encType="multipart/form-data">
                    <div className="grid gap-2">
                        <Label htmlFor="tutorial_title">Title</Label>
                        <Input
                            id="tutorial_title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            placeholder="Tutorial title"
                        />
                        <InputError className="mt-2" message={errors.title} />
                    </div>
                    <div className="grid gap-4 pb-10 text-wrap">
                        <Label htmlFor="tutorial_description">Description</Label>
                        <ReactQuill
                            id="tutorial_description"
                            theme="snow"
                            value={data.description}
                            onChange={(value) => setData({ ...data, description: value })}
                            style={{ maxWidth: '64rem' }}
                        />
                        <InputError className="mt-10" message={errors.description} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="tutorial_image">Preview Image</Label>
                        <img
                            src={imagePreview ? imagePreview : `/storage/${tutorial.image_url}`}
                            alt="3D Model Image Preview"
                            className="aspect-video w-3xl object-contain"
                        />{' '}
                        <Input
                            id="tutorial_image"
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

                    {data.tutorial_type_id === 2 && (
                        <div className="grid gap-2">
                            <Label htmlFor="tutorial_embed_url">File</Label>
                            <embed
                                className="mt-4 flex aspect-video w-11/12 items-center justify-center"
                                src={pdfPreview ? pdfPreview : `/storage/${data.embed_url}`}
                                type="application/pdf"
                            ></embed>
                            <Input
                                id="tutorial_embed_url"
                                type="file"
                                accept="application/pdf"
                                className="mt-1 block w-full"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        setData({ ...data, pdf: e.target.files[0] });
                                        setPdfPreview(URL.createObjectURL(e.target.files[0]));
                                    }
                                }}
                            />
                            <InputError className="mt-2" message={errors.pdf} />
                        </div>
                    )}

                    {data.tutorial_type_id === 1 && (
                        <div className="grid gap-2">
                            <Label htmlFor="tutorial_embed_url">Embed URL</Label>
                            <lite-youtube className="mt-4 flex aspect-video w-full items-center justify-center md:w-9/12" videoId={data.embed_url} />
                            <Input
                                id="tutorial_embed_url"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.embed_url}
                                onChange={(e) => setData({ ...data, embed_url: e.target.value })}
                                placeholder="Youtube Embed URL"
                            />
                            <InputError className="mt-2" message={errors.embed_url} />
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button type="submit">Update</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
