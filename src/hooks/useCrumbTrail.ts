import { useCallback, useEffect, useRef, useState } from 'react';

const CRUMB_EMOJIS = ['🌾', '⭐', '🍯', '🫐', '🍫', '✨', '🥛'];
const MAX_PARTICLES = 15;
const PARTICLE_LIFETIME = 1000;

export function useCrumbTrail() {
    const [isActive, setIsActive] = useState(false);
    const particleCountRef = useRef(0);
    const frameRef = useRef<number>(0);
    const lastSpawnRef = useRef(0);

    const spawnParticle = useCallback((clientX: number, clientY: number) => {
        if (particleCountRef.current >= MAX_PARTICLES) return;

        const now = Date.now();
        if (now - lastSpawnRef.current < 60) return;
        lastSpawnRef.current = now;

        const el = document.createElement('div');
        el.textContent = CRUMB_EMOJIS[Math.floor(Math.random() * CRUMB_EMOJIS.length)];
        el.style.cssText = `
            position: fixed;
            left: ${clientX}px;
            top: ${clientY}px;
            font-size: 12px;
            pointer-events: none;
            z-index: 9999;
            transition: all ${PARTICLE_LIFETIME}ms ease-out;
            will-change: transform, opacity;
        `;

        document.body.appendChild(el);
        particleCountRef.current++;

        requestAnimationFrame(() => {
            const drift = (Math.random() - 0.5) * 30;
            el.style.transform = `translate(${drift}px, ${20 + Math.random() * 20}px) scale(0.5)`;
            el.style.opacity = '0';
        });

        setTimeout(() => {
            el.remove();
            particleCountRef.current--;
        }, PARTICLE_LIFETIME);
    }, []);

    useEffect(() => {
        if (!isActive) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
        if (prefersReduced || isCoarsePointer) return;

        const onMove = (e: MouseEvent) => {
            spawnParticle(e.clientX, e.clientY);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', onMove);
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [isActive, spawnParticle]);

    return {
        isActive,
        enableTrail: useCallback(() => setIsActive(true), []),
        disableTrail: useCallback(() => setIsActive(false), []),
        toggleTrail: useCallback(() => setIsActive((p) => !p), []),
    };
}
