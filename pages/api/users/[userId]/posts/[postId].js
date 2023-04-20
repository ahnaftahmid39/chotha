import { Types } from 'mongoose';
import dbConnect from '../../../../../lib/middlewares/mongoose';
import { Post } from '../../../../../lib/models/post';

export default async function handle(req, res) {
  await dbConnect();
  const postId = Types.ObjectId(req.query.postId);
  const userId = Types.ObjectId(req.query.userId);
  switch (req.method) {
    case 'GET': {
      try {
        const posts = await Post.find({ _id: postId, user: userId });
        if (!posts.length) throw Error('Not found!');
        return res
          .status(200)
          .json({ status: 200, message: 'success!', post: posts[0] });
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
