"use client";
import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";

import {
	Home,
	Code,
	Mail,
	GitBranch,
	Terminal,
	ExternalLink,
	Linkedin,
	Rss,
	Github,
	Calendar,
	ChevronLeft,
	Menu,
	X,
} from "lucide-react";
import { Post, PostMetadata } from "@/utils/blog-types";
import blogPostsMetadata from "@/data/blog-metadata";

const userProfile = {
	name: "Muhammad Khubaib",
	title: "Full Stack Developer & AI Enthusiast",
	bio: "Crafting robust and scalable software solutions with a focus on modern web technologies and machine learning integration. I thrive on turning complex problems into elegant, high-performance applications.",
	email: "gullokhubaib@gmail.com",
	linkedin: "https://www.linkedin.com/in/khubaibgullo",
	github: "https://github.com/khubaib-gullo/khubaib-gullo",
};

const skills = [
	{ name: "React.js / Next.js", icon: "react", level: "Expert" },
	{ name: "Node.js / Express", icon: "node", level: "Expert" },
	{ name: "TypeScript", icon: "ts", level: "Advanced" },
	{ name: "Python / Django", icon: "python", level: "Advanced" },
	{ name: "Tailwind CSS", icon: "css", level: "Expert" },
	{ name: "Firebase / MongoDB", icon: "db", level: "Intermediate" },
	{ name: "LLMs / Generative AI", icon: "ai", level: "Advanced" },
	{ name: "Docker / K8s", icon: "devops", level: "Intermediate" },
];

const projects = [
	{
		title: "Real-time Chat Application",
		description:
			"Built a realtime web application for messaging text and media using MERN Stack ",
		technologies: [
			"Next.js",
			"TypeScript",
			"Node.js",
			"Express.js",
			"MongoDB",
			"Socket.io",
			"Zustand",
			"Tailwind CSS",
		],
		link: "https://github.com/khubaib-gullo/realtime_chat_app",
	},
	{
		title: "Admit Ease",
		description:
			"A powerful web app using advanced OCR and AI for seamless form completion. Upload any admission document picture; the system intelligently reads and maps key data to the correct form fields. Get accurate, pre-filled forms in seconds.",
		technologies: ["React", "Typescript", "Gemini Api", "FireBase"],
		link: "https://github.com/khubaib-gullo/Admit_Ease",
	},
	{
		title: "Smart Bite",
		description: "Food Ordering app in flutter ",
		technologies: ["Flutter", "Dart", "Firebase"],
		link: "https://github.com/khubaib-gullo/smart_bite",
	},

	{
		title: "Personal Portfolio",
		description:
			"My personal site, designed with a custom CLI-inspired theme for maximum developer appeal and minimal loading time.",
		technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "JS"],
		link: "https://github.com/khubaib-gullo/k-gullo",
	},
];

const blogPosts = blogPostsMetadata;

interface GlowingButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	active?: boolean;
	icon?: React.ElementType;
	className?: string;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({
	children,
	onClick,
	active = false,
	icon: Icon,
	className = "",
	type = "button",
	disabled = false,
}) => (
	<button
		type={type}
		onClick={onClick}
		disabled={disabled}
		className={`
      flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
      bg-gray-800 border ${
				active
					? "border-green-400 text-green-400 shadow-green"
					: "border-gray-700 text-gray-300 hover:border-green-500 hover:text-green-500"
			}
      shadow-md ${
				active
					? "shadow-[0_0_10px_rgba(52,211,153,0.5)]"
					: "hover:shadow-[0_0_5px_rgba(52,211,153,0.2)]"
			}
      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${className}
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    `}
	>
		{Icon && <Icon size={18} />}
		<span>{children}</span>
	</button>
);

type PageKey = "home" | "projects" | "blog" | "contact";

interface HeaderProps {
	currentPage: PageKey;
	setCurrentPage: (page: PageKey) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const handleNavigation = (key: PageKey) => {
		setCurrentPage(key);
		setIsMobileMenuOpen(false);
	};

	const MobileIcon = isMobileMenuOpen ? X : Menu;

	const navItems = [
		{ name: "Home", key: "home", icon: Home },
		{ name: "Projects", key: "projects", icon: Code },
		{ name: "Blog", key: "blog", icon: Rss },
		{ name: "Contact", key: "contact", icon: Mail },
	];

