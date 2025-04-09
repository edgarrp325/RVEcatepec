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
        title: 'Projects',
        href: '/projects',
    },
    {
        title: 'Create',
        href: '/projects/Create',
    },
];

interface ProjectFormData {
    title: string;
    description: string;
    image: File | null;
    download_url: string;
    [key: string]: string | File | null;
}

export default function Create() {
    const { data, setData, post, errors, processing } = useForm<ProjectFormData>({
        title: '',
        description: '',
        image: null,
        download_url: '',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('projects.store'), {
            onSuccess: () => {
                toast.success('Project created successfully');
            },
            onError: () => {
                toast.error('Error creating project');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Create project" />
            <div className="flex h-full flex-col items-center rounded-xl p-4">
                <form onSubmit={submit} className="my-4 w-full max-w-5xl space-y-6" encType="multipart/form-data">
                    <div className="grid gap-2">
                        <Label htmlFor="project_title">Title</Label>
                        <Input
                            id="project_title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Project title"
                        />
                        <InputError className="mt-2" message={errors.title} />
                    </div>
                    <div className="grid gap-4 pb-10 text-wrap">
                        <Label htmlFor="project_description">Description</Label>
                        <ReactQuill
                            id="project_description"
                            theme="snow"
                            value={data.description}
                            onChange={(value) => setData('description', value)}
                            style={{ maxWidth: '64rem' }}
                        />
                        <InputError className="mt-10" message={errors.description} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="project_image">Preview Image</Label>
                        {imagePreview && <img src={imagePreview} alt="Project Image Preview" className="aspect-video w-3xl object-contain" />}
                        <Input
                            id="project_image"
                            type="file"
                            accept="image/*"
                            className="mt-1 block w-full"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setData('image', e.target.files[0]);
                                    setImagePreview(URL.createObjectURL(e.target.files[0]));
                                }
                            }}
                        />
                        <InputError className="mt-2" message={errors.image} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="project_download_url">Download URL</Label>
                        <Input
                            id="project_download_url"
                            className="mt-1 block w-full"
                            value={data.download_url}
                            onChange={(e) => setData('download_url', e.target.value)}
                            placeholder="Project download url (Mega, Mediafire, Drive, etc...)"
                        />
                        <InputError className="mt-2" message={errors.download_url} />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Create
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
