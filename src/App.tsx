import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import ModalContextProvider from "./state/modalContext";
import Layout from "./components/Layout/Layout";
import Routes from "./routes/Routes";

import "./App.css";
import "./fortawesome";

function App() {
  return (
    <ModalContextProvider>
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </ModalContextProvider>
  );
}
export default App;
