import React from "react";
import {urlFor} from "@/sanity/urlFor";
import { SanityDocument } from "@sanity/client";


export default function CourseCard({ course }: { course: SanityDocument }) {

    const courseImageUrl = course.mainImage
        ? urlFor(course.mainImage)?.width(400).height(200).url()
        : null;

    return (
        <a
            href={`/kurs/${course.slug.current}`}
            className="block overflow-hidden max-w-md h-72 border bg-background"
        >
            {courseImageUrl && (
                <img
                    src={courseImageUrl}
                    alt={course.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                />
            )}

            <div className="p-2">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                {course.preamble && <p className="text-sm">{course.preamble}</p>}
            </div>
        </a>
    );
}