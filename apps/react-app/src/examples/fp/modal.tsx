import {
  ComponentPropsWithCSS,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  forwardRef,
  isValidElement,
  useMemo,
} from 'react';
import { css } from '@emotion/react';

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

function isTypeOfElement(
  types: (string | JSXElementConstructor<any>)[],
  child: ReactNode
): child is ReactElement;

function isTypeOfElement(
  types: (string | JSXElementConstructor<any>)[]
): (child: ReactNode) => child is ReactElement;

function isTypeOfElement(
  types: (string | JSXElementConstructor<any>)[],
  child?: ReactNode
) {
  if (!child) return (child: ReactNode) => isTypeOfElement(types, child);

  return isValidElement(child) && types.includes(child.type);
}

const mapEntriesOfPartsWithKey = (): [
  string | JSXElementConstructor<any>,
  string
][] => {
  return (['Header', 'Body', 'Footer'] as const).map((name) => [
    Modal[name],
    name.toLowerCase(),
  ]);
};

const partsAccumulator =
  (partsMap: Map<string | JSXElementConstructor<any>, string>) =>
  (
    result: Record<'header' | 'body' | 'footer', ReactElement>,
    child: ReactElement
  ) => {
    return {
      ...result,
      [partsMap.get(child.type)!]: child,
    };
  };

const _Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ visible, css, children, ...props }, ref) => {
    const { header, body, footer } = useMemo(() => {
      if (!Array.isArray(children)) {
        throw Error('Modal 컴포넌트의 자식 요소는 단일 요소일 수 없습니다.');
      }

      const partsMap = new Map(mapEntriesOfPartsWithKey());

      return children
        .filter(isTypeOfElement([...partsMap.keys()]))
        .reduce(
          partsAccumulator(partsMap),
          {} as Record<'header' | 'body' | 'footer', ReactElement>
        );
    }, []);

    return (
      <>
        {visible && (
          <div css={backdropStyle}>
            <div css={[css, modalStyle]} ref={ref} {...props}>
              <header>{header}</header>
              <main>{body}</main>
              <footer>{footer}</footer>
            </div>
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
