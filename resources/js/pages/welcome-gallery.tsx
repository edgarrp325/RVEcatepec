import AppNavbar from '@/components/ui/app-navbar';
import Gallery from '@/components/ui/gallery';
import { Head } from '@inertiajs/react';

export default function WelcomeGallery() {
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen w-full flex-col justify-self-center bg-[#FDFDFC] text-[#1b1b18] lg:max-w-[1920px] dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full">
                    <AppNavbar />
                </header>
                <main className="w-full flex-1 items-center lg:max-w-[1920px]">
                    <Gallery />
                </main>
            </div>
        </>
    );
}
