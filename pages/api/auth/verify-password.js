import { Types } from 'mongoose';

import { authorize } from '../../../lib/middlewares/authorize';
import dbConnect from '../../../lib/middlewares/mongoose';
import { User } from '../../../lib/models/user';

export default async function handle(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'POST': {
      try {
        let authResult = authorize(req, res);
        if (authResult.status != 200) {
          return res.status(400).json(authResult);
        }
        const userId = Types.ObjectId(req.user._id);
        const pass = req.body.password;
        if (pass) {
          const { password: userPass } = await User.findById(userId).select(
            'password'
          );
          if (userPass !== pass) {
            return res.status(400).json({
              match: false,
              message: 'Password does not match',
            });
          } else {
            return res.status(200).json({
              message: 'Password matches',
              match: true,
            });
          }
        } else {
          throw Error('No password field found in request body');
        }
      } catch (error) {
        return res.status(400).json({
          message: error.message,
          error: error,
        });
      }
    }
    default: {
      return res.status(400).json({
        message: 'failed!',
        error: 'Something went wrong! this route handles only post requests',
      });
    }
  }
}
