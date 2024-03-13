import Index from '../app';
import NamespaceComponents from '../examples/namespace-components/namespace-components.page';
import SlotComponents from '../examples/slot-components/slot-components.page';
import Fp from '../examples/fp/fp.page';
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
    path: '/slot-components',
    Component: SlotComponents,
  },
  {
    path: '/fp',
    Component: Fp,
  },
];
export default routes;
