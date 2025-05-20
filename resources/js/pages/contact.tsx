import AppPublicLayout from '@/layouts/app-public-layout';
import { Head } from '@inertiajs/react';

export default function Contact() {
    return (
        <AppPublicLayout>
            <Head title="Contacto" />
            <div className="flex h-full flex-1 flex-wrap justify-start gap-4 rounded-xl p-4 md:ml-16 md:p-6">
                <div className="prose prose-p:m-0 prose-stone">
                    <h1>Contacto</h1>
                    <p>
                        Si deseas más información sobre nuestros proyectos, colaborar con nosotros o resolver dudas sobre el uso del laboratorio,
                        contáctanos a través de:
                    </p>
                    <ul>
                        <li>
                            {' '}
                            <b>Encargado del laboratorio de realidad virtual: </b>Dr. en C. de la Comp. Juan de Jesús Amador Reyes
                        </li>
                        <li>
                            {' '}
                            <b>Colaborador: </b>Dr. en C. Rodolfo Zola Garcia Lozano
                        </li>
                    </ul>
                </div>
                <div className="w-5xl md:p-8">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3758.679165732938!2d-99.06002932405524!3d19.598241235368775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f1a0e36c7789%3A0xadd45ab593347fab!2sCentro%20Universitario%20UAEM%20Ecatepec!5e0!3m2!1sen!2smx!4v1747675479521!5m2!1sen!2smx"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="h-full w-full border-0"
                    />
                </div>
            </div>
        </AppPublicLayout>
    );
}
