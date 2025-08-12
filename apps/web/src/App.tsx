import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CanvasPage from './pages/CanvasPage';
import TopMenu from './components/TopMenu';

export default function App() {
  return (
    <BrowserRouter>
      <TopMenu />
      <Routes>
        <Route path="/" element={<CanvasPage />} />
      </Routes>
    </BrowserRouter>
  );
}
