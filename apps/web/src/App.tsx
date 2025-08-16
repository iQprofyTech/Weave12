import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CanvasPage from './pages/CanvasPage';
import TopMenu from './components/TopMenu';
import WorkspacePage from './pages/WorkspacePage';

export default function App() {
  return (
    <BrowserRouter>
      <TopMenu />
      <Routes>
        <Route path="/" element={<WorkspacePage />} />
        <Route path="/canvas/:id" element={<CanvasPage />} />
      </Routes>
    </BrowserRouter>
  );
}
