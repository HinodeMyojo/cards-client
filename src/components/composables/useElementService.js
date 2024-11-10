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

    return { deleteElementById };
}