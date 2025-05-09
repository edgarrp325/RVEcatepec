import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import texts from '@/config/texts';
import { Pagination as PaginationType } from '@/types';

interface AppPaginationProps {
    items: PaginationType;
}

export default function AppPagination({ items }: AppPaginationProps) {
    return (
        <Pagination className="flex flex-col items-center gap-2">
            <PaginationContent>
                {items.links.map((link) => {
                    return (
                        <PaginationItem key={link.label}>
                            {link.label.includes('Anterior') && link.url && <PaginationPrevious href={items.prev_page_url || '#'} />}

                            {link.label.includes('Siguiente') && link.url && <PaginationNext href={items.next_page_url || '#'} />}

                            {!link.label.includes('Anterior') && !link.label.includes('Siguiente') && (
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
                    {texts.pagination.page} <strong>{items.current_page}</strong> {texts.common.of} <strong>{items.last_page}</strong>
                </span>
                <span className="hidden sm:inline">|</span>
                <span>
                    {texts.pagination.showing} <strong>{items.from}</strong> - <strong>{items.to}</strong> {texts.common.of}{' '}
                    <strong>{items.total}</strong> {texts.pagination.items}
                </span>
            </div>
        </Pagination>
    );
}
