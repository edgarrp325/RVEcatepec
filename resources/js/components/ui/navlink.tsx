import { InertiaLinkProps, Link } from "@inertiajs/react";

interface NavLinkProps extends InertiaLinkProps {
    active?: boolean;
    className?: string;
    children: React.ReactNode;
}

export function NavLink({ active = false, className = "", children, ...props }: NavLinkProps) {
    return (
        <Link
            {...props}
            className={
                'p-2 text-center lg:float-left lg:block lg:after:block lg:after:content-[""] lg:after:h-[3px] lg:after:bg-green-600 lg:after:w-full ' +
                (active
                    ? 'bg-green-600 text-white font-bold lg:bg-transparent lg:text-black '
                    : 'hover:bg-green-600 hover:text-white lg:hover:bg-transparent lg:hover:text-black lg:after:scale-x-0 lg:after:hover:scale-x-100 lg:after:transition lg:after:duration-500 lg:after:origin-center transition duration-200 ') +
                className
            }

        >
            {children}
        </Link>
    );
}
