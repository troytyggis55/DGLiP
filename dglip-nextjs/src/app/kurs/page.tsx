import {type SanityDocument} from "next-sanity";

import {client} from "@/sanity/client";
import CourseCard from "@/app/components/CourseCard";

const COURSE_QUERY = `*[
  _type == "course"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, startDate, mainImage, preamble}`;

const options = { next: { revalidate: 30 } };

export default async function CoursesPage() {
    const courses = await client.fetch<SanityDocument[]>(COURSE_QUERY, {}, options);

    return (
        <main className="default-main-page">
            <h1 className="text-4xl font-bold mb-8">Kurs</h1>


            <div className="flex flex-row flex-wrap justify-center gap-8 mt-32">
                { courses.map((course) => {
                    return (
                        <CourseCard key={course._id || course.slug?.current} course={course}/>
                    )
                })}
            </div>

        </main>
    );
}