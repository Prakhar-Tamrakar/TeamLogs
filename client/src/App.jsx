import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      {/* Toast container outside Routes */}
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
