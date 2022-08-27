import PropTypes from 'prop-types';
import * as SC from './Button.styled';

export default function Button({ onClick }) {
  return (
    <SC.Button onClick={onClick} type="button">
      Load more
    </SC.Button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
