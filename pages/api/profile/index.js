import { authorize } from '../../../lib/middlewares/authorize';
import dbConnect from '../../../lib/middlewares/mongoose';
import { User } from '../../../lib/models/user';
import { Post } from '../../../lib/models/post';
import _ from 'lodash';
import { Types } from 'mongoose';

export default async function handle(req, res) {
  switch (req.method) {
    case 'GET': {
      try {
        await dbConnect();
        authorize(req, res);
        const userRecord = await User.findById(req.user._id);
        const posts = await Post.find({ user: req.user._id })
          .lean()
          .select('-markdown')
          .sort({ createdAt: '-1' });
        return res
          .status(200)
          .json({ message: 'success', user: userRecord, posts });
      } catch (e) {
        return res.status(200).json({ message: 'failed', error: e.message });
      }
    }

    case 'POST': {
      try {
        await dbConnect();
        authorize(req, res);
        const update = _.pick(req.body, [
          'name',
          'bio',
          'socials',
          'password',
          'photo',
        ]);
        const updatedUser = await User.findByIdAndUpdate(req.user._id, update, {
          new: true,
        });
        return res.status(200).json({ message: 'success', user: updatedUser });
      } catch (e) {
        return res.status(400).json({ message: 'failed', error: e.message });
      }
    }

    default: {
      res.json({
        message: 'failed!',
        error: 'Can not handle ' + req.method + ' request',
      });
    }
  }
}
