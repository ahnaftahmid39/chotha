import { validate, User } from '../models/user';
import _ from 'lodash';

export const signup = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = {};
  user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered!');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  const token = user.generateJWT();
  const result = await user.save();

  return res.status(201).send({
    message: 'Registration Successful!',
    token: token,
    user: _.pick(result, ['_id', 'name', 'email']),
  });
};

export const login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password!');

  const validUser = req.body.password === user.password;
  if (!validUser) return res.status(400).send('Invalid email or password!');

  const token = user.generateJWT();
  return res.status(200).send({
    message: 'Login Successful!',
    token: token,
    user: _.pick(user, ['_id', 'name', 'email']),
  });
};
