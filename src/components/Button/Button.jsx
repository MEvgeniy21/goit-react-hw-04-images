import * as SC from './Button.styled';

export default function Button({ onClick }) {
  return (
    <SC.Button onClick={onClick} type="button">
      Load more
    </SC.Button>
  );
}
