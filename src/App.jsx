import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import CSVTool from "./pages/CSVTool.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/csv-tool" element={<CSVTool />} />
      </Routes>
    </Router>
  );
}

export default App;
