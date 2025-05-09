'use client';

import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import texts from '@/config/texts';

export interface GalleryItem {
    id: string;
    title?: string;
    description?: string;
    href?: string;
    image: string;
}

export interface GalleryProps {
    items: GalleryItem[];
    onlyImage?: boolean;
}

const Gallery = ({ items, onlyImage = false }: GalleryProps) => {
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
                <CarouselContent>
                    {items.map((item) => (
                        <CarouselItem key={item.id} className="w-full pl-[20px]">
                            <a href={item.href} className="group rounded-xl">
                                <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                                    {onlyImage ? (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 group-hover:cursor-zoom-in"
                                                />
                                            </DialogTrigger>

                                            <DialogContent
                                                hideCloseButton
                                                className="flex max-h-full max-w-full justify-center border-none bg-transparent p-0 shadow-none"
                                            >
                                                <DialogClose>
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="mx-auto max-h-[90vh] max-w-[90vw] cursor-zoom-out rounded-md"
                                                    />
                                                </DialogClose>
                                            </DialogContent>
                                        </Dialog>
                                    ) : (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 group-hover:cursor-pointer"
                                        />
                                    )}
                                    {!onlyImage && (
                                        <>
                                            <div className="absolute inset-0 h-full bg-[linear-gradient(transparent_20%,var(--primary)_100%)] mix-blend-multiply" />

                                            <div className="text-primary-foreground absolute inset-x-0 bottom-0 flex flex-col items-start p-6 md:p-8">
                                                <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">{item.title}</div>
                                                <div className="mb-8 line-clamp-2 md:mb-12 lg:mb-9">{item.description}</div>
                                                {item.href && (
                                                    <div className="flex items-center text-sm">
                                                        {texts.common.enter}{' '}
                                                        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
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
    );
};

export default Gallery;
