import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";
import Home from "./components/Home.jsx";

const App = () => {
  return (
  <Router>
    <Routes>
    <Route path="/home" element={<Home />} />
  </Routes>
</Router>
  );
};

export default App;
