import { Types } from 'mongoose';

import { authorize } from '../../../lib/middlewares/authorize';
import dbConnect from '../../../lib/middlewares/mongoose';
import { Comment } from '../../../lib/models/comment';
import { Post } from '../../../lib/models/post';
import { User } from '../../../lib/models/user';

export default async function handle(req, res) {
  switch (req.method) {
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

        if (!!!req.body.postId) {
          throw Error('Must give a postId');
        }
        if (!!!req.body.comment) {
          throw Error('Must provide a comment');
        }

        const postId = Types.ObjectId(req.body.postId);
        const userId = req.user._id;
        const comment = req.body.comment;
        const result = await Comment.create({ postId, userId, comment });
        console.log(result);

        return res
          .status(201)
          .json({ status: 201, message: 'Success', comment: result });
      } catch (e) {
        return res
          .status(400)
          .json({ status: 400, message: e.message, error: e });
      }
    }

    default: {
      res.status(200).json({
        message: 'failed!',
        error: 'Can not handle ' + req.method + ' request',
      });
    }
  }
}
