import { useState } from "react";
import Loader from "../../components/Loader/Loader";
import Tabs from "../../components/Tabs/Tabs";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

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
      <div className="app" data-testid="app">
        <Tabs setIsLoading={setIsLoading} />
      </div>
    </>
  );
};

export default App;
