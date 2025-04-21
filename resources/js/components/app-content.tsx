import { SidebarInset } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface AppContentProps extends React.ComponentProps<'div'> {
    variant?: 'header' | 'sidebar' | 'public';
}

export function AppContent({ variant = 'header', children, ...props }: AppContentProps) {
    if (variant === 'sidebar') {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }

    return (
        <main
            className={cn('mx-auto flex h-full w-full flex-1 flex-col gap-4 rounded-xl', variant === 'public' ? 'max-w-[1920px]' : 'max-w-7xl')}
            {...props}
        >
            {children}
        </main>
    );
}
