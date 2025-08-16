import TopMenu from '@/components/TopMenu';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WorkspacePage from '@/pages/WorkspacePage';
import CanvasPage from '@/pages/CanvasPage';
import ChartsPage from '@/pages/ChartsPage';
import SettingsPage from '@/pages/SettingsPage';

export default function App() {
  return (
    <div className="min-h-dvh bg-dot">
      <BrowserRouter>
        <TopMenu />
        <Routes>
          <Route path="/" element={<WorkspacePage />} />
          <Route path="/w/:id" element={<CanvasPage />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
