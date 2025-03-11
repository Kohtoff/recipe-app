import { Recipe } from "../types/recipe.interface";
import { LocalStorageService } from "./LocalStorageService";

export const SELECTED_MEALS_LOCAL_STORAGE_KEY = "selectedMeals";

const SelectedMealsService = {
  addSelectedMeal(recipe: Recipe) {
    LocalStorageService.addItem(
      SELECTED_MEALS_LOCAL_STORAGE_KEY,
      recipe,
      (a, b) => a.idMeal === b.idMeal
    );
  },

  removeSelectedMeal(recipe: Recipe) {
    LocalStorageService.removeItem(
      SELECTED_MEALS_LOCAL_STORAGE_KEY,
      recipe,
      (a, b) => a.idMeal === b.idMeal
    );
  },

  getSelectedMeals(): Recipe[] {
    return LocalStorageService.getItems<Recipe>(
      SELECTED_MEALS_LOCAL_STORAGE_KEY
    );
  },

  getRecordById(id: string): Recipe | undefined {
    return LocalStorageService.getItemById(
      SELECTED_MEALS_LOCAL_STORAGE_KEY,
      id,
      (item) => item.idMeal
    );
  },
};

export default SelectedMealsService;
