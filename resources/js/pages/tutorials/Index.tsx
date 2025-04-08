import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, TutorialResponse, TutorialResponsePagination } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Tutorials',
        href: '/tutorials',
    },
];
interface TutorialsProps {
    tutorials: TutorialResponsePagination;
}

export default function Index({ tutorials }: TutorialsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Tutorials" />
            <div className="flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4">
                {/* New 3D tutorial button  */}
                <div className="px-4 md:px-6">
                    <Link className={buttonVariants({ variant: 'outline' })} href={route('tutorials.create')}>
                        <Plus /> New tutorial
                    </Link>
                </div>
                {/* Tutorials */}
                <div className="flex flex-wrap gap-4 px-4 lg:px-6">
                    {tutorials.data.map((tutorial: TutorialResponse) => {
                        return (
                            <Link key={tutorial.id} className="w-fit" href={route('tutorials.show', tutorial.id)}>
                                <Card className="h-full w-xs">
                                    <CardHeader className="">
                                        <img className="aspect-video object-contain" src={`/storage/${tutorial.image_url}`} alt={tutorial.title} />
                                    </CardHeader>
                                    <CardContent className="flex flex-wrap items-center gap-2">
                                        <CardTitle className="w-full text-xl">
                                            <h1 className="line-clamp-1 text-lg">{tutorial.title}</h1>
                                        </CardTitle>
                                        <CardDescription className="line-clamp-3">
                                            <div className="w-full" dangerouslySetInnerHTML={{ __html: tutorial.description }} />
                                        </CardDescription>
                                    </CardContent>
                                    <CardFooter className="mt-auto flex justify-end gap-4">
                                        <span className="text-muted-foreground font-semibold">{tutorial.tutorial_type.name}</span>
                                    </CardFooter>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
                {/* Pagination  */}
                <Pagination className="flex flex-col items-center gap-2">
                    <PaginationContent>
                        {tutorials.links.map((link) => {
                            return (
                                <PaginationItem key={link.label}>
                                    {link.label.includes('Previous') && link.url && <PaginationPrevious href={tutorials.prev_page_url || '#'} />}

                                    {link.label.includes('Next') && link.url && <PaginationNext href={tutorials.next_page_url || '#'} />}

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
                            Page <strong>{tutorials.current_page}</strong> of <strong>{tutorials.last_page}</strong>
                        </span>
                        <span className="hidden sm:inline">|</span>
                        <span>
                            Showing <strong>{tutorials.from}</strong> - <strong>{tutorials.to}</strong> of <strong>{tutorials.total}</strong> items
                        </span>
                    </div>
                </Pagination>
            </div>
        </AppLayout>
    );
}
