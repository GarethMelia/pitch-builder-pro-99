import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CreateProposal from "./pages/CreateProposal";
import ViewProposal from "./pages/ViewProposal";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Settings from "./pages/Settings";
import Templates from "./pages/Templates";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateProposal />} />
        <Route path="/edit/:id" element={<CreateProposal />} />
        <Route path="/view/:id" element={<ViewProposal />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </Router>
  );
}

export default App;