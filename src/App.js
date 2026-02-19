import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

import Home from "./components/Home.tsx";
import DownloadPage from "./components/DownloadPage.tsx";

const App = () => {
  return (
    <HashRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/download" element={<DownloadPage />} />
      </Routes>
    </HashRouter>

  );
};

export default App;
