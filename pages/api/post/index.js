import { Types } from 'mongoose';
import { authorize } from '../../../lib/middlewares/authorize';
import dbConnect from '../../../lib/middlewares/mongoose';
import { Post } from '../../../lib/models/post';

export default async function handle(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET': {
      try {
        const posts = await Post.find().lean();
        return res.status(200).json({ message: 'success', posts });
      } catch (e) {
        return res.status(400).json({ message: 'failed', error: e.message });
      }
    }

    case 'POST': {
      try {
        console.log(req.body);
        const post = new Post(req.body);
        // post.subject = 'Others'
        post.user = Types.ObjectId('61d710914d0b9a61b7d67961');
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
