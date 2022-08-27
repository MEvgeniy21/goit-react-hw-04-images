import { GlobalStyle } from 'GlobalStyle';
import { Box } from 'common/Box';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import { Component } from 'react';
import { fetchImage } from 'api/fetchPixabay';
import StatusBox from 'components/StatusBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { scrollLoadMore } from 'utilities';

const statusList = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const INITIAL_QUERY_PARAM = {
  page: 1,
  per_page: 12,
  total: 0,
  photos: [],
  error: {},
};

export class App extends Component {
  state = {
    search: '',
    ...INITIAL_QUERY_PARAM,
    status: statusList.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.search !== prevState.search ||
      this.state.page !== prevState.page
    ) {
      this.setState({ status: statusList.PENDING });

      fetchImage(this.state)
        .then(materials => {
          if (!materials.hits.length) {
            toast.info(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            this.setState(s => ({
              ...prevState,
            }));
            return;
          }

          this.setState(prevState => ({
            status: statusList.RESOLVED,
            total: parseInt(materials.total, 10),
            photos: [...prevState.photos, ...materials.hits],
          }));

          if (this.state.page === 1) {
            toast.success(`Hooray! We found ${materials.total} images.`);
          } else {
            setTimeout(scrollLoadMore, 100);
          }
        })
        .catch(error => {
          this.setState({ error, status: statusList.REJECTED });
          toast.error(error.message);
        });
    }
  }

  searchQuery = ({ search }) => {
    const querySearch = search.trim().toLowerCase();

    if (querySearch.length < 3) {
      toast.warning('Few characters to search');
      return;
    }

    this.setState({
      search: querySearch,
      ...INITIAL_QUERY_PARAM,
    });
  };

  nextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { page, per_page, total, photos, status, error } = this.state;
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
          <StatusBox
            statusList={statusList}
            currentStatus={status}
            error={error}
            isLoadMore={isLoadMore}
            onClickLoadMore={this.nextPage}
          />
        </Box>
        <ToastContainer />
      </>
    );
  }
}
