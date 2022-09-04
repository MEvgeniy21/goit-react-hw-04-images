import PropTypes from 'prop-types';
import { useEffect } from 'react';
import * as SC from './Modal.styled';

export default function Modal({
  onClickModal,
  urlImg,
  altImg,
  onKeyPressModal,
}) {
  useEffect(() => {
    document.addEventListener('keydown', onKeyPressModal);

    return () => {
      document.removeEventListener('keydown', onKeyPressModal);
    };
  });

  return (
    <SC.Overlay onClick={onClickModal}>
      <SC.Modal>
        <img src={urlImg} alt={altImg} />
      </SC.Modal>
    </SC.Overlay>
  );
}

Modal.propTypes = {
  onClickModal: PropTypes.func.isRequired,
  urlImg: PropTypes.string.isRequired,
  altImg: PropTypes.string.isRequired,
};
