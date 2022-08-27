import PropTypes from 'prop-types';
import * as SC from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ srcImg, altImg, dataImg }) {
  return (
    <SC.GalleryItem>
      <SC.ItemImage src={srcImg} alt={altImg} data-image={dataImg} />
    </SC.GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  srcImg: PropTypes.string.isRequired,
  altImg: PropTypes.string.isRequired,
  dataImg: PropTypes.string.isRequired,
};
