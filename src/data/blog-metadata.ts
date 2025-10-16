import { PostMetadata } from "@/utils/blog-types";

const blogPostsMetadata: PostMetadata[] = [
	{
		id: 1,
		title: "The Rise of Next.js",
		date: "Oct, 2024",
		excerpt: `React has long reigned as the undisputed king of front-end development,
		giving developers a powerful, component-based library for building complex
		user interfaces. But in the modern web era, a library alone isn't enough.
		Applications need to be lightning-fast, highly optimized for search engines
		(SEO), and easy to deploy.`,
		slug: "The-rise-of-nextjs",
	},

	{
		id: 2,
		title: "What actually is Coding?",
		date: "Aug , 2024",
		excerpt:
			"It's not just about typing syntax; it's about problem-solving and system design.",
		slug: "reality-of-coding",
	},
];

export default blogPostsMetadata;
