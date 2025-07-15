import { RegistrationWizard } from '@/components/features/RegistrationWizard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'הצטרפות למסע | מעשיך יקרבוך',
    description: 'התחילו את המסע שלכם לזוגיות. צרו פרופיל ראשוני וגלו איך היועץ החכם שלנו יכול לעזור לכם.',
    robots: {
        index: false,
        follow: true,
    },
};

export default function RegisterPage() {
    return (
        <div className="bg-brand-cream py-16 sm:py-24">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">
                        צעד ראשון בדרך לבית
                    </h1>
                    <p className="mt-6 text-xl text-brand-slate leading-relaxed">
                        בוא/י נתחיל יחד את המסע. התהליך הקצר הבא יעזור לנו להכיר אותך טוב יותר, וייתן לך כלים ראשונים להצלחה.
                    </p>
                </div>

                <div className="mt-12 max-w-2xl mx-auto">
                    <RegistrationWizard />
                </div>
            </div>
        </div>
    );
}