// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getPostsPagination } from '@/lib/api';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  posts: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { firstPosts, afterCursor } = req.body;
    const posts = await getPostsPagination(firstPosts, afterCursor);
    res.status(200).json({ posts: posts.edges });
  } else {
    return res.status(400).json({ posts: null });
  }
}
