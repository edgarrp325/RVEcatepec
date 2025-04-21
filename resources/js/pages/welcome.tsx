import Gallery from '@/components/ui/gallery';
import { data } from '@/config/welcome-gallery-items';
import AppPublicLayout from '@/layouts/app-public-layout';
import { Head } from '@inertiajs/react';
export default function Welcome() {
    return (
        <AppPublicLayout>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex w-full items-center justify-center gap-4 px-4 md:px-6">
                <section className="w-full max-w-7xl">
                    <Gallery items={data} />
                </section>
            </div>
        </AppPublicLayout>
    );
}
