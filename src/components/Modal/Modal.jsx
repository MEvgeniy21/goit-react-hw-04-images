import { Component } from 'react';
import * as SC from './Modal.styled';

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.props.onResetState);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.onResetState);
  }

  render() {
    const { onClickModal, urlImg, altImg } = this.props;

    return (
      <SC.Overlay onClick={onClickModal} onKeyUp={onClickModal}>
        <SC.Modal>
          <img src={urlImg} alt={altImg} />
        </SC.Modal>
      </SC.Overlay>
    );
  }
}
