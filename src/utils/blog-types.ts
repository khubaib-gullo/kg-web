export type PostMetadata = {
	title: string;
	date: string;
	excerpt: string;
	id: number;
	slug: string;
};

export type Post = PostMetadata & {
	content?: string;
};
