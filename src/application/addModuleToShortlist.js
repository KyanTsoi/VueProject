const addModuleToShortlist = (studentRepository, studentId, moduleId) => {
  return studentRepository.addModuleToShortlist(studentId, moduleId);
};

export default addModuleToShortlist;