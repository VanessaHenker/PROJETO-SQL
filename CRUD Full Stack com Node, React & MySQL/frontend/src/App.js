import GlobalStyle from "./styles/global"
import {tiast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


function App() {
  return (
    <>
    <ToastContainer  autoClose = {3000} position = {ToastContainer.POSITION.BOTTOM_LEFT}/>
      <GlobalStyle/>
    </>
  );
}

export default App;
