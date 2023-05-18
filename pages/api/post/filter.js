import { Types } from 'mongoose';

import dbConnect from '../../../lib/middlewares/mongoose';
import { Post } from '../../../lib/models/post';
import { User } from '../../../lib/models/user';

export default async function handle(req, res) {
  switch (req.method) {
    case 'POST': {
      try {
        await dbConnect();
        let sortBy = req.body.sortBy || 'createdAt';
        const order = req.body.order == 'asc' ? 1 : -1 || -1;
        const limit = parseInt(req.body.limit) || 100;
        const skip = parseInt(req.body.skip) || 0;
        const filters = req.body.filters;
        const search = req.body.search;

        const args = {};
        const proj = {};
        const sort = {};

        if (filters) {
          if (filters['tags']) {
            args['tags'] = { $in: filters['tags'] };
          }
        }

        if (search) {
          args['$text'] = { $search: search };
          proj['score'] = { $meta: 'textScore' };
        }

        if (sortBy == 'relevance') {
          sort['score'] = { $meta: 'textScore' };
        } else {
          sort[sortBy] = order;
        }
        const posts = await Post.find(args, proj)
          .populate('user', 'name email')
          .select('-markdown')
          .sort(sort)
          .skip(skip)
          .limit(limit);
        return res.status(200).json({ message: 'success', posts });
      } catch (e) {
        // console.log(err);
        return res.status(400).json({ message: e.message, error: e });
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
