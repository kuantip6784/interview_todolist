import React from "react";
import "./App.css";
import ListPage from "./pages/List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "pages/Layout";
import LoginPage from "pages/Login";
import AddPage from "pages/Add";
import UpdatePage from "pages/update";

function App() {
  return (
    <div className="App ">
      <header className="App-header"></header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="login" element={<LoginPage />} />
            <Route path="list" element={<ListPage />} />
            <Route path="addTodolist" element={<AddPage />} />
            <Route path="update/:id" element={<UpdatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
