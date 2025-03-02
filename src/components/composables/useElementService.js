import { elementService } from '@/services/elementService';

export function useElementService() {
  const getByModuleId = async (moduleId) => {
    try {
      return await elementService.getByModuleId(moduleId);
    } catch (error) {
      console.error(error);
    }
  }
  const deleteElementById = async (id) => {
    try {
      await elementService.deleteElement(id);
    } catch (error) {
      console.error(error);
    }
  };

  const addElementToModule = async (model) => {
    try {
      await elementService.addElementToModule(model);
    } catch (error) {
      console.error(error);
    }
  };

  const editElementById = async (model) => {
    try {
      await elementService.editElementById(model);
    } catch (error) {
      console.error(error);
    }
  };

  return { deleteElementById, addElementToModule, editElementById, getByModuleId };
}
