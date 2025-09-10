// App.jsx
import { Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/mainpage';
import ProjectDetails from "./pages/projectdetails";

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
    </div>
  );
}

export default App;
