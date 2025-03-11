import LoaderSpinner from "../components/ui/SpinnerLoader";
import { RecipeService } from "../services/RecipeService";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import NotFound from "./NotFound";

export default function RecipePage() {
  const { id } = useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => RecipeService.getRecipe(id as string),
  });

  if (isPending)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <LoaderSpinner />
      </div>
    );
  if (isError) return <NotFound />;

  const ingredients = Object.entries(data).filter(
    ([key, value]) => key.includes("strIngredient") && value
  );
  const measures = Object.entries(data).filter(
    ([key, value]) => key.includes("strMeasure") && value
  );
  const embedYTSource = data.strYoutube.replace("watch?v=", "embed/");
  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Recipe info */}
        <div className="px-2 mx-auto mt-6 max-w-2xl sm:px-6 grid lg:max-w-7xl md:grid-cols-2 gap-8 lg:px-8">
          <img
            alt={data.strMeal}
            src={data.strMealThumb}
            className="size-full rounded-lg object-cover"
          />
          <div className="lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {data.strMeal}
            </h1>
            <h2 className="text-lg font-bold tracking-tight text-gray-500 sm:text-xl">
              {data.strArea}
            </h2>

            {/* Ingredients */}
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Ingredients</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {ingredients.map((ingredient) => (
                    <li key={ingredient[0]} className="text-gray-400">
                      <span className="text-gray-600">
                        {ingredient[1] as string}
                      </span>{" "}
                      -{" "}
                      <span className="text-gray-400">
                        {
                          measures.find(
                            ([key]) =>
                              key ===
                              `strMeasure${
                                ingredient[0].split("strIngredient")[1]
                              }`
                          )?.[1] as string
                        }
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:max-w-7xl lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:pr-8 lg:pb-16">
            <div>
              <h3 className="mb-4 font-bold">Instructions</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {data.strInstructions}
                </p>
              </div>

              <iframe
                className="mt-10 h-auto aspect-video"
                width="100%"
                src={embedYTSource}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <a
            className="text-blue-400 visited:text-blue-700 underline"
            href={data.strSource}
            target="_blank"
          >
            Source
          </a>
        </div>
      </div>
    </div>
  );
}
