import React from "react";
import "./App.css";
import ListPage from "./pages/List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "pages/Layout";
import LoginPage from "pages/Login";
function App() {
  return (
    <div className="App ">
      <header className="App-header"></header>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route path="list" element={<ListPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
