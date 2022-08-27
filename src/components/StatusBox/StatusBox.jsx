import PropTypes from 'prop-types';
import Button from 'components/Button';
import Error from 'components/Error';
import Loader from 'components/Loader';

export default function StatusBox({
  statusList,
  currentStatus,
  error,
  isLoadMore,
  onClickLoadMore,
}) {
  if (currentStatus === statusList.PENDING) {
    return <Loader />;
  }
  if (currentStatus === statusList.RESOLVED) {
    return isLoadMore && <Button onClick={onClickLoadMore} />;
  }
  if (currentStatus === statusList.REJECTED) {
    return <Error error={error} />;
  }
}

StatusBox.propTypes = {
  statusList: PropTypes.objectOf(PropTypes.string).isRequired,
  currentStatus: PropTypes.string.isRequired,
  error: PropTypes.object.isRequired,
  isLoadMore: PropTypes.bool.isRequired,
  onClickLoadMore: PropTypes.func.isRequired,
};
