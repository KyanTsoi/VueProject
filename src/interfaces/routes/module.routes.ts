import { Router } from 'express';
import { getAllModules, getAllTags } from '../../application/module.service';

const router = Router();

// Endpoint voor het ophalen van alle modules
router.get('/', async (req, res) => {
  try {
    const modules = await getAllModules();
    res.json(modules);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint voor het ophalen van alle tags
router.get('/tags', async (req, res) => {
  try {
    const tags = await getAllTags();
    res.json(tags);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;