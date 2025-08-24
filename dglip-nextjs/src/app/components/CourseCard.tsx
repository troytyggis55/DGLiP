import React from "react";
import {urlFor} from "@/sanity/urlFor";
import { SanityDocument } from "@sanity/client";


export default function CourseCard({ course }: { course: SanityDocument }) {

    const courseImageUrl = urlFor(course.mainImage)?.width(600).height(400).url();

    return (
        <a
            href={`/kurs/${course.slug.current}`}
            className="block overflow-hidden max-w-md h-72 border border-gray-200"
        >
            {course.mainImage && (
                <img
                    src={courseImageUrl}
                    alt={course.title}
                    className="w-full h-44 object-cover"
                />
            )}
            <div className="p-2">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                {course.preamble && <p className="text-sm">{course.preamble}</p>}
            </div>
        </a>
    );
}