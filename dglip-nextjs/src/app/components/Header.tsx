"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import HamburgerOverlay from "@/app/components/HamburgerOverlay";

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

export default function Header() {
    const offset = useHideOnScroll(64);

    const [showOverlay, setShowOverlay] = React.useState(false);
    const [isHamburger, setIsHamburger] = React.useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setShowOverlay(false);
                setIsHamburger(false)
            } else {
                setIsHamburger(true)
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const hamburger = <svg className="cursor-pointer" onClick={() => setShowOverlay(!showOverlay)} xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#2b2c36"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
    const close = <svg className="fixed right-8 top-4 z-50 cursor-pointer" onClick={() => setShowOverlay(false)} xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#2b2c36"><path d="M249-207 480-438l231 231 57-57-231-231 231-231-57-57-231 231-231-231-57 57 231 231-231 231 57 57Z"/></svg>

    return (
        <>
            <header
                style={{ transform: `translate3d(0, ${offset}px, 0)` }}
                className="fixed inset-x-0 top-0 z-50 h-16 bg-background/20 backdrop-blur-md"
            >
                <div className="container mx-auto main-max-width main-page-padding h-full flex items-center center">
                    <div className="flex justify-between items-center w-full max-w-5xl">
                        <Link href="/">
                            <h3 className="leading-4">Det<br/>gode liv<br/>i Provence</h3>
                        </Link>

                        {isHamburger ? (
                            hamburger
                        ) : (
                            <div className="flex gap-8 text-lg">
                                <Link href="/">
                                    <h3>Hjem</h3>
                                </Link>
                                <Link href="/kurs">
                                    <h3>Våre kurs</h3>
                                </Link>
                                <Link href="https://loumarronie.com/no/" target="_blank" rel="noopener noreferrer">
                                    <h3>Om stedet</h3>
                                </Link>
                                <Link href="/om-oss">
                                    <h3>Om oss</h3>
                                </Link>
                            </div>
                        )}

                    </div>
                </div>
            </header>

            <div style={{ height: "64px" }} />

            {showOverlay && <HamburgerOverlay onClose={() => setShowOverlay(false)} />}
            {showOverlay && close }
        </>
    );
}
