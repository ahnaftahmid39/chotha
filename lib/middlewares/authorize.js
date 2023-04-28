import jwt from 'jsonwebtoken';

export function authorize(req, res) {
  let token = req.headers['authorization'];
  let error = { status: 200, message: '' };
  if (!token) {
    error.message = 'Token not found!';
    error.status = 401;
  }
  // Bearer 1234abcd
  else token = token.split(' ')[1].trim();
  try {
    console.log(token, process.env.JWT_SECRET_KEY);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    error = { status: 400, message: err.message, error: err };
  }
  return error;
}
