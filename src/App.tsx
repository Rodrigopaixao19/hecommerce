import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Routes from "./routes/Routes";

import "./App.css";
import "./fortawesome";

function App() {
  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  );
}
export default App;
