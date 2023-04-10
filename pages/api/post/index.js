import { Types } from 'mongoose';
import { getAllPostsWithoutMarkdown } from '../../../lib/controllers/post';
import { authorize } from '../../../lib/middlewares/authorize';
import dbConnect from '../../../lib/middlewares/mongoose';
import { Post } from '../../../lib/models/post';

export default async function handle(req, res) {
  switch (req.method) {
    case 'GET': {
      try {
        const posts = await getAllPostsWithoutMarkdown();
        return res.status(200).json({ message: 'success', posts });
      } catch (e) {
        return res.status(400).json({ message: 'failed', error: e.message });
      }
    }

    case 'POST': {
      try {
        await dbConnect();
        authorize(req, res);

        const post = new Post(req.body);
        post.user = req.user._id;
        const result = await post.save();
        return res.status(201).json({ message: 'success', result });
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
