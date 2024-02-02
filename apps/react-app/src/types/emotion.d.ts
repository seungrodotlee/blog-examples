import { ComponentProps } from 'react';
import '@emotion/react'
import { Interpolation } from '@emotion/react';
import theme from '../app/theme';

declare module 'react' {
  type ComponentPropsWithCSS<T> = ComponentProps<T> & {
    css?: Interpolation<Theme>;
  }
}

declare module "@emotion/react" {
  type StyleProps = {
    theme: typeof theme;
  }
}