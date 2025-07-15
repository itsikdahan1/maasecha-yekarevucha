import { ContactForm } from '@/components/features/ContactForm'; // תיקון נתיב
import { Icon } from '@/components/ui/Icon'; // תיקון נתיב
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'יצירת קשר | מעשיך יקרבוך',
    description: 'נשמח לשמוע מכם. שלחו לנו הודעה, שאלה או בקשה ונחזור אליכם בהקדם.',
};

export default function ContactPage() {
    const emailAddress = "y@maasecha.com";
    const whatsappNumber = "972553080685";

    return (
        <div className="bg-brand-cream py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">דברו איתנו</h2>
                    <p className="mt-2 text-lg leading-8 text-brand-slate">
                        יש לכם שאלה? רוצים לדעת יותר על התהליך? אנחנו כאן בשבילכם.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-x-8 gap-y-12 text-base sm:grid-cols-2">
                    <div className="flex gap-x-4">
                        <dt className="flex-none">
                            <Icon name="whatsapp" className="h-7 w-7 text-slate-400" aria-hidden="true" />
                        </dt>
                        <dd>
                            <a className="hover:text-brand-dark font-semibold" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                                055-308-0685
                            </a>
                        </dd>
                    </div>
                    <div className="flex gap-x-4">
                        <dt className="flex-none">
                            <Icon name="mail" className="h-7 w-7 text-slate-400" aria-hidden="true" />
                        </dt>
                        <dd>
                            <a className="hover:text-brand-dark font-semibold" href={`mailto:${emailAddress}`}>
                                {emailAddress}
                            </a>
                        </dd>
                    </div>
                </div>
                <div className="mt-16 pt-16 border-t border-slate-200">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}