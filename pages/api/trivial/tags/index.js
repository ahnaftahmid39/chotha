import { authorize } from '../../../../lib/middlewares/authorize';
import dbConnect from '../../../../lib/middlewares/mongoose';
import { Tags } from '../../../../lib/models/tags';

export default async function handle(req, res) {
  switch (req.method) {
    case 'GET': {
      try {
        const result = await Tags.find();
        return res
          .status(200)
          .json({ message: 'success', status: 200, tags: result });
      } catch (e) {
        return res.status(400).json({ message: 'failed', error: e.message });
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

        if (!!!req.body.tagName) {
          throw Error('Must provide a tag name');
        }
        const tagName = req.body.tagName;
        const result = await Tags.create({ tagName });

        return res
          .status(201)
          .json({ status: 201, message: 'success', tag: result });
      } catch (e) {
        return res.status(400).json({ message: e.message, error: e });
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
