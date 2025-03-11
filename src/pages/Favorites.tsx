import RecipeGrid from "../components/RecipesGrid";
import FavoritesService from "../services/FavoritesService";

const Favorites = () => {
  const persistedFavorites = FavoritesService.getFavorites();
  return <RecipeGrid recipes={persistedFavorites} />;
};

export default Favorites;
