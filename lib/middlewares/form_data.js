import formidable from 'formidable';

/**
 * if req is multipart/form-data, makes req.body = fields and req.files = files
 * in next js, make sure to disable bodyParser
 * @param {Request} req
 * @param {Response} res
*/
export default function formHandle(req, res) {
  return new Promise((resolve, reject) => {
    if (req.headers['content-type'].indexOf('multipart/form-data') !== -1) {
      let form = new formidable.IncomingForm({
        keepExtensions: true,
        multiples: true,
      });
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.log(err.message);
          reject(err);
        }
        req.body = fields;
        req.files = files;
        resolve();
      });
    } else {
      reject('Not multipart/form-data');
    }
  });
}
