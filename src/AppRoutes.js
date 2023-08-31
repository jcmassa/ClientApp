import { Home } from "./components/Home";
import RankItemsContainer from "./components/RankItemsContainer";
import MovieImageArr from "./components/MovieImages.js";
import { ContextProvider } from './context/TierContext'

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/rank-items',
      element: <ContextProvider dataType={1}>
          <RankItemsContainer dataType={1} imgArr={MovieImageArr} />
      </ContextProvider>
  }
];

export default AppRoutes;
