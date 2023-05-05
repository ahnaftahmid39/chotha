import jwt from 'jsonwebtoken';

export function authorize(req, res) {
  let token = req.headers['authorization'];
  console.log(token);
  let error = { status: 200, message: '' };
  if (!!!token) {
    error.message = 'Token not found!';
    error.status = 401;
  }
  // Bearer 1234abcd
  else {
    token = token.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
      } catch (err) {
        error = { status: 400, message: err.message, error: err };
      }
    } else {
      error = { status: 401, message: 'Token not found' };
    }
  }

  return error;
}
