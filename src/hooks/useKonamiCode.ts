import { useCallback, useEffect, useRef, useState } from 'react';

const KONAMI_SEQUENCE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a',
];

export function useKonamiCode() {
    const [activated, setActivated] = useState(false);
    const indexRef = useRef(0);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (activated) return;

            const expected = KONAMI_SEQUENCE[indexRef.current];
            if (e.key.toLowerCase() === expected.toLowerCase()) {
                indexRef.current++;
                if (indexRef.current === KONAMI_SEQUENCE.length) {
                    setActivated(true);
                    indexRef.current = 0;
                }
            } else {
                indexRef.current = 0;
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [activated]);

    const reset = useCallback(() => {
        setActivated(false);
        indexRef.current = 0;
    }, []);

    return { konamiActivated: activated, resetKonami: reset };
}
