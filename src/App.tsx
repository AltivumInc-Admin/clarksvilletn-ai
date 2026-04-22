import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import AIReady from './pages/AIReady';
import AIReadySubmit from './pages/AIReadySubmit';
import Resources from './pages/Resources';
import Legal from './pages/Legal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="ai-ready" element={<AIReady />} />
          <Route path="ai-ready/submit" element={<AIReadySubmit />} />
          <Route path="resources" element={<Resources />} />
          <Route path="legal" element={<Legal />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
