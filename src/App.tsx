import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Workouts from "./pages/Workouts";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/workouts" element={<Workouts />} />
    </Routes>
  );
}

export default App;