	return (
		<header className="fixed top-0 left-0 w-full z-10 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
				<div
					onClick={() => handleNavigation("home" as PageKey)}
					className="flex items-center space-x-2 text-xl font-mono text-green-400 tracking-wider"
				>
					<Terminal className="text-green-500" size={24} />
					<span>{userProfile.name}</span>
				</div>
				<nav className="flex space-x-3 sm:space-x-4">
					{navItems.map((item) => (
						<GlowingButton
							key={item.key}
							// onClick={() => setCurrentPage(item.key as PageKey)}
							onClick={() => handleNavigation(item.key as PageKey)}
							active={currentPage === item.key}
							icon={item.icon}
							className="hidden sm:flex"
						>
							{item.name}
						</GlowingButton>
					))}
					<div className="sm:hidden">
						{/* Simple mobile menu button for small screens */}
						{/* <GlowingButton icon={Rss}>Menu</GlowingButton> */}
						<GlowingButton
							icon={MobileIcon}
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							{isMobileMenuOpen ? "Close" : "Menu"}
						</GlowingButton>
					</div>

					{isMobileMenuOpen && (
						<div className="sm:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-gray-800 shadow-lg z-10">
							{navItems.map((item) => (
								<div
									key={item.key}
									className="px-4 py-3 border-b border-gray-800 last:border-b-0"
								>
									<button
										className="w-full text-left flex items-center space-x-3 text-lg text-white hover:text-green-400 transition duration-150"
										onClick={() => handleNavigation(item.key as PageKey)}
									>
										<item.icon size={20} className="text-green-500" />
										<span>{item.name}</span>
									</button>
								</div>
							))}
						</div>
					)}
				</nav>
			</div>
		</header>
	);
};

interface HeroProps {
	onProjectClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onProjectClick }) => (
	<section className="min-h-screen pt-28 pb-12 flex flex-col items-center justify-center text-center px-4">
		<div className="max-w-4xl w-full">
			<h3 className="text-4xl font-mono text-green-400 mb-2 animate-pulse">
				{"> Hello..."}
				<span className="blink-cursor">_</span>
			</h3>
			<h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-4 leading-tight">
				I&apos;m
				<span className="text-green-400 transition duration-500 hover:text-green-300">
					{" " + userProfile.name}
				</span>
			</h1>
			<h2 className="text-2xl sm:text-3xl font-light text-gray-300 mb-6">
				A{" "}
				<span className="font-semibold text-cyan-400">{userProfile.title}</span>
			</h2>
			<p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
				{userProfile.bio}
			</p>
			<div className="flex flex-wrap justify-center gap-4">
				<GlowingButton
					onClick={onProjectClick}
					icon={Code}
					className="text-lg px-6 py-3"
				>
					View Projects
				</GlowingButton>
				<a
					href={userProfile.linkedin}
					target="_blank"
					rel="noopener noreferrer"
				>
					<GlowingButton icon={Linkedin} className="text-lg px-6 py-3">
						LinkedIn
					</GlowingButton>
				</a>
				<a href={userProfile.github} target="_blank" rel="noopener noreferrer">
					<GlowingButton icon={Github} className="text-lg px-6 py-3">
						Github
					</GlowingButton>
				</a>
				<a href={`mailto:${userProfile.email}`}>
					<GlowingButton icon={Mail} className="text-lg px-6 py-3">
						Gmail
					</GlowingButton>
				</a>
			</div>
		</div>
	</section>
);

const SkillsSection: React.FC = () => (
	<section className="py-16 px-4 bg-gray-950 border-t border-gray-800">
		<div className="max-w-7xl mx-auto">
			<h3 className="text-3xl font-bold text-white mb-10 text-center border-b-2 border-green-500/50 inline-block pb-1"></h3>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{skills.map((skill, index) => (
					<div
						key={index}
						className="p-5 bg-gray-900 rounded-xl border border-gray-800 hover:border-green-600 transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-green-900/50"
					>
						<div className="flex items-center space-x-3 mb-2 sm:text-sm">
							<span className="text-green-400 text-2xl">
								<Code size={24} />
							</span>
							<h4 className="text-lg font-semibold text-white ">
								{skill.name}
							</h4>
						</div>
						<p className="text-sm text-gray-500 uppercase tracking-widest">
							{skill.level}
						</p>
					</div>
				))}
			</div>
		</div>
	</section>
);

