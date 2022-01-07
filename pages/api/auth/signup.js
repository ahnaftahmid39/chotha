import { signup } from '../../../lib/controllers/user';
import dbConnect from '../../../lib/middlewares/mongoose';

export default async function handle(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'POST': {
      await signup(req, res);
      break;
    }
    default: {
      res.json({
        message: 'failed!',
        error: 'Can not handle requests other than POST',
      });
      break;
    }
  }
}
