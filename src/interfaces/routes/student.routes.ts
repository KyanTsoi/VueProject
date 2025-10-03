import { Router } from 'express';
import type { Request } from 'express'; // Oplossing 1: Gebruik 'import type'
import { updateShortlist } from '../../application/student.service';
import { protect } from '../middleware/auth.middleware';

// Breid de Request interface uit
interface AuthRequest extends Request {
  user?: { id: string };
}

const router = Router();

router.post('/:studentId/shortlist', protect, async (req: AuthRequest, res) => {
  try {
    const studentId = req.user?.id;
    
    // Oplossing 2: Expliciete controle
    if (!studentId) {
      return res.status(401).json({ message: 'Niet geautoriseerd, geen gebruiker gevonden in token.' });
    }

    const { moduleId, action } = req.body;
    if (!moduleId || !action) {
      return res.status(400).json({ message: 'moduleId en action zijn verplicht.' });
    }

    // Nu is 'studentId' gegarandeerd een string
    const updatedShortlist = await updateShortlist(studentId, moduleId, action);
    res.status(200).json({ shortlisted_modules: updatedShortlist });
    
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;