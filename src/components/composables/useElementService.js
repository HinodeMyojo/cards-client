import { elementService } from "@/services/elementService";

export function useElementService() {
    const deleteElementById = async (id) => {
        try{
            await elementService.deleteElement(id);
            console.log("Element was deleted");
        }
        catch (error) {
            console.error(error);
        }
    };

    const addElementToModule = async(model) => {
        try{
            await elementService.addElementToModule(model);
            console.log("element was created")
        }
        catch(error){
            console.error(error)
        }
    }

    const editElementById = async(model) => {
        try{
            await elementService.editElementById(model);
            console.log("element was updated")
        }
        catch(error){
            console.error(error)
        }
    }

    return { deleteElementById, addElementToModule, editElementById };
}