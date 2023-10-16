import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import NavigationBar from "./components/ui/NavigationBar";
import Notes from "./pages/Note";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Notes />,
    },
    {
      path: "/note",
      element: <h1>Note</h1>,
    },
    {
      path: "/note/:id",
      element: <h1>Show</h1>,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return (
    <>
      <NavigationBar />
      <Container className="my-4">
        <RouterProvider router={router} />
      </Container>
    </>
  );
}

export default App;
