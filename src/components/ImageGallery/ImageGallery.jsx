import * as SC from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';

export default function ImageGallery({ photos }) {
  return (
    <SC.Gallery>
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
  );
}
