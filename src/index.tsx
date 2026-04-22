import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Fitness from "./apps/Fitness";
import Flow from "./apps/Flow";
import BJP from "./apps/BJP";
import Krabi from "./apps/Krabi";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fitness" element={<Fitness />} />
        <Route path="/flow" element={<Flow />} />
        <Route path="/bjp" element={<BJP />} />
        <Route path="/krabi" element={<Krabi />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
