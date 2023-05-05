import { Schema, model, models } from 'mongoose';

const commentSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    comment: {
      type: String,
      maxlength: 1000,
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = models.Comment || model('Comment', commentSchema);
