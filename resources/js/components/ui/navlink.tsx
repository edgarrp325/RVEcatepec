import { InertiaLinkProps, Link } from '@inertiajs/react';

interface NavLinkProps extends InertiaLinkProps {
    active?: boolean;
    className?: string;
    children: React.ReactNode;
}

export function NavLink({ active = false, className = '', children, ...props }: NavLinkProps) {
    return (
        <Link
            {...props}
            className={`relative py-4 px-2 text-center lg:float-left lg:block lg:after:block lg:after:h-[3px] lg:after:w-full lg:after:origin-center lg:after:bg-[#679240] lg:after:transition lg:after:duration-500 lg:after:content-[""] ${active ? 'font-bold text-black lg:after:scale-x-100' : 'hover:text-black lg:after:scale-x-0 lg:hover:after:scale-x-100'} transition duration-200 ${className}`}
        >
            {children}
        </Link>
    );
}
