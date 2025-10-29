import Link from "next/link";

export default function HamburgerOverlay({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 w-screen h-screen bg-contrast z-50 flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold mb-8">Meny</h2>
            <Link href="/" className="hover:underline" onClick={onClose}><h3>Hjem</h3></Link>
            <Link href="/kurs" className="hover:underline" onClick={onClose}><h3>Våre kurs</h3></Link>
            <Link href="https://loumarronie.com/no/" target="_blank" rel="noopener noreferrer" className="hover:underline" onClick={onClose}>
                <h3>Om stedet</h3></Link>
            <Link href="/om-oss" className="hover:underline" onClick={onClose}><h3>Om oss</h3></Link>
        </div>
    );
}