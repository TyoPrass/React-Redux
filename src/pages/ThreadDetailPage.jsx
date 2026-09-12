import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleVoteDetailThread,
  asyncToggleVoteComment,
} from '../features/comments/commentsThunks';
import {
  clearError,
  clearSelectedThread,
} from '../features/comments/commentsSlice';
import Avatar from '../components/common/Avatar';
import VoteButton from '../components/thread/VoteButton';
import CommentForm from '../components/comment/CommentForm';
import CommentList from '../components/comment/CommentList';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { postedAt } from '../utils/formatDate';

const ThreadDetailPage = () => {
  const { threadId } = useParams();
  const dispatch = useDispatch();

  const { selectedThread, isLoading, error } = useSelector(
    (state) => state.comments
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));

    return () => {
      dispatch(clearSelectedThread());
    };
  }, [dispatch, threadId]);

  const handleVoteThreadUp = () => {
    dispatch(asyncToggleVoteDetailThread({ threadId, voteType: 'up' }));
  };

  const handleVoteThreadDown = () => {
    dispatch(asyncToggleVoteDetailThread({ threadId, voteType: 'down' }));
  };

  const handleVoteCommentUp = (commentId) => {
    dispatch(
      asyncToggleVoteComment({ threadId, commentId, voteType: 'up' })
    );
  };

  const handleVoteCommentDown = (commentId) => {
    dispatch(
      asyncToggleVoteComment({ threadId, commentId, voteType: 'down' })
    );
  };

  const handleAddComment = (content) => {
    dispatch(asyncAddComment({ threadId, content }));
  };

  if (isLoading && !selectedThread) {
    return <Loading fullPage text="Memuat detail diskusi..." />;
  }

  if (!selectedThread && !isLoading) {
    return (
      <div className="not-found-page">
        <h2>Diskusi tidak ditemukan</h2>
        <p>Diskusi yang kamu cari mungkin sudah dihapus atau tidak tersedia.</p>
        <Link to="/" className="btn btn-primary">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="thread-detail-container">
      {/* Back Navigation */}
      <div className="detail-navigation">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          <span>Kembali ke Semua Diskusi</span>
        </Link>
      </div>

      {error && (
        <ErrorMessage
          message={error}
          onDismiss={() => dispatch(clearError())}
          onRetry={() => dispatch(asyncReceiveThreadDetail(threadId))}
        />
      )}

      {selectedThread && (
        <>
          {/* Main Thread Article */}
          <article className="detail-article-card">
            <header className="detail-header">
              <div className="detail-author-box">
                <Avatar
                  src={selectedThread.owner?.avatar}
                  name={selectedThread.owner?.name || 'Pengguna'}
                  size="md"
                />
                <div className="detail-author-info">
                  <h3 className="detail-author-name">
                    {selectedThread.owner?.name || 'Pengguna'}
                  </h3>
                  <span className="detail-timestamp">
                    <Clock size={13} className="inline-icon" />
                    Diposting {postedAt(selectedThread.createdAt)}
                  </span>
                </div>
              </div>

              {selectedThread.category && (
                <span className="thread-category-badge">
                  <Tag size={13} />
                  <span>#{selectedThread.category}</span>
                </span>
              )}
            </header>

            <h1 className="detail-title">{selectedThread.title}</h1>

            <div
              className="detail-body-content"
              dangerouslySetInnerHTML={{ __html: selectedThread.body }}
            />

            <footer className="detail-footer">
              <div className="detail-vote-section">
                <span className="vote-label">Apakah diskusi ini membantu?</span>
                <VoteButton
                  upVotes={selectedThread.upVotesBy || []}
                  downVotes={selectedThread.downVotesBy || []}
                  userId={user?.id}
                  onVoteUp={handleVoteThreadUp}
                  onVoteDown={handleVoteThreadDown}
                  size="md"
                />
              </div>
            </footer>
          </article>

          {/* Comment Form */}
          <CommentForm
            onSubmit={handleAddComment}
            isLoading={isLoading}
            isLoggedIn={Boolean(user)}
          />

          {/* Comment List */}
          <CommentList
            comments={selectedThread.comments || []}
            currentUserId={user?.id}
            onVoteUp={handleVoteCommentUp}
            onVoteDown={handleVoteCommentDown}
          />
        </>
      )}
    </div>
  );
};

export default ThreadDetailPage;
