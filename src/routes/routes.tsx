import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import RecipePage from "../pages/Recipe";
import SelectedMeals from "../pages/SelectedMeals";

export const routes = [
  {
    index: true,
    element: <Home />,
    path: "/",
    name: "Home",
    navLink: true,
  },
  {
    path: "/recipe/:id",
    element: <RecipePage />,
    name: "Recipe",
  },
  {
    path: "/favorites",
    element: <Favorites />,
    name: "Favorites",
    navLink: true,
  },
  {
    path: "/selected-meals",
    element: <SelectedMeals />,
    name: "Selected meals",
    navLink: true,
  },
];
