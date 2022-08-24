import { GlobalStyle } from 'GlobalStyle';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
// import Modal from 'components/Modal';

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Searchbar />
      <ImageGallery />
      <Button />
      {/* <Modal /> */}
    </>
  );
};
