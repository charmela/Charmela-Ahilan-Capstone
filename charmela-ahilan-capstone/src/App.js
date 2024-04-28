import Header from "./components/header/Header";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import JournalEntries from "./pages/journalEntries/JournalEntries";
import JournalUpload from "./pages/journal-upload/JournalUpload";

function App() {
  return (
    <BrowserRouter>
      <div className="components">
        <Header />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-journal-entry" element={<JournalUpload />} />
          <Route path="/journal-entries" element={<JournalEntries />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
