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
  search: '',
  page: 1,
  per_page: 12,
  total: 0,
  photos: [],
  error: {},
  isWrongQuery: false,
};

export class App extends Component {
  state = {
    ...INITIAL_QUERY_PARAM,
    status: statusList.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page, isWrongQuery } = this.state;

    if (search !== prevState.search || page !== prevState.page) {
      this.setState({ status: statusList.PENDING });

      fetchImage(this.state)
        .then(materials => {
          if (!materials.hits.length) {
            toast.info(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            this.setState(s => ({
              ...prevState,
              isWrongQuery: true,
            }));
            return;
          }

          if (!isWrongQuery) {
            this.setState(prevState => ({
              status: statusList.RESOLVED,
              total: parseInt(materials.total, 10),
              photos: [...prevState.photos, ...materials.hits],
            }));
          } else {
            this.setState({ status: statusList.RESOLVED });
          }

          if (page === 1 && !isWrongQuery) {
            toast.success(`Hooray! We found ${materials.total} images.`);
          } else if (page !== 1 && !isWrongQuery) {
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
      ...INITIAL_QUERY_PARAM,
      search: querySearch,
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
