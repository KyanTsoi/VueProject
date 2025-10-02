import express from 'express';
import cors from 'cors';

// Importeer alle benodigde modules en use cases
import getAllModulesUseCase from '../application/getAllModules.js';
import addModuleToShortlistUseCase from '../application/addModuleToShortlist.js';
import moduleRepository from '../infrastructure/moduleRepository.js';
import studentRepository from '../infrastructure/studentRepository.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- API Endpoints ---

// GET: Haal alle modules op
app.get('/api/modules', async (req, res) => {
  try {
    const modules = await getAllModulesUseCase(moduleRepository);
    res.json(modules);
  } catch (error) {
    console.error(error);
    res.status(500).send('Er is een fout opgetreden bij het ophalen van de modules.');
  }
});

// POST: Voeg een module toe aan de shortlist van een student
app.post('/api/students/:studentId/shortlist', async (req, res) => {
  const { studentId } = req.params;
  const { moduleId } = req.body;

  if (!moduleId) {
    return res.status(400).send({ error: 'moduleId is verplicht in de body.' });
  }

  try {
    const result = await addModuleToShortlistUseCase(studentRepository, studentId, moduleId);
    if (result.matchedCount === 0) {
      return res.status(404).send({ error: 'Student niet gevonden.' });
    }
    res.status(200).send({ message: 'Module succesvol toegevoegd aan shortlist.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Fout bij het toevoegen van de module.');
  }
});

// Start de server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend server draait op http://localhost:${PORT}`);
});