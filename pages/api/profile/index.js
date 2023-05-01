import _ from 'lodash';

import { authorize } from '../../../lib/middlewares/authorize';
import dbConnect from '../../../lib/middlewares/mongoose';
import { Post } from '../../../lib/models/post';
import { User, validate } from '../../../lib/models/user';

export default async function handle(req, res) {
  switch (req.method) {
    case 'GET': {
      try {
        await dbConnect();
        let error = authorize(req, res);
        if (error.status != 200) {
          return res.status(error.status).json({
            status: error.status,
            message: error.message,
            error: new Error(error.message),
          });
        }
        const userRecord = await User.findById(req.user._id);
        if (req.headers['fetchposts'] == 'true') {
          const posts = await Post.find({ user: req.user._id })
            .lean()
            .select('-markdown')
            .sort({ createdAt: '-1' });
          return res
            .status(200)
            .json({ message: 'success', user: userRecord, posts });
        } else {
          return res.status(200).json({ message: 'success', user: userRecord });
        }
      } catch (e) {
        return res.status(200).json({ message: 'failed', error: e.message });
      }
    }

    case 'POST': {
      try {
        await dbConnect();
        let authResult = authorize(req, res);
        if (authResult.status != 200) {
          return res.status(authResult.status).json({
            status: authResult.status,
            message: authResult.message,
            error: authResult.error || new Error(authResult.message),
          });
        }
        const update = _.pick(req.body, [
          'name',
          'bio',
          'socials',
          'password',
          'photo',
        ]);
        const updatedUser = await User.findByIdAndUpdate(req.user._id, update, {
          new: true,
        }).select({ password: 0 });
        return res.status(200).json({ message: 'success', user: updatedUser });
      } catch (e) {
        return res.status(400).json({ message: 'failed', error: e });
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
