import { vibeCodingPost } from "@/data/posts/vibe-coding";
import { inferenceEngineeringPost } from "@/data/posts/inference-engineering";
import { cloudComputingPost } from "@/data/posts/cloud-computing";
import { serverlessArchitecturePost } from "@/data/posts/serverless-architecture";
import { dockerKubernetesCloudPost } from "@/data/posts/docker-kubernetes-cloud";

export type BlogTable = {
  headers: { en: string[]; id: string[] };
  rows: { en: string[][]; id: string[][] };
  caption?: { en: string; id: string };
};

export type BlogSection = {
  id: string;
  title: { en: string; id: string };
  paragraphs: { en: string[]; id: string[] };
  callout?: {
    type: "note" | "warning" | "tip";
    text: { en: string; id: string };
  };
  code?: {
    language: string;
    snippet: string;
    caption?: { en: string; id: string };
  };
  table?: BlogTable;
  diagram?: "inference-pipeline" | "inference-architecture";
  checklist?: { en: string[]; id: string[] };
};

export type BlogPost = {
  slug: string;
  title: { en: string; id: string };
  summary: { en: string; id: string };
  category: { en: string; id: string };
  tags: string[];
  publishedDate: string;
  updatedDate?: string;
  author: string;
  readingTime: { en: string; id: string };
  coverImage?: string;
  status: "published" | "draft";
  seoTitle: { en: string; id: string };
  seoDescription: { en: string; id: string };
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  dockerKubernetesCloudPost,
  serverlessArchitecturePost,
  cloudComputingPost,
  inferenceEngineeringPost,
  vibeCodingPost,
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug && post.status === "published");
}
