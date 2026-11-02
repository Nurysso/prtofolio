import { getCollection } from 'astro:content';

// Drafts show up in `astro dev` and are left out of production builds.
export async function getPosts() {
  const posts = await getCollection('writing', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date - a.data.date);
}

export const readingTime = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 230));
