import { Link } from "react-router";
import { Recipe } from "../types/recipe.interface";
import { useQueryClient } from "@tanstack/react-query";
import { RecipeService } from "../services/RecipeService";
import FavoritesService from "../services/FavoritesService";
import { useEffect, useState } from "react";

type Props = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: Props) => {
  const queryClient = useQueryClient();
  const [isFavorite, setIsFavorite] = useState(false);

  const prefetchRecipe = async () => {
    const { idMeal } = recipe;
    await queryClient.prefetchQuery({
      queryKey: ["recipe", idMeal],
      queryFn: () => RecipeService.getRecipe(idMeal),
      staleTime: 10 * 1000,
    });
  };

  useEffect(() => {
    const isSavedAsFavorite = !!FavoritesService.getRecordById(recipe.idMeal);
    setIsFavorite(isSavedAsFavorite);
  }, []);

  const toggleFavorite = () => {
    if (isFavorite) {
      FavoritesService.removeFavorite(recipe);
    } else {
      FavoritesService.addFavorite(recipe);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <article className="group relative">
      <Link onMouseEnter={prefetchRecipe} to={`recipe/${recipe.idMeal}`}>
        <img
          alt={recipe.strMeal}
          src={recipe.strMealThumb}
          className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />
        <main className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">{recipe.strMeal}</h3>
            <p className="mt-1 text-sm text-gray-500">{recipe.strCategory}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{recipe.strArea}</p>
        </main>
      </Link>
      <footer className="mt-2 space-y-1">
        <button
          className={`btn indigo ${!isFavorite || "--active"}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? "Favorite" : "Add to favorite"}
        </button>
      </footer>
    </article>
  );
};

export default RecipeCard;
