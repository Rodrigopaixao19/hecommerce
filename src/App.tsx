import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AuthContextProvider from "./state/authContext";
import ModalContextProvider from "./state/modalContext";
import Layout from "./components/Layout/Layout";
import Routes from "./routes/Routes";

import "./App.css";
import "./fortawesome";

function App() {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <Router>
          <Layout>
            <Routes />
          </Layout>
        </Router>
      </ModalContextProvider>
    </AuthContextProvider>
  );
}
export default App;
