import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./store/auth-context.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
