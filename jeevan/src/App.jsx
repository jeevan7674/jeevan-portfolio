// App.jsx
import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/mainpage';
import ProjectDetails from "./pages/projectdetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
