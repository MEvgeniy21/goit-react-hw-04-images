import * as SC from './Modal.styled';

export default function Modal({ urlImg, altImg }) {
  return (
    <SC.Overlay>
      <SC.Modal>
        <img src={urlImg} alt={altImg} />
      </SC.Modal>
    </SC.Overlay>
  );
}
