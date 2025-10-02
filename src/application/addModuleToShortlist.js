// Use case voor het toevoegen van een module aan de shortlist van een student.
const addModuleToShortlist = (studentRepository, studentId, moduleId) => {
  // Hier kun je later businesslogica toevoegen,
  // zoals controleren of een student al te veel modules heeft gekozen.
  return studentRepository.addModuleToShortlist(studentId, moduleId);
};

export default addModuleToShortlist;