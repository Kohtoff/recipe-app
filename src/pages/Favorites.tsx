import RecipeCard from "../components/RecipeCard";
import FavoritesService from "../services/FavoritesService";
import { Recipe } from "../types/recipe.interface";

const Favorites = () => {
  const favorites = FavoritesService.getFavorites();

  const processIngredients = (meals: Recipe[]): string[] => {
    const ingredientMap: Record<string, string[]> = {};

    // populate ingredientMap with ingredients and measures
    meals.forEach((meal) => {
      for (let i = 1; i <= 20; i++) {
        const ingredientName =
          meal[`strIngredient${i}` as keyof typeof meal]?.trim();
        const measure = meal[`strMeasure${i}` as keyof typeof meal]?.trim();

        if (ingredientName) {
          if (!ingredientMap[ingredientName])
            ingredientMap[ingredientName] = [];
          if (measure) ingredientMap[ingredientName].push(measure);
        }
      }
    });

    // formatting and sorting
    return Object.entries(ingredientMap)
      .map(([ingredient, measures]) =>
        measures.length
          ? `${ingredient} (${[...measures].sort().join(", ")})`
          : ingredient
      )
      .sort();
  };
  if (favorites.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <span>Empty :(</span>
      </div>
    );
  }
  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-max min-w-[400px] flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {favorites.map((meal) => (
                <RecipeCard key={meal.idMeal} recipe={meal} />
              ))}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
              <p className="text-xl font-semibold text-gray-900">Ingredients</p>

              <div className="space-y-4">
                <div className="space-y-2">
                  {processIngredients(favorites).map(
                    (ingredient, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-4"
                      >
                        <dt className="text-base font-normal text-gray-500 ">
                          {ingredient}
                        </dt>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Favorites;
