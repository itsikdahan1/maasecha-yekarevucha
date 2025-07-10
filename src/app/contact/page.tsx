// src/app/contact/page.tsx
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon'; // נייבא את רכיב האייקונים
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'יצירת קשר | מעשיך יקרבוך',
    description: 'נשמח לשמוע מכם. שלחו לנו הודעה, שאלה או בקשה ונחזור אליכם בהקדם.',
};

export default function ContactPage() {
    return (
        <div className="relative isolate bg-brand-cream py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">דברו איתנו</h2>
                    <p className="mt-2 text-lg leading-8 text-brand-dark/70">
                        יש לכם שאלה? רוצים לדעת יותר על התהליך? אנחנו כאן בשבילכם.
                    </p>
                </div>

                {/* פרטי קשר ישירים עם אייקונים */}
                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-x-8 gap-y-12 text-base leading-7 text-gray-600 sm:grid-cols-2">
                    <div className="flex gap-x-4">
                        <dt className="flex-none">
                            <span className="sr-only">וואטסאפ</span>
                            <Icon name="whatsapp" className="h-7 w-7 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd>
                            {/* עדכן כאן את מספר הוואטסאפ האמיתי שלך */}
                            <a className="hover:text-brand-dark font-semibold" href="https://wa.me/972553080685" target="_blank" rel="noopener noreferrer">
                                055-308-0685
                            </a>
                        </dd>
                    </div>
                    <div className="flex gap-x-4">
                        <dt className="flex-none">
                            <span className="sr-only">מייל</span>
                            <Icon name="mail" className="h-7 w-7 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd>
                            {/* עדכן כאן את כתובת המייל האמיתית שלך */}
                            <a className="hover:text-brand-dark font-semibold" href="mailto:SHIDUCHIM.MY@GMAIL.COM">
                                SHIDUCHIM.MY@GMAIL.COM
                            </a>
                        </dd>
                    </div>
                </div>

                {/* טופס יצירת קשר */}
                <div className="mt-16 pt-16 border-t border-gray-200">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
