import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Fitness from "./apps/Fitness";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fitness" element={<Fitness />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
