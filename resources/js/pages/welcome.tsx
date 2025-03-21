import AppNavbar from '@/components/ui/app-navbar';
import Gallery  from '@/components/ui/gallery';
import { Head} from '@inertiajs/react';



export default function Welcome() {
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col justify-self-center bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] lg:max-w-[1920px] w-full">
                <header className="mb-6 w-full ">
                <AppNavbar/>
                </header>
                <main className="flex-1 items-center w-full lg:max-w-[1920px]">
                    <Gallery/>
                </main>
            </div>
        </>
    );
}
