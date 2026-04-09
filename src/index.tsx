import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Fitness from "./apps/Fitness";
import Flow from "./apps/Flow";
import BJP from "./apps/BJP";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fitness" element={<Fitness />} />
        <Route path="/flow" element={<Flow />} />
        <Route path="/bjp" element={<BJP />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
