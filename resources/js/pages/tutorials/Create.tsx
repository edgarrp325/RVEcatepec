import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, TutorialType } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'sonner';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Tutorials',
        href: '/tutorials',
    },
    {
        title: 'Create',
        href: '/tutorials/Create',
    },
];

interface TutorialFormData {
    title: string;
    description: string;
    image: File | null;
    pdf: File | null;
    embed_url: string;
    tutorial_type_id: number;
    [key: string]: string | number | File | null;
}
interface CreateProps {
    tutorialTypes: TutorialType[];
}
export default function Create({ tutorialTypes }: CreateProps) {
    const { data, setData, post, errors, processing } = useForm<TutorialFormData>({
        title: '',
        description: '',
        image: null,
        pdf: null,
        embed_url: '',
        tutorial_type_id: 1,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('tutorials.store'), {
            onSuccess: () => {
                toast.success('Tutorial created successfully');
            },
            onError: () => {
                toast.error('Error creating tutorial');
            },
        });
    };

    console.log(data);

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Create tutorial" />
            <div className="flex h-full flex-col items-center rounded-xl p-4">
                <form onSubmit={submit} className="my-4 w-full max-w-5xl space-y-6" encType="multipart/form-data">
                    <div className="grid gap-2">
                        <Label htmlFor="tutorial_title">Title</Label>
                        <Input
                            id="tutorial_title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
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
                            onChange={(value) => setData('description', value)}
                            style={{ maxWidth: '64rem' }}
                        />
                        <InputError className="mt-10" message={errors.description} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="tutorial_image">Preview Image</Label>
                        {imagePreview && <img src={imagePreview} alt="Tutorial Image Preview" className="aspect-video w-3xl object-contain" />}
                        <Input
                            id="tutorial_image"
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
                        <Label htmlFor="laboratories">Tutorial Type</Label>
                        <Select value={data.tutorial_type_id.toString()} onValueChange={(value) => setData('tutorial_type_id', Number(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select the tutorial type" />
                            </SelectTrigger>
                            <SelectContent>
                                {tutorialTypes.map((tutorialType) => (
                                    <SelectItem key={tutorialType.id} value={tutorialType.id.toString()}>
                                        {tutorialType.name.charAt(0).toUpperCase() + tutorialType.name.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {data.tutorial_type_id === 2 && (
                        <div className="grid gap-2">
                            <Label htmlFor="tutorial_embed_url">File</Label>
                            <Input
                                id="tutorial_embed_url"
                                type="file"
                                accept="application/pdf"
                                className="mt-1 block w-full"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        setData('pdf', e.target.files[0]);
                                    }
                                }}
                            />
                            <InputError className="mt-2" message={errors.pdf} />
                        </div>
                    )}

                    {data.tutorial_type_id === 1 && (
                        <div className="grid gap-2">
                            <Label htmlFor="tutorial_embed_url">Embed URL</Label>
                            <Input
                                id="tutorial_embed_url"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.embed_url}
                                onChange={(e) => setData('embed_url', e.target.value)}
                                placeholder="Youtube Embed URL"
                            />
                            <InputError className="mt-2" message={errors.embed_url} />
                        </div>
                    )}

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
