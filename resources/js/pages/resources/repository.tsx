import AppPublicLayout from '@/layouts/app-public-layout';
import { Head, Link } from '@inertiajs/react';

export default function Repository() {
    return (
        <AppPublicLayout>
            <Head title="Recursos" />
            <div className="prose prose-p:m-0 prose-stone flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4 md:ml-16 md:p-6">
                <h1>Repositorio</h1>
                <p>
                    En esta sección encontrarás recursos gratuitos para aprender y desarrollar proyectos de realidad virtual e inteligencia
                    artificial. Ofrecemos:
                </p>
                <ul>
                    <li>
                        <b>Tutoriales: </b> Guías y documentación sobre el uso de motores gráficos, modelado 3D y programación para VR.{' '}
                        <Link href={route('resources.tutorials.index')}>Empieza a aprender</Link>
                    </li>

                    <li>
                        <b>Elementos tridimensionales: </b>Modelos y texturas listos para su integración en proyectos.{' '}
                        <Link href={route('resources.three-d-models.index')}>Empieza a explorar</Link>
                    </li>

                    <li>
                        <b>Proyectos fuente: </b> Códigos de aplicaciones VR, AR e IA disponibles para su modificación y personalización.{' '}
                        <Link href={route('resources.projects.index')}>Empieza a personalizar</Link>
                    </li>
                </ul>
            </div>
        </AppPublicLayout>
    );
}
