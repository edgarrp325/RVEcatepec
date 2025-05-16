import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Format, ThreeDModelResponse } from '@/types';
import '@google/model-viewer';
import { Head, router, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

interface EditProps {
    model: ThreeDModelResponse;
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

export default function Edit({ model, formats }: EditProps) {
    const [data, setData] = useState<ModelFormData>({
        name: model.name,
        format_id: model.format_id,
        poligons: model.poligons,
        textures: model.textures,
        animations: model.animations,
        rigged: model.rigged,
        image: null,
        model_view: null,
        model_download: null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [modelPreview, setModelPreview] = useState<string | null>(null);
    const { errors } = usePage().props;

    const breadcrumb: BreadcrumbItem[] = [
        {
            title: 'Modelos 3D',
            href: '/dashboard/three-d-models',
        },
        {
            title: model.name,
            href: '/dashboard/three-d-models/' + model.id,
        },
        {
            title: 'Editar',
            href: '/dashboard/three-d-models/' + model.id + '/edit',
        },
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(
            route('three-d-models.update', model.id),
            {
                _method: 'put',
                ...data,
            },
            {
                onSuccess: () => {
                    toast.success('Modelo 3D actualizado correctamente');
                },
                onError: () => {
                    toast.error('Error al actualizar el modelo 3D');
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title={model.name} />
            <div className="flex h-full flex-col items-center rounded-xl p-4">
                <form onSubmit={submit} className="my-4 max-w-xl space-y-6" encType="multipart/form-data">
                    <div className="grid gap-2">
                        <Label htmlFor="model_name">Nombre</Label>
                        <Input
                            id="model_name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            placeholder="Nombre del modelo 3D"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="laboratories">Formato</Label>
                        <Select value={data.format_id.toString()} onValueChange={(value) => setData({ ...data, format_id: Number(value) })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona el formato del modelo" />
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
                        <Label htmlFor="model_poligons">Polígonos</Label>
                        <Input
                            id="model_poligons"
                            className="mt-1 block w-full"
                            pattern="\d*"
                            inputMode="numeric"
                            value={data.poligons}
                            onChange={(e) => setData({ ...data, poligons: Number(e.target.value) })}
                            required
                            onKeyDown={(e) => {
                                if (
                                    !/[0-9]/.test(e.key) &&
                                    e.key !== 'Backspace' &&
                                    e.key !== 'Delete' &&
                                    e.key !== 'ArrowLeft' &&
                                    e.key !== 'ArrowRight' &&
                                    e.key !== 'Tab'
                                ) {
                                    e.preventDefault();
                                }
                            }}
                            placeholder="Cantidad de polígonos del modelo"
                        />
                        <InputError className="mt-2" message={errors.poligons} />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="model_textures"
                                checked={data.textures}
                                onCheckedChange={(checked) => setData({ ...data, textures: Boolean(checked) })}
                            />
                            <Label htmlFor="model_textures">Texturas</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="model_animations"
                                checked={data.animations}
                                onCheckedChange={(checked) => setData({ ...data, animations: Boolean(checked) })}
                            />
                            <Label htmlFor="model_animations">Animaciones</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="model_rigged"
                                checked={data.rigged}
                                onCheckedChange={(checked) => setData({ ...data, rigged: Boolean(checked) })}
                            />
                            <Label htmlFor="model_rigged">Rigging</Label>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="model_image">Imagen de previsualización</Label>
                        <img
                            src={imagePreview ? imagePreview : `/storage/${model.img_url}`}
                            alt="Vista previa del modelo 3D"
                            className="aspect-video w-3xl object-contain"
                        />
                        <Input
                            id="model_image"
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
                        <Label htmlFor="model_model_viewer">Modelo para visualización</Label>
                        <model-viewer
                            src={modelPreview ? modelPreview : `/storage/${model.model_url}`}
                            auto-rotate
                            camera-controls
                            touch-actions="pan-x"
                            ar
                            shadow-intensity="1"
                            style={{ width: '100%', height: '600px' }}
                        />
                        <Input
                            id="model_model_viewer"
                            type="file"
                            accept=".glb"
                            className="mt-1 block w-full"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setData({ ...data, model_view: e.target.files[0] });
                                    setModelPreview(URL.createObjectURL(e.target.files[0]));
                                }
                            }}
                        />
                        <InputError className="mt-2" message={errors.model_view} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="model_download">Modelo para descargar</Label>
                        <Input
                            id="model_download"
                            type="file"
                            accept={data.format_id === 1 ? '.fbx' : '.obj'}
                            className="mt-1 block w-full"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setData({ ...data, model_download: e.target.files[0] });
                                }
                            }}
                        />
                        <InputError className="mt-2" message={errors.model_download} />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button type="submit">Actualizar</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
