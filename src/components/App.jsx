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

const INITIAL_QUERY_PARAM = {
  search: '',
  page: 1,
  photos: [],
  scrollY: 0,
};

export function App() {
  const [newQuery, setNewQuery] = useState(INITIAL_QUERY_PARAM);
  const { search, page, photos, scrollY } = newQuery;
  const [status, setStatus] = useState(statusList.IDLE);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [isWrongQuery, setIsWrongQuery] = useState(false);
  const [oldQuery, setOldQuery] = useState(INITIAL_QUERY_PARAM);
  const per_page = 12;

  useEffect(() => {
    if (search === '' || isWrongQuery) {
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
          setNewQuery(oldQuery);
          setIsWrongQuery(true);
          return;
        }

        setTotal(parseInt(materials.total, 10));
        setNewQuery(prev => ({
          ...prev,
          photos: [...prev.photos, ...materials.hits],
        }));

        if (page === 1) {
          toast.success(`Hooray! We found ${materials.total} images.`);
        }
      })
      .catch(error => {
        setError(error.message);
        setStatus(statusList.REJECTED);
        toast.error(error.message);
      });
  }, [page, search, isWrongQuery, oldQuery]);

  useEffect(() => {
    if (page !== 1 && !isWrongQuery) {
      setTimeout(scrollLoadMore, 100);
    } else if (isWrongQuery) {
      setTimeout(() => {
        window.scrollBy(0, scrollY);
      }, 100);
    }
  }, [page, isWrongQuery, scrollY]);

  const searchQuery = query => {
    const querySearch = query.search.trim().toLowerCase();

    if (querySearch.length < 3) {
      toast.warning('Few characters to search');
      return;
    }
    if (!isWrongQuery) {
      setOldQuery(prev => ({
        ...newQuery,
        scrollY: window.scrollY,
      }));
    }

    setNewQuery(prev => ({
      ...INITIAL_QUERY_PARAM,
      search: querySearch,
    }));
    setError('');
    setIsWrongQuery(false);
  };

  const nextPage = () => {
    setNewQuery(prev => ({
      ...prev,
      page: prev.page + 1,
    }));
    setIsWrongQuery(false);
  };

  const isLoadMore = page < Math.ceil(total / per_page);
  const currentPhotos = isWrongQuery ? oldQuery.photos : photos;
  console.log(currentPhotos);
  return (
    <>
      <GlobalStyle />
      <Searchbar onSubmit={searchQuery} />
      <ImageGallery photos={currentPhotos} />
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
