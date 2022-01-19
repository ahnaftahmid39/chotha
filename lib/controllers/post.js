import dbConnect from '../middlewares/mongoose';
import { User } from '../models/user';
import { Post } from '../models/post';

export async function getAllPostsWithoutMarkdown() {
  await dbConnect();
  return await Post.find()
    .lean()
    .select('-markdown')
    .populate('user', 'name email');
}

export async function getPostById(id) {
  await dbConnect();
  const post = await Post.findById(id).lean().populate('user', 'name email');
  return post;
}
