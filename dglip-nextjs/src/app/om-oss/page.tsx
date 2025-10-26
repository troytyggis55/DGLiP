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
        ? urlFor(aboutUs.mainImage)?.width(800).height(400).url()
        : null;

    return (
        <main className="default-main-page">
            <h1 className="text-4xl font-bold mb-8">{aboutUs.title}</h1>

            <div className="flex flex-row justify-around">
                <p>{aboutUs.preamble}</p>
                {aboutUsImageUrl && (
                    <img src={aboutUsImageUrl}
                         alt={aboutUs.title}
                         width={800}
                         height={400}
                         className="w-full h-auto mb-6 object-cover"
                    />
                )}
            </div>

            <ImageCarousel imageCarousel={imageCarousel}/>

            <PortableText value={aboutUs.content} />
        </main>
    );
}