// Definieert de 'ChoiceModule' entiteit in je domein.
class ChoiceModule {
  constructor(id, name, description, studypoints, period, location) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.studypoints = studypoints;
    this.period = period;
    this.location = location;
  }
}

export default ChoiceModule;