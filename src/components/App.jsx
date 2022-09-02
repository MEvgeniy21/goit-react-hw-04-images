import { GlobalStyle } from 'GlobalStyle';
import { Box } from 'common/Box';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import { useState, useEffect } from 'react';
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

// const INITIAL_QUERY_PARAM = {
//   search: '',
//   page: 1,
//   per_page: 12,
//   total: 0,
//   photos: [],
//   error: {},
//   isWrongQuery: false,
// };

export function App() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(statusList.IDLE);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState({});
  const [isWrongQuery, setIsWrongQuery] = useState(false);
  let oldQuery = '';
  const per_page = 12;
  // state = {
  //   ...INITIAL_QUERY_PARAM,
  //   status: statusList.IDLE,
  // };

  useEffect(() => {
    if (search === '') {
      return;
    }
    setStatus(statusList.PENDING);

    fetchImage({ search, page, per_page })
      .then(materials => {
        setStatus(statusList.RESOLVED);
        if (!materials.hits.length) {
          toast.info(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          // prevState
          setSearch(oldQuery);

          setIsWrongQuery(true);
          return;
        }

        if (!isWrongQuery) {
          setTotal(parseInt(materials.total, 10));
          setPhotos(prev => [...prev, ...materials.hits]);
        }

        if (page === 1 && !isWrongQuery) {
          toast.success(`Hooray! We found ${materials.total} images.`);
        } else if (page !== 1 && !isWrongQuery) {
          setTimeout(scrollLoadMore, 100);
        }
      })
      .catch(error => {
        setError(error);
        setStatus(statusList.REJECTED);
        toast.error(error.message);
      });
  }, [search, page, isWrongQuery, oldQuery]);

  // componentDidUpdate(prevProps, prevState) {
  //   const { search, page, isWrongQuery } = this.state;

  //   if (search !== prevState.search || page !== prevState.page) {
  //     this.setState({ status: statusList.PENDING });

  //     fetchImage(this.state)
  //       .then(materials => {
  //         if (!materials.hits.length) {
  //           toast.info(
  //             'Sorry, there are no images matching your search query. Please try again.'
  //           );
  //           this.setState(s => ({
  //             ...prevState,
  //             isWrongQuery: true,
  //           }));
  //           return;
  //         }

  //         this.setState({ status: statusList.RESOLVED });
  //         if (!isWrongQuery) {
  //           this.setState(prevState => ({
  //             total: parseInt(materials.total, 10),
  //             photos: [...prevState.photos, ...materials.hits],
  //           }));
  //         }

  //         if (page === 1 && !isWrongQuery) {
  //           toast.success(`Hooray! We found ${materials.total} images.`);
  //         } else if (page !== 1 && !isWrongQuery) {
  //           setTimeout(scrollLoadMore, 100);
  //         }
  //       })
  //       .catch(error => {
  //         this.setState({ error, status: statusList.REJECTED });
  //         toast.error(error.message);
  //       });
  //   }
  // }

  const searchQuery = query => {
    const querySearch = query.search.trim().toLowerCase();

    if (querySearch.length < 3) {
      toast.warning('Few characters to search');
      return;
    }
    if (!isWrongQuery) {
      oldQuery = search;
    }
    setSearch(querySearch);
  };

  const nextPage = () => {
    setPage(prev => prev + 1);
    setIsWrongQuery(false);
  };

  const isLoadMore = page < Math.ceil(total / per_page);

  return (
    <>
      <GlobalStyle />
      <Searchbar onSubmit={searchQuery} />
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
          onClickLoadMore={nextPage}
        />
      </Box>
      <ToastContainer />
    </>
  );
}
