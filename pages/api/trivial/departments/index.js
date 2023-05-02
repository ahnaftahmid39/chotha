import { authorize } from '../../../../lib/middlewares/authorize';
import dbConnect from '../../../../lib/middlewares/mongoose';
import { Department } from '../../../../lib/models/department';

export default async function handle(req, res) {
  switch (req.method) {
    case 'GET': {
      try {
        const result = await Department.find();
        return res
          .status(200)
          .json({ message: 'success', status: 200, departments: result });
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

        if (!!!req.body.deptName) {
          throw Error('Must provide a department name');
        }
        const deptName = req.body.deptName;
        const institute = req.body.institute;
        const result = await Department.create({ deptName, institute });

        return res
          .status(201)
          .json({ status: 201, message: 'success', department: result });
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
