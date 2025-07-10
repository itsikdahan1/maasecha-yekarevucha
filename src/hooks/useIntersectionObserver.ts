import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';

// הגדרת הטיפוס עבור האופציות של IntersectionObserver
type IntersectionObserverOptions = IntersectionObserverInit;

// הגדרת הטיפוס לערך המוחזר מה-hook
type UseIntersectionObserverReturn = [
    Dispatch<SetStateAction<(Element | null)[]>>, 
    IntersectionObserverEntry[]
];

export const useIntersectionObserver = (options: IntersectionObserverOptions): UseIntersectionObserverReturn => {
    const [elements, setElements] = useState<(Element | null)[]>([]);
    const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
    
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(observedEntries => {
            setEntries(observedEntries);
        }, options);

        const { current: currentObserver } = observer;

        elements.forEach(element => {
            if (element) {
                currentObserver.observe(element);
            }
        });

        return () => {
            if (currentObserver) {
                currentObserver.disconnect();
            }
        };
    }, [elements, options]);

    return [setElements, entries];
};
