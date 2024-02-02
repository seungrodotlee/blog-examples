import { css } from '@emotion/react';
import { ComponentPropsWithCSS, forwardRef } from 'react';

type ModalProps = ComponentPropsWithCSS<'div'> & {
  visible: boolean;
};

const modalStyle = css`
  display: flex;
  flex-direction: column;

  padding: 0.75rem 1rem;
  border-radius: 0.75rem;

  background-color: white;
`;

const backdropStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.3);
`;

const _Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ visible, css, ...props }, ref) => {
    return (
      <>
        {visible && (
          <div css={backdropStyle}>
            <div css={[css, modalStyle]} ref={ref} {...props} />
          </div>
        )}
      </>
    );
  }
);

/** Modal.Header */

type ModalHeaderProps = ComponentPropsWithCSS<'div'> & {
  title: string;
};

const modalHeaderStyle = css`
  display: flex;
  justify-content: space-between;
`;

const Modal_Header = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ title, children, css, ...props }, ref) => {
    return (
      <div ref={ref} css={[css, modalHeaderStyle]} {...props}>
        <h1>{title}</h1>
        <div>{children}</div>
      </div>
    );
  }
);

/** Modal.Body */

const modalBodyStyle = css`
  flex-grow: 1;

  padding: 0.5rem 0;
  border-width: 1px 0;
  border-style: solid;
  border-color: black;
  margin: 0.5rem 0;
`;

const Modal_Body = forwardRef<HTMLDivElement, ComponentPropsWithCSS<'div'>>(
  ({ css, ...props }, ref) => {
    return <div ref={ref} css={[css, modalBodyStyle]} {...props} />;
  }
);

/** Modal.Footer */

const modalFooterStyle = css`
  display: flex;

  & > * {
    margin-right: 0.5rem;
  }
`;

const Modal_Footer = forwardRef<HTMLDivElement, ComponentPropsWithCSS<'div'>>(
  ({ css, ...props }, ref) => {
    return <div ref={ref} css={[css, modalFooterStyle]} {...props} />;
  }
);

/** Modal.Close */

const Modal_Close = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithCSS<'button'>
>((props, ref) => {
  return <button ref={ref} {...props} />;
});

/** Modal.Submit */

const Modal_Submit = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithCSS<'button'>
>((props, ref) => {
  return <button ref={ref} {...props} />;
});

const Modal = Object.assign(_Modal, {
  Header: Modal_Header,
  Body: Modal_Body,
  Footer: Modal_Footer,
  Close: Modal_Close,
  Submit: Modal_Submit,
});

export default Modal;
