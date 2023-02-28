import { confirmEmail } from '../../../lib/controllers/user';
import dbConnect from '../../../lib/middlewares/mongoose';

export default async function handle(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET': {
      if (req.query.token) {
        await confirmEmail(req, res, req.query.token);
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
