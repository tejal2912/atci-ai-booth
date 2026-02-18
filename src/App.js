import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home.tsx";
import DownloadPage from "./components/DownloadPage.tsx";

const App = () => {
  return (
    <BrowserRouter basename="/atci-ai-booth">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/download" element={<DownloadPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
