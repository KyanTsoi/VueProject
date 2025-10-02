import express from 'express';
import cors from 'cors';

// Importeren van je eigen modules met .js extensie
import getAllModulesUseCase from '../application/getAllModules.js';
import addModuleToShortlistUseCase from '../application/addModuleToShortlist.js';
import moduleRepository from '../infrastructure/moduleRepository.js';
import studentRepository from '../infrastructure/studentRepository.js';

const app = express();
app.use(cors());
app.use(express.json()); // Middleware voor het lezen van JSON bodies

// API endpoint om alle modules op te halen
app.get('/api/modules', async (req, res) => {
  try {
    const modules = await getAllModulesUseCase(moduleRepository);
    res.json(modules);
  } catch (error) {
    res.status(500).send('Er is een fout opgetreden.');
  }
});

// API endpoint om een module op te slaan
app.post('/api/students/:studentId/shortlist', async (req, res) => {
  const { studentId } = req.params;
  const { moduleId } = req.body;

  if (!moduleId) {
    return res.status(400).send('moduleId is verplicht.');
  }

  try {
    await addModuleToShortlistUseCase(studentRepository, studentId, moduleId);
    res.status(200).send({ message: 'Module succesvol toegevoegd aan shortlist.' });
  } catch (error) {
    res.status(500).send('Fout bij het toevoegen van de module.');
  }
});

app.listen(3000, () => {
  console.log('Backend server draait op http://localhost:3000');
});