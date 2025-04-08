import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Format } from '@/types';
import '@google/model-viewer';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: '3D Models',
        href: '/three-d-models',
    },
    {
        title: 'Create',
        href: '/three-d-models/Create',
    },
];

interface CreateProps {
    formats: Format[];
}

interface ModelFormData {
    name: string;
    format_id: number;
    poligons: number;
    textures: boolean;
    animations: boolean;
    rigged: boolean;
    image: File | null;
    model_view: File | null;
    model_download: File | null;
    [key: string]: string | boolean | File | null | number;
}

export default function Create({ formats }: CreateProps) {
    const { data, setData, post, errors, processing } = useForm<ModelFormData>({
        name: '',
        format_id: 1,
        poligons: 0,
        textures: false,
        animations: false,
        rigged: false,
        image: null,
        model_view: null,
        model_download: null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [modelPreview, setModelPreview] = useState<string | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('three-d-models.store'), {
            onSuccess: () => {
                toast.success('3D Model created successfully');
            },
            onError: () => {
                toast.error('Error creating 3D Model');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title={'Create 3D Model'} />
            <div className="flex h-full flex-col items-center rounded-xl p-4">
                <form onSubmit={submit} className="my-4 max-w-xl space-y-6" encType="multipart/form-data">
                    <div className="grid gap-2">
                        <Label htmlFor="model_name">Name</Label>
                        <Input
                            id="model_name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="3D model name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="laboratories">Format</Label>
                        <Select value={data.format_id.toString()} onValueChange={(value) => setData('format_id', Number(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select the laboratory where the equipment is located" />
                            </SelectTrigger>
                            <SelectContent>
                                {formats.map((format) => (
                                    <SelectItem key={format.id} value={format.id.toString()}>
                                        {format.name.charAt(0).toUpperCase() + format.name.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="model_poligons">Poligons</Label>
                        <Input
                            id="model_poligons"
                            className="mt-1 block w-full"
                            pattern="\d*"
                            inputMode="numeric"
                            value={data.poligons}
                            onChange={(e) => setData('poligons', Number(e.target.value))}
                            required
                            onKeyDown={(e) => {
                                if (
                                    !/[0-9]/.test(e.key) && // Only numbers
                                    e.key !== 'Backspace' &&
                                    e.key !== 'Delete' &&
                                    e.key !== 'ArrowLeft' &&
                                    e.key !== 'ArrowRight' &&
                                    e.key !== 'Tab'
                                ) {
                                    e.preventDefault();
                                }
                            }}
                            placeholder="3D model poligons number"
                        />

                        <InputError className="mt-2" message={errors.poligons} />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="model_textures"
                                checked={data.textures}
                                onCheckedChange={(checked) => setData('textures', Boolean(checked))}
                            />
                            <Label htmlFor="model_textures">Textures</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="model_animations"
                                checked={data.animations}
                                onCheckedChange={(checked) => setData('animations', Boolean(checked))}
                            />
                            <Label htmlFor="model_animations">Animations</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="model_rigged" checked={data.rigged} onCheckedChange={(checked) => setData('rigged', Boolean(checked))} />
                            <Label htmlFor="model_rigged">Rigged</Label>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="model_image">Preview Image</Label>
                        {imagePreview && <img src={imagePreview} alt="3D Model Image Preview" className="aspect-video w-3xl object-contain" />}
                        <Input
                            id="model_image"
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
                        <Label htmlFor="model_view">Model to viewer</Label>
                        {modelPreview && (
                            <model-viewer
                                src={modelPreview}
                                auto-rotate
                                camera-controls
                                touch-actions="pan-x"
                                ar
                                shadow-intensity="1"
                                style={{ width: '100%', height: '600px' }}
                            />
                        )}
                        <Input
                            id="model_view"
                            type="file"
                            accept=".glb"
                            className="mt-1 block w-full"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setData('model_view', e.target.files[0]);
                                    setModelPreview(URL.createObjectURL(e.target.files[0]));
                                }
                            }}
                        />
                        <InputError className="mt-2" message={errors.model_view} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="model_download">Model to download</Label>
                        <Input
                            id="model_download"
                            type="file"
                            accept={data.format_id === 1 ? '.fbx' : '.obj'}
                            className="mt-1 block w-full"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setData('model_download', e.target.files[0]);
                                }
                            }}
                        />
                        <InputError className="mt-2" message={errors.model_download} />
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
