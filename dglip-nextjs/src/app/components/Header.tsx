"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Moves the header between 0 and -headerHeight based on scroll direction,
 * at exactly the same speed as the user's scroll.
 */
function useHideOnScroll(headerHeight: number) {
    const [offset, setOffset] = useState(0); // 0 (fully visible) .. -headerHeight (hidden)
    const lastYRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        // initialize last scroll position on mount
        lastYRef.current = window.scrollY;

        const onScroll = () => {
            // throttle to one update per frame
            if (rafRef.current != null) return;

            rafRef.current = window.requestAnimationFrame(() => {
                rafRef.current = null;

                const y = window.scrollY;
                const delta = y - lastYRef.current; // +down, -up
                lastYRef.current = y;

                setOffset((prev) => {
                    // move opposite of scroll delta: down => hide (more negative), up => show (towards 0)
                    let next = prev - delta;

                    // clamp to [ -headerHeight, 0 ]
                    if (next < -headerHeight) next = -headerHeight;
                    if (next > 0) next = 0;

                    // if user hits top of page, snap header fully visible
                    if (y <= 0) next = 0;

                    return next;
                });
            });
        };

        // passive listener = scroll never blocked; better input perf on touch/wheel. :contentReference[oaicite:1]{index=1}
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll as EventListener);
            if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
        };
    }, [headerHeight]);

    return offset;
}

export default function Header({ headerHeight, children }: { headerHeight: number; children: React.ReactNode }) {
    const offset = useHideOnScroll(headerHeight);

    return (
        <header
            style={{ transform: `translate3d(0, ${offset}px, 0)` }}
            className="fixed inset-x-0 top-0 z-50 h-16 bg-blue-600 will-change-transform"
        >
            <div className="container mx-auto main-max-width main-page-padding h-full flex items-center center">
                {children}
            </div>
        </header>
    );
}
