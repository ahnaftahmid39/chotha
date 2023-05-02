import { Types } from 'mongoose';
import { authorize } from '../../../../lib/middlewares/authorize';
import dbConnect from '../../../../lib/middlewares/mongoose';
import { Post } from '../../../../lib/models/post';

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
        let error = authorize(req, res);
        if (error.status != 200) {
          return res
            .status(error.status)
            .json({
              status: error.status,
              message: error.message,
              error: new Error(error.message),
            });
        }
        let post = await Post.findById(id);
        if (!post) throw Error('Post not found!');
        if (String(post.user) != req.user._id)
          throw Error("You shall not pass! It's not  your post");
        const update = req.body;
        const result = await Post.findByIdAndUpdate(id, update, { new: true });
        await res.revalidate(`/posts/${id}`);
        return res
          .status(200)
          .json({ status: 200, message: 'success', result });
      } catch (e) {
        return res
          .status(400)
          .json({ status: 400, message: 'Error!', error: e.message });
      }
    }
    case 'DELETE': {
      try {
        let error = authorize(req, res);
        if (error.status != 200) {
          return res
            .status(error.status)
            .json({
              status: error.status,
              message: error.message,
              error: error.error,
            });
        }

        let post = await Post.findById(id);
        if (!post) throw Error('Post not found!');
        if (String(post.user) != req.user._id)
          throw Error("You shall not pass! It's not  your post");
        const result = await Post.findByIdAndDelete(id);
        await res.revalidate(`/posts/${id}`);
        return res
          .status(200)
          .json({ status: 200, message: 'success', result });
      } catch (e) {
        return res
          .status(400)
          .json({ status: 400, message: e.message, error: e });
      }
    }
    default: {
      return res
        .status(400)
        .json({ status: 400, message: 'Cannot ' + req.method });
    }
  }
}
