import React from "react";
import {urlFor} from "@/sanity/urlFor";
import { SanityDocument } from "@sanity/client";


export default function CourseCard({ course }: { course: SanityDocument }) {

    const courseImageUrl = course.mainImage
        ? urlFor(course.mainImage)?.width(400).height(400).url()
        : null;

    return (
        <a
            href={`/kurs/${course.slug.current}`}
            className="block w-md border border-gray-300 bg-background"
        >
            {courseImageUrl && (
                <img
                    src={courseImageUrl}
                    alt={course.title}
                    className="max-h-52 w-full object-cover"
                />
            )}

            <div className="p-2 h-32">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                {course.preamble && <p className="text-sm line-clamp-4">{course.preamble}</p>}
            </div>
        </a>
    );
}