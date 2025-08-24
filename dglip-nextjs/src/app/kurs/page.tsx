import Link from "next/link";
import {type SanityDocument} from "next-sanity";

import {client} from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "course"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, startDate}`;

const options = { next: { revalidate: 30 } };

export default async function CoursesPage() {
    const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

    return (
        <main className="container mx-auto main-max-width p-8">
            <h1 className="text-4xl font-bold mb-8">Kurs</h1>
            <ul className="flex flex-col gap-y-4">
                {posts.map((post) => (
                    <li className="hover:underline" key={post._id}>
                        <Link href={`/kurs/${post.slug.current}`}>
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p>{new Date(post.startDate).toLocaleDateString()}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}