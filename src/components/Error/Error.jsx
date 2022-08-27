import PropTypes from 'prop-types';

export default function Error({ error }) {
  return <>{error.message}</>;
}

Error.propTypes = {
  error: PropTypes.object.isRequired,
};
