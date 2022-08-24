import { Box } from 'common/Box';
import { ButtonLoadMore } from './Button.styled';

export default function Button() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <ButtonLoadMore type="button">Load more</ButtonLoadMore>
    </Box>
  );
}
