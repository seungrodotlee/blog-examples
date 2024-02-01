import styled from '@emotion/styled';

import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';
import ExampleRoutes from '../routes/routes.component';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <NxWelcome title="react-app" />

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <ExampleRoutes />
    </StyledApp>
  );
}

export default App;
