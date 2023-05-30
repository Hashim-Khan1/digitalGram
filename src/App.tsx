import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox";
import Profile from "./pages/Profile";
import AuthPage from "./pages/Login";
import SettingsPage from "./pages/Settings";
import Users from "./pages/Users";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/Inbox" element={<Inbox />} />
        <Route path="/" element={<AuthPage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Settings" element={<SettingsPage />} />
        <Route path="/user/:users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
