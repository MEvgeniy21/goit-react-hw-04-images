import * as SC from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { Component } from 'react';
import Modal from 'components/Modal';

const INITIAL_GALLERY = {
  isModalOpen: false,
  urlImg: '',
  altImg: '',
};

export default class ImageGallery extends Component {
  state = {
    ...INITIAL_GALLERY,
  };

  handleClickPhoto = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    console.log(e.target.getAttribute('alt'));
    console.log(e.target.dataset.image);
  };

  render() {
    const { isModalOpen, urlImg, altImg } = this.state;
    const { photos } = this.props;

    return (
      <>
        <SC.Gallery onClick={this.handleClickPhoto}>
          {photos.length !== 0 &&
            photos.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  srcImg={webformatURL}
                  altImg={tags}
                  dataImg={largeImageURL}
                />
              );
            })}
        </SC.Gallery>
        {isModalOpen && <Modal urlImg={urlImg} altImg={altImg} />}
      </>
    );
  }
}
