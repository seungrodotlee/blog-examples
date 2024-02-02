import { css } from '@emotion/react';
import { useCallback, useState } from 'react';
import Modal from './modal';
import {
  negativeButtonStyle,
  positiveButtonStyle,
} from '../../styles/button.styles';

const centeredPageStyle = css`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const NamespaceComponents = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <div css={centeredPageStyle}>
      <button css={positiveButtonStyle} onClick={openModal}>
        Click me!
      </button>
      <Modal visible={modalVisible}>
        <Modal.Header title="I'm Modal!" />
        <Modal.Body>
          <h3>Nice to see you!</h3>
          <p>I'm bit ugly now,</p>
          <p>but will be refactored soon!</p>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close css={negativeButtonStyle} onClick={closeModal}>
            Close
          </Modal.Close>
          <Modal.Submit css={positiveButtonStyle} onClick={openModal}>
            OK
          </Modal.Submit>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NamespaceComponents;
