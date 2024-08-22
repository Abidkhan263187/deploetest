import { RouterProvider } from "react-router-dom";
import { appRouter } from "./Router/index";
// import { ToastContainer } from "react-toastify";
import { UseInactivityTimer } from "./components/common/UserInActivityTimer";

function App() {
  UseInactivityTimer();
  return (
    <>
    {/* <ToastContainer /> */}
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
