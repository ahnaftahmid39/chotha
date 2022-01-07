import dbConnect from '../middlewares/mongoose';
import { User } from '../models/user';
import { Post } from '../models/post';

export async function getAllPostsWithoutMarkdown() {
  await dbConnect();
  const posts = await Post.find().select('-markdown');
  return posts;
}

export async function getPostById(id) {
  await dbConnect();
  return await Post.findById(id).lean().populate('user', 'name email');
}
