const jwt = require('jsonwebtoken');

export function authorize(req, res) {
  let token = req.headers['authorization'];

  if (!token) {
    res.status(401).json({ message: 'Access denied! No token provided!' });
    throw Error('Token not found!');
  }
  // Bearer 1234abcd
  else token = token.split(' ')[1].trim();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
    throw Error('Invalid Token!');
  }
}
