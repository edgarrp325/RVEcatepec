import { BreadcrumbItem, Tutorial } from '@/types';
import { Head } from '@inertiajs/react';
import 'react-quill-new/dist/quill.snow.css';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, getRelativeTime } from '@/lib/utils';
import '@justinribeiro/lite-youtube';
import dayjs from 'dayjs';

import AppPublicLayout from '@/layouts/app-public-layout';
import texts from '@/config/texts';

interface ShowProps {
    tutorial: Tutorial;
}

export default function Show({ tutorial }: ShowProps) {
    const breadcrumb: BreadcrumbItem[] = [
        {
            title: texts.resources.title,
            href: '/resources', 
        },
        {
            title: texts.resources.tutorials.title,
            href: '/resources/tutorials',
        },
        {
            title: tutorial.title,
            href: '/resources/tutorials/' + tutorial.id,
        },
    ];

    return (
        <AppPublicLayout breadcrumbs={breadcrumb}>
            <Head title={tutorial.title} />
            <div className="flex h-full flex-col items-center rounded-xl p-4">
                <div className="flex w-full flex-col items-center">
                    <div className="flex w-full justify-center">
                        <Card className="max-w-3xl">
                            <CardHeader>
                                <CardTitle className="w-11/12 text-xl">{tutorial.title}</CardTitle>
                                <CardDescription className="flex flex-wrap gap-x-2">
                                    <p>{cn('Published', getRelativeTime(tutorial.created_at))}</p>
                                    {!dayjs(tutorial.updated_at).isSame(tutorial.created_at) && (
                                        <p>{cn('Last update', getRelativeTime(tutorial.updated_at))}</p>
                                    )}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-8 p-6">
                                <div
                                    className="prose prose-p:m-0 prose-headings:first:mt-0 quill-content"
                                    dangerouslySetInnerHTML={{ __html: tutorial.description }}
                                />
                                {tutorial.tutorial_type_id === 1 ? (
                                    <lite-youtube
                                        className="flex aspect-video h-fit w-full items-center justify-center rounded-xl shadow-md"
                                        videoId={tutorial.embed_url}
                                    />
                                ) : (
                                    <embed
                                        className="mt-4 flex aspect-video h-fit w-full items-center justify-center rounded-xl object-cover shadow-md"
                                        src={`/storage/${tutorial.embed_url}`}
                                        type="application/pdf"
                                    ></embed>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppPublicLayout>
    );
}
