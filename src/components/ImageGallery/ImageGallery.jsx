import PropTypes from 'prop-types';
import * as SC from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { useState } from 'react';
import Modal from 'components/Modal';

export default function ImageGallery({ photos }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlImg, setUrlImg] = useState('');
  const [altImg, setAltImg] = useState('');

  const handleClickPhoto = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    setIsModalOpen(true);
    setUrlImg(e.target.dataset.image);
    setAltImg(e.target.getAttribute('alt'));
  };

  const handleClickModal = e => {
    if (e.target.nodeName === 'IMG') {
      return;
    }

    resetState();
  };

  const handleKeyPressModal = e => {
    if (e.keyCode !== 27) {
      return;
    }

    resetState();
  };

  const resetState = () => {
    setIsModalOpen(false);
    setUrlImg('');
    setAltImg('');
  };

  return (
    <>
      <SC.Gallery onClick={handleClickPhoto} className="gallery">
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
      {isModalOpen && (
        <Modal
          onClickModal={handleClickModal}
          onKeyPressModal={handleKeyPressModal}
          urlImg={urlImg}
          altImg={altImg}
        />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
