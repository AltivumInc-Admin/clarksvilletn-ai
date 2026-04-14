import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Showcase from './pages/Showcase';
import Analytics from './pages/Analytics';
import Resources from './pages/Resources';
import GetInvolved from './pages/GetInvolved';
import Legal from './pages/Legal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="programs" element={<Programs />} />
          <Route path="showcase" element={<Showcase />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="resources" element={<Resources />} />
          <Route path="get-involved" element={<GetInvolved />} />
          <Route path="legal" element={<Legal />} />
          {/* Redirect old routes */}
          <Route path="campaign" element={<About />} />
          <Route path="contact" element={<GetInvolved />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
