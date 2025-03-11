import { useQuery } from "@tanstack/react-query";
import RecipeGrid from "../components/RecipesGrid";
import { RecipeService } from "../services/RecipeService";
import LoaderSpinner from "../components/ui/SpinnerLoader";
import { useSearchParams } from "react-router";
import Pagination from "../components/ui/Pagination/Pagination";
import useDebounce from "../hooks/useDebounce";
import { useEffect, useState, ChangeEvent } from "react";
import Select from "../components/ui/Select";

const Home = () => {
  const [params, setSearchParams] = useSearchParams({ page: "1" });
  const searchByDefault = params.get("search") ?? "";
  const page = Number(params.get("page"));
  const categoryFilterByDefault = params.get("category") ?? undefined;

  const [limitMealsPerPage, setLimitMealsPerPage] = useState(10);
  const [search, setSearch] = useState(searchByDefault);
  const debouncedSearch = useDebounce(search, 500);
  const [categoryFilter, setCategoryFilter] = useState(categoryFilterByDefault);

  const { data, isPending, isError } = useQuery({
    queryKey: ["recipes", debouncedSearch, categoryFilter],
    queryFn: () => RecipeService.getRecipes({ searchQuery: debouncedSearch }),
  });

  const [filteredMeals, setFilteredMeals] = useState(data?.meals ?? []);

  useEffect(() => {
    if (data) {
      let meals = data.meals ?? [];
      if (categoryFilter) {
        meals = meals.filter((meal) => meal.strCategory === categoryFilter);
      }
      setFilteredMeals(meals);
    }
  }, [categoryFilter, limitMealsPerPage, page, data, search]);

  const categories = new Set(
    data?.meals ? ["", ...data.meals.map((meal) => meal.strCategory)] : []
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearch(newQuery);
    setSearchParams((prevParams) => {
      prevParams.set("search", newQuery);
      prevParams.set("page", "1");
      return prevParams;
    });
  };

  const handleChangeLimitMealsPerPage = (amount: number) => {
    setLimitMealsPerPage(amount);
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleSelectCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setCategoryFilter(category);
    params.set("category", category);
    params.set("page", "1");
    setSearchParams(params);
  };

  if (isError) return <div>Something went wrong...</div>;

  return (
    <>
      {/* filters starts */}
      <div className="flex items-center gap-3">
        <input
          type="search"
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
        />
        <Select
          placeholder="Category"
          onChange={handleSelectCategory}
          value={categoryFilter}
          options={Array.from(categories)}
        />
      </div>
      {/* filters ends */}
      {isPending ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoaderSpinner />
        </div>
      ) : (
        <>
          <RecipeGrid
            recipes={filteredMeals.slice(
              (page - 1) * limitMealsPerPage,
              page * limitMealsPerPage
            )}
          />
          <Pagination
            onLimitChange={handleChangeLimitMealsPerPage}
            total={filteredMeals.length}
            currentPage={page}
            perPage={limitMealsPerPage}
          />
        </>
      )}
    </>
  );
};

export default Home;
