import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const AIReady = lazy(() => import('./pages/AIReady'));
const AIReadySubmit = lazy(() => import('./pages/AIReadySubmit'));
const Resources = lazy(() => import('./pages/Resources'));
const Legal = lazy(() => import('./pages/Legal'));

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
