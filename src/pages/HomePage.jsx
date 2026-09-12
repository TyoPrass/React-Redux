import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PlusCircle, Sparkles, MessageCircle } from 'lucide-react';
import {
  asyncPopulateUsersAndThreads,
  asyncToggleVoteThread,
} from '../features/threads/threadsThunks';
import {
  setSelectedCategory,
  clearError,
} from '../features/threads/threadsSlice';
import CategoryFilter from '../components/common/CategoryFilter';
import ThreadList from '../components/thread/ThreadList';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import Button from '../components/common/Button';

const HomePage = () => {
  const dispatch = useDispatch();
  const { data: threads, selectedCategory, isLoading, error } = useSelector(
    (state) => state.threads
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  // Extract unique categories
  const categories = Array.from(
    new Set(
      threads
        .map((t) => t.category)
        .filter((cat) => Boolean(cat && cat.trim()))
    )
  );

  // Filter threads based on selected category
  const filteredThreads =
    selectedCategory === 'all'
      ? threads
      : threads.filter((t) => t.category === selectedCategory);

  const handleSelectCategory = (category) => {
    dispatch(setSelectedCategory(category));
  };

  const handleVoteUp = (threadId) => {
    dispatch(asyncToggleVoteThread({ threadId, voteType: 'up' }));
  };

  const handleVoteDown = (threadId) => {
    dispatch(asyncToggleVoteThread({ threadId, voteType: 'down' }));
  };

  return (
    <div className="home-page-layout">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={15} />
            <span>Komunitas Pengembang Indonesia</span>
          </div>
          <h1 className="hero-heading">
            Temukan Jawaban, Berbagi Ide & Diskusi Teknologi
          </h1>
          <p className="hero-subheading">
            Forum diskusi interaktif untuk bertanya seputar React, JavaScript,
            web development, serta bertukar solusi dengan sesama developer.
          </p>
          <div className="hero-actions">
            <Link to="/create-thread">
              <Button variant="primary" size="lg" icon={PlusCircle}>
                Buat Diskusi Baru
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button variant="outline" size="lg">
                Lihat Klasemen
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="home-main-container">
        {error && (
          <ErrorMessage
            message={error}
            onDismiss={() => dispatch(clearError())}
            onRetry={() => dispatch(asyncPopulateUsersAndThreads())}
          />
        )}

        <div className="home-feed-header">
          <div className="feed-title-box">
            <MessageCircle size={22} className="feed-title-icon" />
            <h2 className="feed-title">Daftar Diskusi Terbaru</h2>
            <span className="feed-count-pill">{filteredThreads.length}</span>
          </div>
        </div>

        {/* Category Filter Chips */}
        {categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {/* Thread List / Loading */}
        {isLoading && threads.length === 0 ? (
          <Loading text="Memuat diskusi terbaru..." />
        ) : (
          <ThreadList
            threads={filteredThreads}
            currentUserId={user?.id}
            onVoteUp={handleVoteUp}
            onVoteDown={handleVoteDown}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
