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
        <main className="default-main-page">
            {/* Display slug */}
            <p className="text-sm text-gray-500">Slug: {course.slug?.current}</p>
            <Link href="/kurs" className="hover:underline">
                ← Tilbake til kursoversikt
            </Link>
            {mainImageUrl && (
                <img
                    src={mainImageUrl}
                    alt={course.title}
                    width={550}
                    height={310}
                    className="aspect-video object-cover"
                />
            )}
            <h1 className="text-4xl font-bold mb-8">{course.title}</h1>
            <div className="prose">
                {course.partner && (
                    <div className="my-6 p-4 border border-white">
                        <h2 className="text-xl font-semibold mb-2">{course.partner.name}</h2>
                        {partnerImageUrl && (
                            <img
                                src={partnerImageUrl}
                                alt={course.partner.name}
                                width={200}
                                height={200}
                                className="mb-2 object-cover"
                            />
                        )}
                        <div>
                            {course.partner.description && (
                                <p className="text-sm">{course.partner.description}</p>
                            )}
                            {course.partner.website && (
                                <a
                                    href={course.partner.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline block mt-1"
                                >
                                    Besøk nettside
                                </a>
                            )}
                        </div>
                    </div>
                )}

                <p>{new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}</p>
                <div className="my-4">
                    <h2 className="text-2xl font-semibold">Sted</h2>
                    <p>Latitude: {course.location.lat}, Longitude: {course.location.lng}</p>
                    <MapClient apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} position={position} />
                </div>
                {course.importantInfo && (
                    <div>
                        <b>Viktig informasjon:</b>
                        <PortableText value={course.importantInfo} />
                    </div>
                )}
                <br/>
                <p>{course.preamble}</p>
                <hr/>
                {Array.isArray(course.body) && <PortableText value={course.body} />}
            </div>
        </main>
    );
}