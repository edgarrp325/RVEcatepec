import { BreadcrumbItem, DevelopmentResponse } from '@/types';
import { Head } from '@inertiajs/react';
import 'react-quill-new/dist/quill.snow.css';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, getRelativeTime } from '@/lib/utils';
import dayjs from 'dayjs';

import Gallery from '@/components/ui/gallery';
import AppPublicLayout from '@/layouts/app-public-layout';

interface ShowProps {
    development: DevelopmentResponse;
}

export default function Show({ development }: ShowProps) {
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

    const images = development.images.map((image, index) => ({
        id: development.title + '-' + (index + 1),
        image: 'http://127.0.0.1:8000/storage/' + image.image_url,
        title: development.title + '-' + (index + 1),
    }));

    return (
        <AppPublicLayout breadcrumbs={breadcrumb}>
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
                        </Card>
                    </div>
                </div>
            </div>
        </AppPublicLayout>
    );
}
