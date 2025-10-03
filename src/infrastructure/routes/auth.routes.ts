import { Router } from 'express';
import { registerStudent, loginStudent } from '../../application/auth.service';

const router = Router();

// US-1: Registreren
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const student = await registerStudent({ name, email, password });
    res.status(201).json({ message: "Student succesvol geregistreerd.", studentId: student._id });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// US-2: Inloggen
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await loginStudent(email, password);
        res.status(200).json({ token });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
});

export default router;