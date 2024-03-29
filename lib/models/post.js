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
    author: {
      type: String, 
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
    public: { type: Boolean, default: false },
    tags: [{ type: String, maxlength: 30 }],
    subject: {
      type: String,
      required: true,
      default: 'Others',
    },
    deptName: {
      type: String,
      ref: 'Department'
    },
  },
  {
    timestamps: true,
  }
);

export const Post = models.Post || model('Post', postSchema);
