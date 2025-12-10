import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Login from './Login';
import WatermarkPage from './wm';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/watermark" element={<WatermarkPage />} />
      </Routes>
    </Router>
  );
}

export default App;
