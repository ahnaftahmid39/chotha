import { verifyToken } from '../../../lib/controllers/user';
import dbConnect from '../../../lib/middlewares/mongoose';

export default async function handle(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET': {
      if (req.query.shortToken) {
        await verifyToken(req, res, req.query.shortToken);
        break;
      }
    }
    default: {
      res.json({
        message: 'failed!',
        error:
          'Something went wrong! this route handles only get requests with query params',
      });
    }
  }
}
