import {PortableText, type SanityDocument} from "next-sanity";

import {client} from "@/sanity/client";
import {urlFor} from "@/sanity/urlFor";

const ABOUTUS_QUERY = `*[_type == "aboutUs"][0]{
    title,
    preamble,
    content,
    mainImage
}`;

const options = { next: { revalidate: 30 } };

export default async function AboutUsPage() {
    const aboutUs = await client.fetch<SanityDocument>(ABOUTUS_QUERY, {}, options);

    const aboutUsImageUrl = aboutUs.mainImage
        ? urlFor(aboutUs.mainImage)?.width(800).height(400).url()
        : null;

    return (
        <main className="container mx-auto main-max-width p-8">
            {aboutUsImageUrl && (
                <img src={aboutUsImageUrl}
                     alt={aboutUs.title}
                     width={800}
                     height={400}
                     className="w-full h-auto mb-6 object-cover"
                />
            )}
            <h1 className="text-4xl font-bold mb-8">{aboutUs.title}</h1>

            <p>{aboutUs.preamble}</p>

            <PortableText value={aboutUs.content} />
        </main>
    );
}