import { Types } from 'mongoose';
import { authorize } from '../../../lib/middlewares/authorize';
import dbConnect from '../../../lib/middlewares/mongoose';
import { Post } from '../../../lib/models/post';

export default async function handle(req, res) {
  await dbConnect();
  const id = Types.ObjectId(req.query.id);
  switch (req.method) {
    case 'GET': {
      try {
        const post = await Post.findById(id);
        if (!post) throw Error('Not found!');
        return res
          .status(200)
          .json({ status: 200, message: 'success!', post: post });
      } catch (e) {
        return res
          .status(400)
          .json({ status: 400, message: 'error', error: e.message });
      }
    }
    case 'PUT': {
      try {
        authorize(req, res);
        let post = await Post.findById(id);
        if (!post) throw Error('Post not found!');
        if (post.user != req.user._id)
          throw Error("You shall not pass! It's not  your post");
        const update = req.body;
        const result = await Post.findByIdAndUpdate(id, update, { new: true });

        await res.unstable_revalidate(`/posts/${id}`);
        return res
          .status(200)
          .json({ status: 200, message: 'success', result });
      } catch (e) {
        return res
          .status(400)
          .json({ status: 400, message: 'Error!', error: e.message });
      }
    }
    default: {
      return res
        .status(400)
        .json({ status: 400, message: 'Cannot ' + req.method });
    }
  }
}
