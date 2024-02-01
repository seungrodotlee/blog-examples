import { Route, Routes } from 'react-router-dom';
import routes from './routes.data';

const ExampleRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};


export default ExampleRoutes;