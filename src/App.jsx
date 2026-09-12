import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreloadProcess } from './features/auth/authThunks';
import Navbar from './components/common/Navbar';
import AppRoutes from './routes/AppRoutes';
import Loading from './components/common/Loading';

function App() {
  const dispatch = useDispatch();
  const { isPreload } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return <Loading fullPage text="Menyiapkan aplikasi..." />;
  }

  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main">
        <AppRoutes />
      </main>
      <footer className="app-footer">
        <div className="footer-container">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} <strong>ForumKu</strong> &bull; Proyek Submission Dicoding: Membangun Aplikasi React dengan Redux.
          </p>
          <div className="footer-links">
            <span>Dibuat dengan React &bull; Redux Toolkit &bull; Vite</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
