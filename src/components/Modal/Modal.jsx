import { Component } from 'react';
import * as SC from './Modal.styled';

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.props.onEscModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.onEscModal);
  }

  render() {
    const { onClickModal, urlImg, altImg } = this.props;

    return (
      <SC.Overlay onClick={onClickModal}>
        <SC.Modal>
          <img src={urlImg} alt={altImg} />
        </SC.Modal>
      </SC.Overlay>
    );
  }
}
