

export default function StretchedDiv({ className, children }: { className: string | null, children: React.ReactNode }) {
    return (
        <div className={`w-screen relative left-1/2 right-1/2 -mx-[50vw] flex justify-center ${className}`}>
            <div className="w-full max-w-[64rem] main-page-padding">
                {children}
            </div>
        </div>
    );
}
