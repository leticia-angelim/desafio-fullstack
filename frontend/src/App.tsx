import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Providers from "./contexts";
import Routes from "./routes";

const App = () => {
  return (
    <Providers>
      <Routes />
      <ToastContainer autoClose={3000} />
    </Providers>
  );
};

export default App;
