import AppPublicLayout from '@/layouts/app-public-layout';

import { Head } from '@inertiajs/react';

export default function Laboratory() {
    return (
        <AppPublicLayout>
            <Head title="Laboratorio" />
            <div className="prose prose-p:m-0 prose-stone flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4 md:ml-16 md:p-6">
                <h1>El Laboratorio</h1>
                <p>
                    Bienvenidos al <i>Laboratorio de Realidad Virtual</i> del Centro Univesitario de la Universidad Autónoma del Estado de México.
                    Nuestro espacio está dedicado a la investigación, desarrollo e implementación de tecnologías inmersivas, fomentando la innovación
                    en diversas áreas del conocimiento.
                </p>
                <p>
                    El <i>Laboratorio de Realidad Virtual</i> es un espacio de innovación tecnológica donde desarrollamos aplicaciones inmersivas para
                    la educación, la industria y la investigación. Nuestro objetivo es impulsar el uso de la realidad virtual y aumentada como
                    herramienta clave para el aprendizaje y la experimentación.
                </p>
                <h2>Visión</h2>
                <p>
                    Ser un referente en el desarrollo de tecnologías inmersivas en México y Latinoamérica, promoviendo la investigación aplicada y la
                    transferencia tecnológica en diversas disciplinas.
                </p>
                <h2>Misión</h2>
                <p>
                    Desarrollar y aplicar soluciones de realidad virtual y aumentada que potencien el aprendizaje, la simulación y la interacción
                    digital, fomentando la colaboración entre estudiantes, investigadores y empresas.
                </p>
            </div>
        </AppPublicLayout>
    );
}
