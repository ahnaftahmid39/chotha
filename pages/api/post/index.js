import { authorize } from '../../../lib/middlewares/authorize';
import dbConnect from '../../../lib/middlewares/mongoose';

export default async function handle(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET': {
      try {
        //middlewares
        await authorize(req, res);

        //api-related
        res.json({ food: 'ice cream' });
      } catch (e) {
        console.log(e.message);
      }

      break;
    }

    case 'POST': {
      try {
        res.json({ message: 'ok' });
      } catch (e) {
        console.log(e.message);
        res.status(400).json({ error: e.message });
      }
      break;
    }

    default: {
      res.json({
        message: 'failed!',
        error: 'Can not handle ' + req.method + ' request',
      });
    }
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};
