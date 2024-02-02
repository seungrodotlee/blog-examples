import { css, StyleProps } from "@emotion/react";
import theme from "../app/theme";

export const defaultButtonStyle = css`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;

export const positiveButtonStyle = css`
  ${defaultButtonStyle}
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.primary};
`;

export const negativeButtonStyle = css`
  ${defaultButtonStyle}
  background-color: ${theme.colors.negativeLight};
  color: ${theme.colors.negative};
`;
