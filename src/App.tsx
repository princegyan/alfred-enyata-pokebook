import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./pages/Home";
import "./index.css";
import { ListPokemon } from "./pages/ListPokemon.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/list-view",
    element: <ListPokemon />,
  },
]);

function App() {
  return (
    <div className="w-full h-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
