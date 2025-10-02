// Dit kan een simpele class of object zijn die de structuur definieert.
// Voor nu houden we het leeg, het wordt belangrijker als je validatieregels toevoegt.
class ChoiceModule {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

module.exports = ChoiceModule;