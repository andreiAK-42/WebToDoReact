import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Index from './index.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
