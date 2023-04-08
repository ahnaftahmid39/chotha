import ImageKit from 'imagekit';
import fs from 'fs';
import formHandle from '../../../lib/middlewares/form_data';

export default async function handle(req, res) {
  switch (req.method) {
    case 'POST':
      const imagekit = new ImageKit({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        publicKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      });
      {
        try {
          // follwing middleware uses callback, so I had to use promise
          await formHandle(req, res);

          fs.readFile(req.files.photo.filepath, function (err, data) {
            if (err) throw err; // Fail if the file can't be read.
            imagekit.upload(
              {
                file: data, //required
                fileName: req.files.photo.newFilename, //required
              },
              function (error, result) {
                if (error) throw error;
                else {
                  res.status(200).json({ status: 200, message: 'ok', result });
                }
              }
            );
          });
        } catch (e) {
          console.log(e.message);
          res.status(400).json({ status: 400, error: e.message });
        }
      }
      break;

    default:
      res.status(400).json({ status: 400, error: `Cannot ${req.method}` });
      break;
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};
