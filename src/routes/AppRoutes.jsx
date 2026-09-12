import { Routes, Route, Link } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ThreadDetailPage from '../pages/ThreadDetailPage';
import CreateThreadPage from '../pages/CreateThreadPage';
import LeaderboardPage from '../pages/LeaderboardPage';

const NotFoundPage = () => (
  <div className="not-found-container">
    <h1 className="not-found-code">404</h1>
    <h2 className="not-found-title">Halaman Tidak Ditemukan</h2>
    <p className="not-found-desc">
      Halaman yang kamu tuju tidak tersedia atau sudah dipindahkan.
    </p>
    <Link to="/" className="btn btn-primary">
      Kembali ke Beranda
    </Link>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/threads/:threadId" element={<ThreadDetailPage />} />
      <Route path="/create-thread" element={<CreateThreadPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
