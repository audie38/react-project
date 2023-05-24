import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="container my-3">
        <Outlet />
      </div>
    </>
  );
}

export default App;
