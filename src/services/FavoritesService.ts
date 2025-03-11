import { Recipe } from "../types/recipe.interface";
import { LocalStorageService } from "./LocalStorageService";

export const FAVORITE_LOCAL_STORAGE_KEY = "favorites";

const FavoritesService = {
  addFavorite(recipe: Recipe) {
    LocalStorageService.addItem(
      FAVORITE_LOCAL_STORAGE_KEY,
      recipe,
      (a, b) => a.idMeal === b.idMeal
    );
  },

  removeFavorite(recipe: Recipe) {
    LocalStorageService.removeItem(
      FAVORITE_LOCAL_STORAGE_KEY,
      recipe,
      (a, b) => a.idMeal === b.idMeal
    );
  },

  getFavorites(): Recipe[] {
    return LocalStorageService.getItems<Recipe>(FAVORITE_LOCAL_STORAGE_KEY);
  },

  getRecordById(id: string): Recipe | undefined {
    return LocalStorageService.getItemById(
      FAVORITE_LOCAL_STORAGE_KEY,
      id,
      (item) => item.idMeal
    );
  },
};

export default FavoritesService;
