import { useState, useEffect, useRef } from 'react';

export const useIntersectionObserver = (options) => {
    const [elements, setElements] = useState([]);
    const [entries, setEntries] = useState([]);
    const observer = useRef(null);

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