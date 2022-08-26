import * as SC from './Modal.styled';

export default function Modal({ onClickModal, urlImg, altImg }) {
  return (
    <SC.Overlay onClick={onClickModal}>
      <SC.Modal>
        <img src={urlImg} alt={altImg} />
      </SC.Modal>
    </SC.Overlay>
  );
}
