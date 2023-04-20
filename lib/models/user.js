import { model, Schema, models } from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlenth: 100,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },

    photo: {
      type: String,
    },
    bio: {
      type: String,
      required: false,
      maxlength: 1000,
    },
    socials: {
      facebook: String,
      twitter: String,
      linkedin: String,
      youtube: String,
    },

    confirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: false,
      minlength: 5,
      maxlength: 1024,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    googleId: {
      type: String,
    },
    facebookId: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
      name: this.name,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '30d' }
  );
  return token;
};

userSchema.methods.generateShortJWT = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
      name: this.name,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: 10 * 60 }
  );
  return token;
};

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
};

export const User = models.User || model('User', userSchema);
export const validate = validateUser;
