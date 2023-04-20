import { Types } from 'mongoose';
import dbConnect from '../../../../lib/middlewares/mongoose';
import { Post } from '../../../../lib/models/post';
import { User } from '../../../../lib/models/user';

export default async function handle(req, res) {
  await dbConnect();
  const id = Types.ObjectId(req.query.userId);
  switch (req.method) {
    case 'GET': {
      try {
        const user = await User.findById(id).select(
          '-password -createdAt -updatedAt -confirmed'
        );
        const posts = await Post.find({ user: id })
          .lean()
          .select('-markdown')
          .sort({ createdAt: '-1' });
        return res.status(200).json({ message: 'success', user, posts });
      } catch (e) {
        return res
          .status(400)
          .json({ status: 400, message: 'error', error: e.message });
      }
    }

    default: {
      return res
        .status(400)
        .json({ status: 400, message: 'Cannot ' + req.method });
    }
  }
}
