import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  study: { type: String },
  shortlisted_modules: [{ type: Schema.Types.ObjectId, ref: 'ChoiceModule' }],
  interests: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
});

// Middleware om het wachtwoord te hashen vóór het opslaan
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const StudentModel = model('Student', studentSchema);