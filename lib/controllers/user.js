import { validate, User } from '../models/user';
import { sendConfirmationEmail } from '../email/confirmation_email';
import _ from 'lodash';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  let user = {};
  user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ error: 'User already registered!' });

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  const token = user.generateShortJWT();
  const result = await user.save();

  sendConfirmationEmail(
    user.email,
    `http://localhost:3000/auth/confirmation?token=${token}`
  );

  return res.status(201).send({
    message: 'Registration Successful! Awaiting email verification',
  });
};

export const confirmEmail = async (req, res, token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    await User.findByIdAndUpdate(user._id, { confirmed: true });
    return res.status(200).json({ message: 'successfully verified email' });
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
};

export const login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ error: 'Invalid email or password!' });
  if (user.confirmed == false)
    return res
      .status(400)
      .send({ error: 'User pending verification. Check your email' });
  const validUser = req.body.password === user.password;
  if (!validUser)
    return res.status(400).send({ error: 'Invalid email or password!' });

  const token = user.generateJWT();
  return res.status(200).send({
    message: 'Login Successful!',
    token: token,
    user: _.pick(user, ['_id', 'name', 'email']),
  });
};
