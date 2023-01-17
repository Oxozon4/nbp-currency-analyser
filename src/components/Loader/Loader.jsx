import { SyncLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import './Loader.scss';

const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="loader" data-testid="loader-element">
          <SyncLoader size={50} color={'#1ED760'} loading={isLoading} />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
