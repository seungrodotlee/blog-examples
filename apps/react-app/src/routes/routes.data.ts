import Index from '../pages';
import NamespaceComponents from '../examples/namespace-components/namespace-components.page';


const routes = [
  {
    path: '/',
    Component: Index,
  },
  {
    path: '/namespace-components',
    Component: NamespaceComponents,
  },
];
export default routes;
