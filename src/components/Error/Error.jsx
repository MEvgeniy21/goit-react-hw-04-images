import PropTypes from 'prop-types';

export default function Error({ error }) {
  return <>{error}</>;
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
};
