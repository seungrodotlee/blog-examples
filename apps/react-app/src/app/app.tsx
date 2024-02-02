import { Global, ThemeProvider, css } from '@emotion/react';
import ExampleRoutes from '../routes/routes.component';
import theme from './theme';
import { resetCSS, defaultStyles } from '../styles/@global.styles';

export function App() {
  return (
    <>
      <Global styles={[resetCSS, defaultStyles]} />
      <div>
        <ThemeProvider theme={theme}>
          <ExampleRoutes />
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
