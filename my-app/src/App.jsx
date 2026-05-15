import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home"; // CryoChain homepage
import Contact from "./pages/Contact";
// Import other pages when ready
import Crisis from "./pages/Opportunity";
import Platform from "./pages/Platform";
import Vision from "./pages/Vision";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/opportunity" element={<Crisis />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Add more routes as you create pages */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
