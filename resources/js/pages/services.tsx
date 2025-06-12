import AppPublicLayout from '@/layouts/app-public-layout';
import { Head, Link } from '@inertiajs/react';

export default function Services() {
    return (
        <AppPublicLayout>
            <Head title="Servicios" />
            <div className="prose prose-p:m-0 prose-stone flex h-full flex-1 flex-col justify-start gap-4 rounded-xl p-4 md:ml-16 md:p-6">
                <h1>Servicios</h1>
                <p>
                    Para facilitar el acceso a equipos de cómputo y hardware especializado en el laboratorio, ofrecemos un sistema de registro donde
                    los usuarios pueden:
                </p>
                <ul>
                    <li>
                        <b>Solicitar equipos de realidad virtual </b>(gafas VR, estaciones de trabajo, controladores)
                    </li>

                    <li>
                        <b>Reservar espacios de trabajo en laboratorio</b>
                    </li>

                    <li>
                        <b>Control de acceso a personal de Servicio social y Prácticas profesionales</b>
                    </li>
                </ul>
                <p>
                    Para acceder a estos servicios, <Link href={route('login')}>inicia sesión</Link> o{' '}
                    <Link href={route('register')}>regístrate</Link> en la plataforma como alumno, servicio social o prácticas profesionales.**Para
                    ser aceptado como servicio social o prácticas profesionales, <Link href={route('login')}>realiza tu solicitud</Link>.
                </p>
            </div>
        </AppPublicLayout>
    );
}
