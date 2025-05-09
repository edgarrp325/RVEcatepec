import { footerItems, footerSocialItems } from '@/config/footer-items';
import texts from '@/config/texts';
import { cn } from '@/lib/utils';

export default function AppFooter({ className }: { className?: string }) {
    return (
        <footer className={cn('w-full bg-[#C3A701] text-white', className)}>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
                    {/* Left column - Laboratory info */}
                    <div className="space-y-3 text-center md:text-left">
                        <h3 className="text-xl font-bold">Laboratorio de Realidad Virtual</h3>
                        <p className="text-sm">Universidad Autónoma del Estado de México</p>
                        <p className="text-sm">Centro Universitario Ecatepec</p>

                        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                            {footerSocialItems.map((item, index) => (
                                <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="block transition-all hover:opacity-80">
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Center column - Logo */}
                    <div className="flex justify-center">
                        <div className="size-20">
                            <img src="https://realidadvirtualecatepec.com.mx/public/img/isotipo_RV.png" alt="" />
                        </div>
                    </div>

                    {/* Right column - Links */}
                    <div className="flex flex-col items-center md:items-end">
                        <div className="space-y-2 text-center md:text-right">
                            {footerItems.map((item) => (
                                <a
                                    key={item.title}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block transition-all hover:underline"
                                >
                                    {item.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-white/20 pt-4 text-center text-xs">
                    <p>{texts.footer.useDisclaimer}</p>
                    <p>{texts.footer.copyright}</p>
                </div>
            </div>
        </footer>
    );
}
