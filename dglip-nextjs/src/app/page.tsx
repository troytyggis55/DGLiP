import Link from "next/link";
import { client } from "@/sanity/client";
import { SanityDocument } from "@sanity/client";
import { urlFor } from "@/sanity/urlFor";
import CourseCard from "@/app/components/CourseCard";
import PartnerAccordion from "@/app/components/PartnerAccordion";
import ImageCarousel from "@/app/components/ImageCarousel";
import StretchedDiv from "@/app/components/StretchedDiv";

// Placeholder for main images
const IMAGE_QUERY = `*[_type == "frontpage"][0]{
    image,
    partners[]->{
        name,
        logo,
        url
    }
}`;

const COURSE_QUERY = `*[_type == "course"][0...2]{
    title,
    slug,
    mainImage,
    preamble,
}`;

const PARTNER_OVERVIEW = `*[_type == "partner"]{
    name,
    image,
    description,
    website
}`;

const IMAGE_CAROUSEL_QUERY = `*[_type == "imageCarousel"][0]{
    images
}`;

const ABOUT_US_QUERY = `*[_type == "aboutUs"][0]{
    title,
    preamble,
    mainImage
}`;

const options = { next: { revalidate: 30 } };

export default async function HomePage() {
    const frontpage = await client.fetch<SanityDocument>(IMAGE_QUERY, {}, options);
    const courses = await client.fetch<SanityDocument[]>(COURSE_QUERY, {}, options);
    const partners = await client.fetch<SanityDocument[]>(PARTNER_OVERVIEW, {}, options);
    const imageCarousel = await client.fetch<SanityDocument>(IMAGE_CAROUSEL_QUERY, {}, options);
    const aboutUs = await client.fetch<SanityDocument>(ABOUT_US_QUERY, {}, options);

    const mainImageUrl = urlFor(frontpage.image)?.url();
    const aboutUsImageUrl = urlFor(aboutUs.mainImage)?.url();

    return (
        <main className="default-main-page">
            <div className="flex flex-col md:flex-row md:justify-between gap-8 items-center w-full">
                <h1 className="w-full md:w-auto min-w-0 text-4xl font-bold">
                    Velkommen til det gode liv i Provence!
                </h1>

                <img
                    src={mainImageUrl}
                    alt="Hovedbilde"
                    className="w-full md:w-3/4 min-w-0 max-w-full aspect-[4/3] object-cover h-auto shadow-[-16px_16px_0_0_theme(colors.primary)]"
                />
            </div>

            <StretchedDiv className="bg-contrast my-32 py-16">
                <div className="flex flex-row flex-wrap justify-center gap-8">
                    { courses.map((course) => {
                        return (
                                <CourseCard key={course._id || course.slug?.current} course={course}/>
                            )
                        })
                    }
                </div>
                <Link href="/kurs" className="underline block mt-8 text-center">
                    Se alle våre kurs
                </Link>
            </StretchedDiv>

            <ImageCarousel imageCarousel={imageCarousel} className="my-32"/>

            <StretchedDiv className="bg-secondary text-background my-32 py-16">
                <h2 className="text-center">Våre sammarbeidspartnere</h2>
                <PartnerAccordion partners={partners} />
            </StretchedDiv>

            <Link href="/om-oss" className="hover:underline block mt-4">
                <div className="flex flex-col gap-8 sm:flex-row justify-around items-center">
                    <img
                        src={aboutUsImageUrl}
                        alt="Om oss bilde"
                        className="w-full sm:w-1/2"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{aboutUs.title}</h2>
                        <p className="mt-4">{aboutUs.preamble}</p>
                    </div>
                </div>
            </Link>
        </main>
    );
}