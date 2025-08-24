import Link from "next/link";
import { client } from "@/sanity/client";
import { SanityDocument } from "@sanity/client";
import { urlFor } from "@/sanity/urlFor";
import CourseCard from "@/app/components/CourseCard";

// Placeholder for main images
const IMAGE_QUERY = `*[_type == "frontpage"][0]{
    image
}`;

const COURSE_QUERY = `*[_type == "course"][0...2]{
    title,
    slug,
    mainImage,
    preamble,
}`;

const options = { next: { revalidate: 30 } };


export default async function HomePage() {
    const frontpage = await client.fetch<SanityDocument>(IMAGE_QUERY, {}, options);
    const courses = await client.fetch<SanityDocument[]>(COURSE_QUERY, {}, options);

    const mainImageUrl = urlFor(frontpage.image)?.width(1200).height(600).url();

    return (
        <main className="container mx-auto main-max-width my-16">
            <div className="flex flex-row flex-wrap justify-center">
                <h1 className="w-md text-4xl font-bold content-center">Velkommen til det gode liv i Provence!</h1>
                <img
                    src={mainImageUrl}
                    alt="Hovedbilde"
                    className="w-lg h-auto"
                />
            </div>

            <div className="flex flex-row flex-wrap justify-center gap-8 my-32">
                { courses.map((course) => {
                    return (
                        <CourseCard key={course._id || course.slug?.current} course={course}/>
                    )
                })}
            </div>

            <Link href="/kurs" className="hover:underline">
                Gå til kursoversikt
            </Link>
            <Link href="/om-oss" className="hover:underline block mt-4">
                Om oss
            </Link>
        </main>
    );
}