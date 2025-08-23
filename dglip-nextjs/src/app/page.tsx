import Link from "next/link";

import {client} from "@/sanity/client";

export default async function IndexPage() {

    return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8">
            <h1 className="text-4xl font-bold mb-8">Kurs</h1>
            <Link href="/kurs" className="hover:underline">
                Gå til kursoversikt
            </Link>
        </main>
    );
}