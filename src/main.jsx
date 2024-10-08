import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/store.js";
import { ThemeProvider } from "./ThemeProvider/ThemeProvider.jsx"; // Import ThemeProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider> {/* Use ThemeProvider instead of Theme */}
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
