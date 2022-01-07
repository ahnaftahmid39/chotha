import { model, Schema, models } from 'mongoose';

const postSchema = Schema(
  {
    markdown: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 300,
    },
    tags: [{ type: String, maxlength: 30 }],
    subject: {
      type: String,
      required: true,
      default: 'Others',
    },
    topic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = models.Post || model('Post', postSchema);
