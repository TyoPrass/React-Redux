import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trophy, Award, Flame } from 'lucide-react';
import { asyncReceiveLeaderboards } from '../features/leaderboard/leaderboardThunks';
import { clearError } from '../features/leaderboard/leaderboardSlice';
import Avatar from '../components/common/Avatar';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const LeaderboardPage = () => {
  const dispatch = useDispatch();
  const { data: leaderboards, isLoading, error } = useSelector(
    (state) => state.leaderboard
  );

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="rank-badge rank-gold">#1</span>;
    if (rank === 2) return <span className="rank-badge rank-silver">#2</span>;
    if (rank === 3) return <span className="rank-badge rank-bronze">#3</span>;
    return <span className="rank-badge rank-standard">#{rank}</span>;
  };

  return (
    <div className="leaderboard-page-container">
      <div className="page-header-card leaderboard-header-card">
        <div className="page-header-icon-box leaderboard-icon-box">
          <Trophy size={32} className="trophy-gold-icon" />
        </div>
        <div>
          <h1 className="page-title">Klasemen Pengguna Aktif</h1>
          <p className="page-subtitle">
            Daftar kontributor terbaik dan anggota paling aktif berdasarkan skor reputasi di Dicoding Forum.
          </p>
        </div>
      </div>

      {error && (
        <ErrorMessage
          message={error}
          onDismiss={() => dispatch(clearError())}
          onRetry={() => dispatch(asyncReceiveLeaderboards())}
        />
      )}

      {isLoading && leaderboards.length === 0 ? (
        <Loading text="Memuat data klasemen..." />
      ) : (
        <div className="leaderboard-card">
          <div className="leaderboard-table-header">
            <span className="col-rank">Peringkat</span>
            <span className="col-user">Pengguna</span>
            <span className="col-score">Skor</span>
          </div>

          <div className="leaderboard-list">
            {leaderboards.map((item, index) => {
              const rank = index + 1;
              return (
                <div
                  key={item.user.id}
                  className={`leaderboard-item-row ${
                    rank <= 3 ? `top-rank-row top-${rank}` : ''
                  }`}
                >
                  <div className="col-rank">{getRankBadge(rank)}</div>
                  <div className="col-user">
                    <Avatar
                      src={item.user.avatar}
                      name={item.user.name}
                      size="md"
                    />
                    <div className="user-text-info">
                      <span className="leaderboard-user-name">
                        {item.user.name}
                      </span>
                      <span className="leaderboard-user-email">
                        {item.user.email}
                      </span>
                    </div>
                  </div>
                  <div className="col-score">
                    <div className="score-pill">
                      {rank <= 3 ? (
                        <Award size={16} className="score-icon" />
                      ) : (
                        <Flame size={16} className="score-icon" />
                      )}
                      <span>{item.score}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;
