import { Schema, model } from 'mongoose';

// We gebruiken hier direct de structuur van een Tag, omdat we het embedden.
const embeddedTagSchema = new Schema({
  name: { type: String, required: true }
});

const choiceModuleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  studypoints: { type: Number, required: true },
  period: { type: Number, required: true },
  location: { type: String, required: true },
  tags: [embeddedTagSchema] // Tags worden hier ingebed
});

export const ChoiceModuleModel = model('ChoiceModule', choiceModuleSchema);