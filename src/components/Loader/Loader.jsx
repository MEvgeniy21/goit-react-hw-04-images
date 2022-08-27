import { RotatingLines } from 'react-loader-spinner';
import { theme } from 'theme';

export default function Loader() {
  return (
    <>
      {/* Loading... */}
      <RotatingLines
        strokeColor={theme.colors.bg}
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </>
  );
}
