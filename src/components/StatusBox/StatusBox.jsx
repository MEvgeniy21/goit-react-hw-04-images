import Button from 'components/Button';
import Error from 'components/Error';
import Loader from 'components/Loader';
import { scrollLoadMore } from 'utilities';

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
    if (isLoadMore) {
      scrollLoadMore();
      return <Button onClick={onClickLoadMore} />;
    }
  }
  if (currentStatus === statusList.REJECTED) {
    return <Error error={error} />;
  }
}
