import Index from '../pages';
import NamespaceComponents from '../examples/namespace-components/namespace-components.page';
import Slot from '../examples/slot/slot.page';
const routes = [
  {
    path: '/',
    Component: Index,
  },
  {
    path: '/namespace-components',
    Component: NamespaceComponents,
  },
  {
    path: '/slot',
    Component: Slot,
  },
];
export default routes;
