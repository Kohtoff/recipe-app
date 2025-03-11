import { Recipe } from "../types/recipe.interface";
import RecipeCard from "./RecipeCard";

type Props = {
  recipes?: Recipe[];
};

const RecipeGrid = ({ recipes }: Props) => {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <span>Empty :(</span>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeGrid;
