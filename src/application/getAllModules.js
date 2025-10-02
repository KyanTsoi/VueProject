// Use case voor het ophalen van alle modules.
// De functie is afhankelijk van een 'repository' en weet niet welke database wordt gebruikt.
const getAllModules = (moduleRepository) => {
  return moduleRepository.getAll();
};

export default getAllModules;