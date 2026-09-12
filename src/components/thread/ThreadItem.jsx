import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MessageSquare, Tag, Clock } from 'lucide-react';
import Avatar from '../common/Avatar';
import VoteButton from './VoteButton';
import { postedAt } from '../../utils/formatDate';

const ThreadItem = ({ thread, currentUserId, onVoteUp, onVoteDown }) => {
  // Strip simple HTML tags if body contains raw HTML for preview
  const getBodyPreview = (text, maxLength = 180) => {
    if (!text) return '';
    const cleanText = text.replace(/<[^>]*>?/gm, '');
    if (cleanText.length <= maxLength) return cleanText;
    return `${cleanText.substring(0, maxLength)}...`;
  };

  return (
    <article className="thread-card">
      <div className="thread-card-header">
        <div className="thread-author-meta">
          <Avatar
            src={thread.owner?.avatar}
            name={thread.owner?.name || 'Pengguna'}
            size="sm"
          />
          <div className="author-details">
            <span className="author-name">{thread.owner?.name || 'Pengguna'}</span>
            <span className="post-date">
              <Clock size={12} className="inline-icon" />
              {postedAt(thread.createdAt)}
            </span>
          </div>
        </div>

        {thread.category && (
          <span className="thread-category-badge">
            <Tag size={12} />
            <span>#{thread.category}</span>
          </span>
        )}
      </div>

      <div className="thread-card-body">
        <h2 className="thread-title">
          <Link to={`/threads/${thread.id}`} className="thread-title-link">
            {thread.title}
          </Link>
        </h2>
        <p className="thread-preview-text">{getBodyPreview(thread.body)}</p>
      </div>

      <div className="thread-card-footer">
        <VoteButton
          upVotes={thread.upVotesBy || []}
          downVotes={thread.downVotesBy || []}
          userId={currentUserId}
          onVoteUp={() => onVoteUp(thread.id)}
          onVoteDown={() => onVoteDown(thread.id)}
          size="sm"
        />

        <Link
          to={`/threads/${thread.id}`}
          className="thread-comments-meta"
          title="Lihat komentar"
        >
          <MessageSquare size={16} />
          <span>{thread.totalComments ?? 0} Balasan</span>
        </Link>
      </div>
    </article>
  );
};

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    totalComments: PropTypes.number,
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
    owner: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
  currentUserId: PropTypes.string,
  onVoteUp: PropTypes.func.isRequired,
  onVoteDown: PropTypes.func.isRequired,
};

export default ThreadItem;
