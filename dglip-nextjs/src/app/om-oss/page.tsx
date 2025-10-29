import {PortableText, type SanityDocument} from "next-sanity";

import {client} from "@/sanity/client";
import {urlFor} from "@/sanity/urlFor";
import ImageCarousel from "@/app/components/ImageCarousel";

const ABOUTUS_QUERY = `*[_type == "aboutUs"][0]{
    title,
    preamble,
    content,
    mainImage
}`;

const IMAGE_CAROUSEL_QUERY = `*[_type == "imageCarousel"][0]{
    images
}`;
    
const options = { next: { revalidate: 30 } };

export default async function AboutUsPage() {
    const aboutUs = await client.fetch<SanityDocument>(ABOUTUS_QUERY, {}, options);
    const imageCarousel = await client.fetch<SanityDocument>(IMAGE_CAROUSEL_QUERY, {}, options);

    const aboutUsImageUrl = aboutUs.mainImage
        ? urlFor(aboutUs.mainImage)?.url()
        : null;

    return (
        <main className="default-main-page">

            <div className="flex flex-col md:flex-row justify-between gap-8">
                <div className="flex flex-col justify-center w-full min-w-0">
                    <h1 className="text-4xl font-bold mb-8">{aboutUs.title}</h1>
                    <p>{aboutUs.preamble}</p>
                </div>
                {aboutUsImageUrl && (
                    <img
                        src={aboutUsImageUrl}
                        alt={aboutUs.title}
                        className="w-full md:w-3/4 min-w-0 max-w-full aspect-[4/3] object-cover h-auto shadow-[-16px_16px_0_0_theme(colors.contrast)]"
                    />
                )}
            </div>


            <ImageCarousel imageCarousel={imageCarousel} className="my-16"/>

            <div className="portable-text-headings">
                <PortableText value={aboutUs.content} />
            </div>
        </main>
    );
}