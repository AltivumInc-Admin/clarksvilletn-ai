import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Campaign from './pages/Campaign';
import Showcase from './pages/Showcase';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="campaign" element={<Campaign />} />
          <Route path="showcase" element={<Showcase />} />
          <Route path="services" element={<div className="min-h-screen pt-20 flex items-center justify-center"><h1 className="text-4xl font-serif text-river-blue">Services Page - Coming Soon</h1></div>} />
          <Route path="resources" element={<div className="min-h-screen pt-20 flex items-center justify-center"><h1 className="text-4xl font-serif text-river-blue">Resources Page - Coming Soon</h1></div>} />
          <Route path="about" element={<div className="min-h-screen pt-20 flex items-center justify-center"><h1 className="text-4xl font-serif text-river-blue">About Page - Coming Soon</h1></div>} />
          <Route path="contact" element={<div className="min-h-screen pt-20 flex items-center justify-center"><h1 className="text-4xl font-serif text-river-blue">Contact Page - Coming Soon</h1></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;