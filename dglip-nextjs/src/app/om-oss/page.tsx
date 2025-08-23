import {PortableText, type SanityDocument} from "next-sanity";

import {client} from "@/sanity/client";

const POSTS_QUERY = `*[_type == "aboutUs"][0]{
    title,
    content
}`;

const options = { next: { revalidate: 30 } };

export default async function AboutUsPage() {
    const aboutUs = await client.fetch<SanityDocument>(POSTS_QUERY, {}, options);

    return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8">
            <h1 className="text-4xl font-bold mb-8">{aboutUs.title}</h1>
            <PortableText value={aboutUs.content} />
        </main>
    );
}