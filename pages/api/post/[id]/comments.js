import { Types } from 'mongoose';

import { authorize } from '../../../../lib/middlewares/authorize';
import dbConnect from '../../../../lib/middlewares/mongoose';
import { Comment } from '../../../../lib/models/comment';
import { Post } from '../../../../lib/models/post';
import { User } from '../../../../lib/models/user';

export default async function handle(req, res) {
  switch (req.method) {
    case 'GET': {
      try {
        await dbConnect();

        const postId = Types.ObjectId(req.query.id);
        const result = await Comment.find({ postId: postId }).populate(
          'user',
          'name photo'
        );
        return res
          .status(200)
          .json({ status: 200, message: 'Success', comments: result });
      } catch (e) {
        return res
          .status(400)
          .json({ status: 400, message: e.message, error: e });
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

        if (!!!req.body.comment) {
          throw Error('Must provide a comment');
        }

        const postId = Types.ObjectId(req.query.id);
        const user = req.user._id;
        const comment = req.body.comment;
        const result = await Comment.create({ postId, user, comment });

        return res
          .status(201)
          .json({ status: 201, message: 'Success', comment: result });
      } catch (e) {
        console.log(e.message);
        return res
          .status(400)
          .json({ status: 400, message: e.message, error: e });
      }
    }

    default: {
      res.status(400).json({
        message: 'failed!',
        error: 'Can not handle ' + req.method + ' request',
      });
    }
  }
}
