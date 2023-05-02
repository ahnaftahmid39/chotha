import { Schema, model, models } from 'mongoose';

const tagsSchema = Schema({
  tagName: { type: String, required: true, maxlength: 30, unique: true },
});

export const Tags = models.Tags || model('Tags', tagsSchema);