const ProjectsList: React.FC = () => (
	<section className="py-16 px-4">
		<div className="max-w-7xl mx-auto">
			<h3 className="text-3xl font-bold text-white mb-10 text-center border-b-2 border-green-500/50 inline-block pb-1"></h3>
			<div className="space-y-12">
				{projects.map((project, index) => (
					<div
						key={index}
						className="bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-800 flex flex-col md:flex-row shadow-xl"
					>
						<div className="md:w-3/4">
							<h4 className="text-2xl font-bold text-green-400 mb-2 flex items-center">
								<GitBranch className="mr-3" size={24} />
								{project.title}
							</h4>
							<p className="text-gray-400 mb-4">{project.description}</p>
							<div className="flex flex-wrap gap-2 mb-4">
								{project.technologies.map((tech, i) => (
									<span
										key={i}
										className="px-3 py-1 text-xs font-mono bg-gray-800 text-cyan-400 rounded-full border border-cyan-500/30"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
						<div className="md:w-1/4 flex md:flex-col justify-end items-start md:items-end mt-4 md:mt-0">
							<a
								href={project.link}
								target="_blank"
								rel="noopener noreferrer"
								className="self-start md:self-end"
							>
								<GlowingButton
									icon={ExternalLink}
									className="text-sm px-4 py-2"
								>
									View Source
								</GlowingButton>
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	</section>
);

const BlogSection: React.FC<{ onSelectPost: (post: Post) => void }> = ({
	onSelectPost,
}) => (
	<section className="py-16 px-4">
		<div className="max-w-3xl mx-auto">
			<h3 className="text-3xl font-bold text-white mb-10 text-center border-b-2 border-green-500/50 inline-block pb-1"></h3>
			<div className="space-y-6">
				{blogPosts.map((post) => (
					<div
						key={post.id}
						className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-green-600 transition duration-300 cursor-pointer shadow-lg hover:shadow-green-900/50"
						onClick={() => onSelectPost(post)}
					>
						<h4 className="text-xl font-bold text-green-400 mb-2">
							{post.title}
						</h4>
						<div className="flex items-center text-sm text-gray-500 mb-3">
							<Calendar size={16} className="mr-2" />
							<span>{post.date}</span>
						</div>
						<p className="text-gray-400 mb-3">{post.excerpt}</p>
						<span className="text-cyan-400 font-mono text-sm inline-flex items-center">
							[read more <ExternalLink size={14} className="ml-1" />]
						</span>
					</div>
				))}
			</div>
		</div>
	</section>
);

interface BlogPostDetailProps {
	post: Post;
	onBack: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack }) => {
	const [htmlContent, setHtmlContent] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchPostHtml() {
			setLoading(true);
			setError(null);
			setHtmlContent(null);

			try {
				const response = await fetch(`/blog-html/${post.slug}.html`);

				if (!response.ok) {
					if (response.status === 404) {
						throw new Error(`Blog post "${post.slug}.html" not found.`);
					}
					throw new Error(`Failed to fetch content: ${response.statusText}`);
				}

				const text = await response.text();
				setHtmlContent(text);
			} catch (err: unknown) {
				console.error("Error fetching blog post HTML:", err);

				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred.");
				}
			} finally {
				setLoading(false);
			}
		}

		if (post?.slug) {
			fetchPostHtml();
		}
	}, [post.slug]);
	return (
		<section className="py-16 px-4">
			<div className="max-w-3xl mx-auto">
				<GlowingButton onClick={onBack} icon={ChevronLeft} className="mb-8">
					Back to Blog List
				</GlowingButton>

				<article className="bg-gray-900 p-6 sm:p-8 rounded-xl border border-green-800 shadow-2xl">
					<h1 className="text-4xl sm:text-5xl font-extrabold text-green-400 mb-4">
						{post.title}
					</h1>
					<div className="flex items-center text-md text-gray-500 mb-6 border-b border-gray-700 pb-4">
						<Calendar size={18} className="mr-2" />
						<span>Published on {post.date}</span>
					</div>

					<div className="prose prose-invert max-w-none">
						{loading && (
							<p className="text-green-500 font-mono">
								Loading post content...
							</p>
						)}
						{error && <p className="text-red-500 font-mono">Error: {error}</p>}
						{htmlContent && (
							<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
						)}
					</div>
				</article>
			</div>
		</section>
	);
};

const ContactSection: React.FC = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [status, setStatus] = useState<"sending" | "sent" | "error" | null>(
		null
	);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (status) setStatus(null);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("sending");
		setTimeout(() => {
			console.log("Simulated Contact Form Submission:", formData);
			setStatus("sent");
		}, 2000);
	};

	return (
		<section className="py-16 px-4 bg-gray-950 border-t border-gray-800">
			<div className="max-w-3xl mx-auto">
				<h3 className="text-3xl font-bold text-white mb-10 text-center border-b-2 border-green-500/50 inline-block pb-1"></h3>
				<p className="text-gray-400 text-center mb-8">
					Have a project idea or a question? Send me a message directly or
					connect via social platforms.
				</p>
				<div className="flex justify-center space-x-6 mt-10 mb-10">
					<a
						href={`mailto:${userProfile.email}`}
						className="text-gray-400 hover:text-green-400 transition"
						aria-label="Email"
					>
						gullokhubaib@gmail.com
					</a>
					<a
						href={userProfile.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-400 hover:text-green-400 transition"
						aria-label="LinkedIn"
					>
						<Linkedin size={32} />
					</a>
					<a
						href={userProfile.github}
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-400 hover:text-green-400 transition "
						aria-label="GitHub"
					>
						<Github size={32} />
					</a>
				</div>

				<form
					onSubmit={handleSubmit}
					className="space-y-6 p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-2xl"
				>
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-300 mb-2"
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-green-500 focus:border-green-500 transition duration-200"
							placeholder="Your Name"
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-300 mb-2"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-green-500 focus:border-green-500 transition duration-200"
							placeholder="your.email@example.com"
						/>
					</div>
					<div>
						<label
							htmlFor="message"
							className="block text-sm font-medium text-gray-300 mb-2"
						>
							Message
						</label>
						<textarea
							id="message"
							name="message"
							rows={4}
							value={formData.message}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-green-500 focus:border-green-500 transition duration-200"
							placeholder="Your message here..."
						></textarea>
					</div>
					<div className="flex flex-col sm:flex-row items-center justify-between pt-2">
						<GlowingButton
							type="submit"
							disabled={status === "sending"}
							className="w-full sm:w-auto"
						>
							{status === "sending" ? "SENDING..." : "SEND MESSAGE"}
						</GlowingButton>
						{status === "sent" && (
							<p className="text-green-500 mt-3 sm:mt-0 font-mono">
								Message Sent Successfully!
							</p>
						)}
						{status === "error" && (
							<p className="text-red-500 mt-3 sm:mt-0 font-mono">
								Failed to send message.
							</p>
						)}
					</div>
				</form>
			</div>
		</section>
	);
};

const Footer: React.FC = () => (
	<footer className="bg-gray-900 border-t border-gray-800 py-6">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
			<p>
				&copy; {new Date().getFullYear()} {userProfile.name}. All systems
				nominal.
			</p>
			<p className="mt-1 font-mono text-xs">
				Built with React & Tailwind CSS. CLI-inspired.
			</p>
		</div>
	</footer>
);

const App: React.FC = () => {
	const [currentPage, setCurrentPage] = useState<PageKey>("home");
	const [selectedPost, setSelectedPost] = useState<Post | null>(null);

	const handleSelectPost = (post: Post) => {
		setSelectedPost(post);
		setCurrentPage("blog");
	};

	const handleSetCurrentPage = (page: PageKey) => {
		setCurrentPage(page);
		if (page !== "blog") {
			setSelectedPost(null);
		}
	};

	const PageContentComponent = useMemo(() => {
		if (currentPage === "blog" && selectedPost) {
			return (
				<BlogPostDetail
					post={selectedPost}
					onBack={() => setSelectedPost(null)}
				/>
			);
		}

		{
		}
		switch (currentPage) {
			case "home":
				return (
					<>
						<Hero onProjectClick={() => handleSetCurrentPage("projects")} />
						<SkillsSection />
					</>
				);
			case "projects":
				return <ProjectsList />;
			case "blog":
				// FIX: Renders the blog list if no specific post is selected
				return <BlogSection onSelectPost={handleSelectPost} />;
			case "contact":
				return <ContactSection />;
			default:
				// Fallback case (should ideally be unreachable now)
				return <Hero onProjectClick={() => handleSetCurrentPage("projects")} />;
		}
	}, [currentPage, selectedPost]);

	return (
		<div className="font-sans antialiased text-gray-300 min-h-screen bg-gray-950">
			<Header currentPage={currentPage} setCurrentPage={handleSetCurrentPage} />
			{/* padding-top: 80px offset for fixed header */}
			<main className="bg-gray-950 pt-[80px] min-h-screen">
				{PageContentComponent}
			</main>
			<Footer />
		</div>
	);
};

export default App;
