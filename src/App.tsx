import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Showcase from './pages/Showcase';
import Resources from './pages/Resources';
import Legal from './pages/Legal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="showcase" element={<Showcase />} />
          <Route path="resources" element={<Resources />} />
          <Route path="legal" element={<Legal />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
