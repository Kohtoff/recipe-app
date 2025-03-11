import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import NotFound from "./pages/NotFound";
import { routes } from "./routes/routes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            {routes.map((route) => (
              <Route
                key={route.path}
                index={route.index}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
