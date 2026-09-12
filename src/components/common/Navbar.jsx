import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MessageSquare, Trophy, PlusCircle, LogOut, LogIn, UserPlus } from 'lucide-react';
import { asyncLogout } from '../../features/auth/authThunks';
import Avatar from './Avatar';
import Button from './Button';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(asyncLogout());
    navigate('/');
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            <div className="brand-logo-wrapper">
              <MessageSquare className="brand-icon" size={22} />
            </div>
            <div className="brand-text-wrapper">
              <span className="brand-title">ForumKu</span>
              <span className="brand-badge">Dicoding</span>
            </div>
          </Link>

          <nav className="navbar-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              <MessageSquare size={17} />
              <span>Diskusi</span>
            </NavLink>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              <Trophy size={17} />
              <span>Klasemen</span>
            </NavLink>
          </nav>
        </div>

        <div className="navbar-right">
          {user ? (
            <div className="navbar-user-actions">
              <Link to="/create-thread">
                <Button variant="primary" size="sm" icon={PlusCircle}>
                  Buat Diskusi
                </Button>
              </Link>

              <div className="navbar-profile">
                <Avatar src={user.avatar} name={user.name} size="sm" />
                <span className="navbar-user-name" title={user.name}>
                  {user.name}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="navbar-logout-btn"
                title="Keluar akun"
                aria-label="Keluar akun"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="navbar-guest-actions">
              <Link to="/login">
                <Button variant="ghost" size="sm" icon={LogIn}>
                  Masuk
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm" icon={UserPlus}>
                  Daftar
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
