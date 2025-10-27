import {PortableText, type SanityDocument} from "next-sanity";
import {client} from "@/sanity/client";
import Link from "next/link";
import MapClient from "@/app/components/MapClient";
import { urlFor } from "@/sanity/urlFor";

const COURSE_QUERY = `*[_type == "course" && slug.current == $slug][0]{
  ...,
  partner->,
}`;

const options = { next: { revalidate: 30 } };

export default async function CoursePage({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}) {
    const course = await client.fetch<SanityDocument>(COURSE_QUERY, await params, options);

    const position = { lat: course.location.lat, lng: course.location.lng };

    const mainImageUrl = course.mainImage
        ? urlFor(course.mainImage)?.width(550).height(310).url()
        : null;

    const partnerImageUrl = course.partner.image
        ? urlFor(course.partner.image)?.width(200).height(200).url()
        : null;

    return (
        <main className="default-main-page !mt-0">
            {mainImageUrl && (
                <div className="relative">
                    <img
                        src={mainImageUrl}
                        alt={course.title}
                        className="w-full"
                    />
                    <h1
                        className="text-6xl font-bold m-2 absolute left-0 bottom-0 text-background"
                    >
                        {course.title}
                    </h1>
                </div>
            )}

            <p className="my-8 text-xl">{course.preamble}</p>

            <h2>Oppsummering</h2>
            <div className="grid gap-8 w-full justify-center sm:grid-cols-2 md:grid-cols-3">
                <div className="w-full md:col-span-2">
                    <p>{new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}</p>
                    <PortableText value={course.importantInfo} />
                    <MapClient
                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
                        position={position}
                        className="w-full h-64 mt-4"
                    />
                </div>
                {course.partner && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">{course.partner.name}</h2>

                        <div>
                            {course.partner.description && (
                                <p className="">
                                    {partnerImageUrl && (
                                        <img
                                            src={partnerImageUrl}
                                            alt={course.partner.name}
                                            className="inline-block w-64"
                                        />
                                    )}
                                    {course.partner.description}
                                </p>
                            )}
                            {course.partner.website && (
                                <a
                                    href={course.partner.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Besøk nettside
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <hr className="my-8"/>

            <div className="portable-text-headings">
                {Array.isArray(course.body) && <PortableText value={course.body} />}
            </div>
        </main>
    );
}