import { useState } from 'react';
import Loader from '../../components/Loader/Loader';
import Tabs from '../../components/Tab/Tabs';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Loader isLoading={isLoading} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="app">
        <a
          className="app-link"
          href="http://api.nbp.pl/"
          target="_blank"
          rel="noopener noreferrer"
        >
          API NBP
        </a>
        <Tabs setIsLoading={setIsLoading}/>
      </div>
    </>
  );
};

export default App;
