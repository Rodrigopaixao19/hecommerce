import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AuthContextProvider from "./state/authContext";
import ModalContextProvider from "./state/modalContext";
import ProductsContextProvider from "./state/productContext";
import Layout from "./components/Layout/Layout";
import Routes from "./routes/Routes";

import "./App.css";
import "./fortawesome";
function App() {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <ProductsContextProvider>
          <Router>
            <Layout>
              <Routes />
            </Layout>
          </Router>
        </ProductsContextProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  );
}
export default App;
