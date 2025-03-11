import axios from "axios";
import { Recipe, RecipeResponse } from "../types/recipe.interface";
export const BASE_PATH = "https://www.themealdb.com/api/json/v1/1";

export const RecipeService = {
  async getRecipes({
    searchQuery = "",
  }: {
    searchQuery?: string;
  }): Promise<RecipeResponse> {
    return await axios
      .get(`${BASE_PATH}/search.php?s=${searchQuery}`)
      .then((res) => res.data);
  },

  getRecipe(id: string): Promise<Recipe> {
    return axios
      .get<RecipeResponse>(`${BASE_PATH}/lookup.php?i=${id}`)
      .then((res) => res.data.meals[0]);
  },
};
