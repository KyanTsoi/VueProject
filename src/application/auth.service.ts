import { StudentModel } from '../infrastructure/schemas/student.schema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// US-1 Logica
export const registerStudent = async (studentData: any) => {
    const { email } = studentData;
    const existingStudent = await StudentModel.findOne({ email });
    if (existingStudent) {
        throw new Error('E-mailadres is al in gebruik.');
    }
    const student = new StudentModel(studentData);
    await student.save();
    return student;
};

// US-2 Logica
export const loginStudent = async (email: string, password: string): Promise<string> => {
    const student = await StudentModel.findOne({ email });
    if (!student) {
        throw new Error('Ongeldige inloggegevens.');
    }
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
        throw new Error('Ongeldige inloggegevens.');
    }
    const payload = {
        id: student._id,
        name: student.name,
    };
    // Zorg voor een secret in je .env bestand!
    const secret = process.env.JWT_SECRET || 'jouw_geheime_sleutel';
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
};