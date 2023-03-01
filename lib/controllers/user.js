import { validate, User } from '../models/user';
import { sendConfirmationEmail } from '../email/confirmation_email';
import _ from 'lodash';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  let user = {};
  user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).json({
      status: 400,
      message: 'User exists',
      error: 'User already registered!',
    });

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  const shortToken = user.generateShortJWT();
  await user.save();
  try {
    await sendConfirmationEmail(
      user.email,
      `${process.env.BASE_URL}/auth/confirmation?shortToken=${shortToken}`
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 400,
      message: 'Email problem',
      error: err,
    });
  }

  return res.status(201).json({
    status: 201,
    message: 'Registration Successful! Awaiting email verification',
  });
};

export const verifyToken = async (req, res, shortToken) => {
  try {
    const decodedUser = jwt.verify(shortToken, process.env.JWT_SECRET_KEY);
    const user = await User.findByIdAndUpdate(decodedUser._id, {
      confirmed: true,
    });
    const token = user.generateJWT();
    return res
      .status(200)
      .json({ status: 200, message: 'successfully verified email', token });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: 'Token invalid',
      error: err,
    });
  }
};

export const login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .json({ status: 200, error: 'No account found with this email' });
  if (user.confirmed == false)
    return res.status(400).json({
      status: 400,
      error: 'User pending verification. Check your email',
    });
  const validUser = req.body.password === user.password;
  if (!validUser)
    return res.status(400).json({ status: 400, error: 'Wrong password!' });

  const token = user.generateJWT();
  return res.status(200).json({
    status: 200,
    message: 'Login Successful!',
    token: token,
    user: _.pick(user, ['_id', 'name', 'email']),
  });
};
