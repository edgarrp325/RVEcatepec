import AppLogoIcon from '@/components/app-logo-icon';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
    variant?: 'sm' | 'full';
}

export default function AuthSimpleLayout({ children, title, description, variant = 'sm' }: AuthLayoutProps) {
    const maxWidth = { sm: 'max-w-sm', full: 'max-w-[1920px]' };

    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className={cn('w-full', maxWidth[variant])}>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-16 w-16 items-center justify-center rounded-md">
                                <AppLogoIcon className="w-16 fill-current text-[var(--foreground)] dark:text-white" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-muted-foreground text-center text-sm">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
