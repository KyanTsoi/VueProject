import { ChoiceModuleModel } from '../infrastructure/schemas/choicemodule.schema';
import { TagModel } from '../infrastructure/schemas/tag.schema';

export const getAllModules = async () => {
  // .populate('tags') zou je kunnen gebruiken als je naar een aparte collectie zou verwijzen.
  // Omdat we embedden, is dit niet nodig.
  return await ChoiceModuleModel.find({});
};

export const getAllTags = async () => {
  return await TagModel.find({});
};