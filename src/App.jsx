import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import DashboardLayout from "./components/layout/DashboardLayout";

// 🔍 Import SearchProvider
import { SearchProvider } from "./components/SearchContext";

function App() {
  return (
    <SearchProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<DashboardLayout />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
