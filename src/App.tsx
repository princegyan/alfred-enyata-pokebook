// App.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { ListPokemon } from './pages/ListPokemon';
import './index.css';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/list-view',
    element: <ListPokemon />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <div className="w-full h-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
