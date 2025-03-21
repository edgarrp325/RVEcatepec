'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export interface Gallery4Item {
    id: string;
    title: string;
    description: string;
    href: string;
    image: string;
}

export interface GalleryProps {
    items: Gallery4Item[];
}

const data = [
    {
        id: 'Tour-360',
        title: 'Tour Virtual del Centro Universitario UAEM Ecatepec en 360° ',
        description: 'csdocmdsocmdposmcposdmcpomdspocmdspomcpodsmcpodsmpocmdspocmpdosmcposdmcpomdspocmdspocmdspocmdspocmdspomcdspomcp',
        href: '360',
        image: 'https://realidadvirtualecatepec.com.mx/public/img/carrousel/1.png',
    },
    {
        id: 'Tour-3D',
        title: '3D',
        description: 'mnewoldnlwendoliewndfoiernfoibnreqkfnrwqlifnewqoinfp{oeiwnfpowenpofnewpifnpew{rnfpoewnfpewnpfnewpfnewpfnewpfnewpnfpwe',
        href: 'https://tailwindcss.com',
        image: 'https://realidadvirtualecatepec.com.mx/public/img/carrousel/2.png',
    },
];

const Gallery = ({ items = data }: GalleryProps) => {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (!carouselApi) {
            return;
        }
        const updateSelection = () => {
            setCurrentSlide(carouselApi.selectedScrollSnap());
        };
        updateSelection();
        carouselApi.on('select', updateSelection);
        return () => {
            carouselApi.off('select', updateSelection);
        };
    }, [carouselApi]);

    return (
        <section className="py-4">
            <div className="w-full">
                <Carousel
                    setApi={setCarouselApi}
                    opts={{
                        breakpoints: {
                            '(max-width: 768px)': {
                                dragFree: true,
                            },
                        },
                    }}
                >
                    <CarouselContent className="ml-0 2xl:mr-[max(0rem,calc(50vw-700px))] 2xl:ml-[max(8rem,calc(50vw-700px))]">
                        {items.map((item) => (
                            <CarouselItem key={item.id} className="w-full pl-[20px]">
                                <a href={item.href} className="group rounded-xl">
                                    <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 h-full bg-[linear-gradient(transparent_20%,var(--primary)_100%)] mix-blend-multiply" />
                                        <div className="text-primary-foreground absolute inset-x-0 bottom-0 flex flex-col items-start p-6 md:p-8">
                                            <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">{item.title}</div>
                                            <div className="mb-8 line-clamp-2 md:mb-12 lg:mb-9">{item.description}</div>
                                            <div className="flex items-center text-sm">
                                                Entrar <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="mt-8 flex justify-center gap-2">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            className={`h-4 w-4 rounded-full transition-colors hover:cursor-pointer ${currentSlide === index ? 'bg-primary' : 'bg-primary/20'}`}
                            onClick={() => carouselApi?.scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
