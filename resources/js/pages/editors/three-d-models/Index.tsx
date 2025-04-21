import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { cn, getCompactNumber } from '@/lib/utils';
import { BreadcrumbItem, ThreeDModelResponse, ThreeDModelResponsePagination } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: '3D Models',
        href: '/dashboard/three-d-models',
    },
];
interface ThreeDModelsProps {
    models: ThreeDModelResponsePagination;
}

export default function Index({ models }: ThreeDModelsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="3D Models" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">
                {/* New 3D model button  */}
                <div className="px-4 md:px-6">
                    <Link className={buttonVariants({ variant: 'outline' })} href={route('three-d-models.create')}>
                        <Plus /> New 3D Model
                    </Link>
                </div>
                {/* 3D models  */}
                <div className="flex flex-wrap gap-4 px-4 lg:px-6">
                    {models.data.map((model: ThreeDModelResponse) => {
                        return (
                            <Link key={model.id} className="w-fit" href={route('three-d-models.show', model.id)}>
                                <Card className="h-full w-xs">
                                    <CardHeader className="">
                                        <img className="aspect-video object-contain" src={`/storage/${model.img_url}`} alt={model.name} />
                                        <CardDescription> {cn('Poligons:', getCompactNumber(model.poligons))}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-wrap items-center gap-2">
                                        {model.textures && <Badge>Textured</Badge>}
                                        {model.animations && <Badge>Animated</Badge>}
                                        {model.rigged && <Badge>Rigged</Badge>}
                                    </CardContent>
                                    <CardFooter className="mt-auto flex justify-between gap-4">
                                        <CardTitle className="text-xl">
                                            <h1 className="line-clamp-1 text-lg">{model.name}</h1>
                                        </CardTitle>
                                        <span className="text-muted-foreground font-semibold">{model.format.name}</span>
                                    </CardFooter>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
                {/* Pagination  */}
                <Pagination className="flex flex-col items-center gap-2">
                    <PaginationContent>
                        {models.links.map((link) => {
                            return (
                                <PaginationItem key={link.label}>
                                    {link.label.includes('Previous') && link.url && <PaginationPrevious href={models.prev_page_url || '#'} />}

                                    {link.label.includes('Next') && link.url && <PaginationNext href={models.next_page_url || '#'} />}

                                    {!link.label.includes('Previous') && !link.label.includes('Next') && (
                                        <PaginationLink href={link.url || '#'} isActive={link.active}>
                                            {link.label}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            );
                        })}
                    </PaginationContent>
                    <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                        <span>
                            Page <strong>{models.current_page}</strong> of <strong>{models.last_page}</strong>
                        </span>
                        <span className="hidden sm:inline">|</span>
                        <span>
                            Showing <strong>{models.from}</strong> - <strong>{models.to}</strong> of <strong>{models.total}</strong> items
                        </span>
                    </div>
                </Pagination>
            </div>
        </AppLayout>
    );
}
