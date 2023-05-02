import { Schema, model, models } from 'mongoose';

const departmentSchema = Schema(
  {
    deptName: {
      type: String,
      maxlength: 100,
      required: true,
    },
    institute: {
      type: String,
      maxlength: 200,
    },
  },
  {
    timestamps: true,
  }
);

export const Department =
  models.Department || model('Department', departmentSchema);
