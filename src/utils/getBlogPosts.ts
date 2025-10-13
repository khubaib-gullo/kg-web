// src/utils/getBlogPosts.ts (This is a Server-side only file)
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMetadata = {
	title: string;
	date: string;
	excerpt: string;
	id: number;
	slug: string; // e.g., 'react-concurrent-mode'
};

// CRITICAL PATH ADJUSTMENT: Points to src/app/blog
const POSTS_DIR = path.join(process.cwd(), "src", "app", "blog");

export function getBlogPostsMetadata(): PostMetadata[] {
	try {
		const filenames = fs.readdirSync(POSTS_DIR);

		const posts = filenames
			.filter((filename) => filename.endsWith(".mdx"))
			.map((filename) => {
				const fullPath = path.join(POSTS_DIR, filename);
				const fileContents = fs.readFileSync(fullPath, "utf8");

				const { data } = matter(fileContents);
				const slug = filename.replace(/\.mdx$/, "");

				return {
					...(data as Omit<PostMetadata, "slug">),
					slug: slug,
				};
			})
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

			.filter(
				(post): post is PostMetadata =>
					!!post.title &&
					!!post.date &&
					!!post.excerpt &&
					post.id !== undefined &&
					!!post.slug
			);

		return posts;
	} catch (error) {
		console.error("Error reading blog posts:", error);
		return []; // Return empty array on failure
	}
}
