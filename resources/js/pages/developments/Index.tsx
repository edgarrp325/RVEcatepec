<<<<<<< HEAD
import { ShineBorder } from '@/components/magicui/shine-border';
=======
>>>>>>> 6e638b3bc009e73d49281a535afa6f261d803951
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import AppPublicLayout from '@/layouts/app-public-layout';
import { BreadcrumbItem, DevelopmentPagination, DevelopmentResponse } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Developments',
        href: '/developments',
    },
];
interface DevelopmentsProps {
    developments: DevelopmentPagination;
}

export default function Index({ developments }: DevelopmentsProps) {
    return (
        <AppPublicLayout breadcrumbs={breadcrumb}>
            <Head title="Developments" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">
                {/* Developments */}
                <div className="flex flex-wrap gap-4 px-4 lg:px-6">
                    {developments.data.map((development: DevelopmentResponse) => {
                        return (
                            <Link key={development.id} className="w-fit" href={route('public.developments.show', development.id)}>
<<<<<<< HEAD
                                <Card className="relative h-full w-xs transition-all duration-300 hover:scale-105">
                                    <ShineBorder shineColor={['#679240', '#C3A701']} borderWidth={1} />

=======
                                <Card className="h-full w-xs">
>>>>>>> 6e638b3bc009e73d49281a535afa6f261d803951
                                    <CardHeader className="">
                                        <img
                                            className="aspect-video object-contain"
                                            src={`/storage/${development.images[0].image_url}`}
                                            alt={development.title}
                                        />
                                    </CardHeader>
                                    <CardContent className="flex flex-wrap items-center gap-2">
                                        <CardTitle className="w-full text-xl">
                                            <h1 className="line-clamp-1 text-lg">{development.title}</h1>
                                        </CardTitle>
                                        <CardDescription className="line-clamp-3">
                                            <div className="w-full" dangerouslySetInnerHTML={{ __html: development.description }} />
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
                {/* Pagination  */}
                <Pagination className="flex flex-col items-center gap-2">
                    <PaginationContent>
                        {developments.links.map((link) => {
                            return (
                                <PaginationItem key={link.label}>
                                    {link.label.includes('Previous') && link.url && <PaginationPrevious href={developments.prev_page_url || '#'} />}

                                    {link.label.includes('Next') && link.url && <PaginationNext href={developments.next_page_url || '#'} />}

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
                            Page <strong>{developments.current_page}</strong> of <strong>{developments.last_page}</strong>
                        </span>
                        <span className="hidden sm:inline">|</span>
                        <span>
                            Showing <strong>{developments.from}</strong> - <strong>{developments.to}</strong> of <strong>{developments.total}</strong>{' '}
                            items
                        </span>
                    </div>
                </Pagination>
            </div>
        </AppPublicLayout>
    );
}
