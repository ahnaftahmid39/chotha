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
        const users = await User.find({ confirmed: true }).select(
          '-password -createdAt -updatedAt -confirmed'
        );
        return res.status(200).json({ message: 'success', users });
      } catch (e) {
        return res.status(200).json({ message: 'failed', error: e.message });
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
