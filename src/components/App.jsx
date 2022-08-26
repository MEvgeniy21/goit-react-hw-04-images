import { GlobalStyle } from 'GlobalStyle';
import { Box } from 'common/Box';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { Component } from 'react';
// import Modal from 'components/Modal';
import { fetchImage } from 'api/fetchPixabay';

export class App extends Component {
  state = {
    search: '',
    page: 1,
    per_page: 12,
    total: 0,
    photos: [],
    error: '',
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.search !== prevState.search ||
      this.state.page !== prevState.page
    ) {
      console.log('Fetch: ', this.state);

      this.setState({ isLoading: true });

      fetchImage(this.state)
        .then(materials => {
          if (!materials.hits.length) {
            // console.log(
            //   'Sorry, there are no images matching your search query. Please try again.'
            // );
            // Notify.failure(
            //   'Sorry, there are no images matching your search query. Please try again.'
            // );
            return;
          }
          // console.log(`Hooray! We found ${total} images.`);
          // Notify.success(`Hooray! We found ${total} images.`);
          this.setState(prevState => ({
            total: parseInt(materials.total, 10),
            photos: [...prevState.photos, ...materials.hits],
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  searchQuery = ({ search }) => {
    this.setState({ search, photos: [], page: 1, total: 0 });
  };

  nextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { page, per_page, total, photos, isLoading } = this.state;
    const isLoadMore = page < Math.ceil(total / per_page);

    return (
      <>
        <GlobalStyle />
        <Searchbar onSubmit={this.searchQuery} />
        <ImageGallery photos={photos} />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          {isLoading &&
            (isLoadMore && <Button onClick={this.nextPage} />)(<Loader />)}
        </Box>
        {/* <Modal /> */}
      </>
    );
  }
}
