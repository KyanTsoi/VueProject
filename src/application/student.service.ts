import { StudentModel } from '../infrastructure/schemas/student.schema';
import mongoose from 'mongoose';

export const updateShortlist = async (studentId: string, moduleId: string, action: 'add' | 'remove') => {
  const updateOperation = action === 'add'
    ? { $addToSet: { shortlisted_modules: new mongoose.Types.ObjectId(moduleId) } }
    : { $pull: { shortlisted_modules: new mongoose.Types.ObjectId(moduleId) } };

  const student = await StudentModel.findByIdAndUpdate(studentId, updateOperation, { new: true });

  if (!student) {
    throw new Error('Student niet gevonden.');
  }
  return student.shortlisted_modules;
};