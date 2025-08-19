import GlobalStyle from "./styles/global";
import {toast, toastContainer} from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <ToastContainer />
    </div>
  );
}

export default App;
