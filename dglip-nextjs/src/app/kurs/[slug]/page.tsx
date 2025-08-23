import {PortableText, type SanityDocument} from "next-sanity";
import {client} from "@/sanity/client";
import Link from "next/link";
import MapClient from "@/app/components/MapClient";
import { urlFor } from "@/sanity/urlFor";

const POST_QUERY = `*[_type == "course" && slug.current == $slug][0]`;


const options = { next: { revalidate: 30 } };

export default async function CoursePage({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}) {
    const post = await client.fetch<SanityDocument>(POST_QUERY, await params, options);

    const position = { lat: post.location.lat, lng: post.location.lng };

    const postImageUrl = post.mainImage
        ? urlFor(post.mainImage)?.width(550).height(310).url()
        : null;

    console.log("Env key:", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)

    return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
            {/* Display slug */}
            <p className="text-sm text-gray-500">Slug: {post.slug?.current}</p>
            <Link href="/kurs" className="hover:underline">
                ← Tilbake til kursoversikt
            </Link>
            {postImageUrl && (
                <img
                    src={postImageUrl}
                    alt={post.title}
                    width={550}
                    height={310}
                    className="aspect-video rounded-xl object-cover"
                />
            )}
            <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
            <div className="prose">
                <p>{new Date(post.startDate).toLocaleDateString()} - {new Date(post.endDate).toLocaleDateString()}</p>
                <div className="my-4">
                    <h2 className="text-2xl font-semibold">Sted</h2>
                    <p>Latitude: {post.location.lat}, Longitude: {post.location.lng}</p>
                    <MapClient apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} position={position} />
                </div>
                {post.importantInfo && (
                    <div>
                        <b>Viktig informasjon:</b>
                        <PortableText value={post.importantInfo} />
                    </div>
                )}                <br/>
                <p>{post.preamble}</p>
                <hr/>
                {Array.isArray(post.body) && <PortableText value={post.body} />}
            </div>
        </main>
    );
}