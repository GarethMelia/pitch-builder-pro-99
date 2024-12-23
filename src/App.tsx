import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import CreateProposal from "./pages/CreateProposal";
import ViewProposal from "./pages/ViewProposal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create" element={<CreateProposal />} />
        <Route path="/edit/:id" element={<CreateProposal />} />
        <Route path="/view/:id" element={<ViewProposal />} />
      </Routes>
    </Router>
  );
}

export default App;
