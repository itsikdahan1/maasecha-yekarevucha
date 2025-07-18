import { AiToolsSection } from "@/components/features/AiToolsSection";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'היועץ החכם | כלים להצלחה בזוגיות',
  description: 'שפרו את פרופיל ההיכרויות שלכם, קבלו רעיונות מקוריים לדייטים, ולמדו איך להתחיל שיחה בביטחון עם כלי ה-AI של מעשיך יקרבוך.',
  robots: {
    index: false, // מומלץ לא לאנדקס עמוד כלים כזה בשלב ראשון
    follow: true,
  },
};

export default function AiToolsPage() {
  return (
    // העמוד עצמו עוטף את הרכיב בריווח ובכותרת
    <div className="py-16 sm:py-24 bg-brand-cream/50">
        <AiToolsSection />
    </div>
  );
}