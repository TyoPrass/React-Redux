import PropTypes from 'prop-types';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const VoteButton = ({
  upVotes = [],
  downVotes = [],
  userId = null,
  onVoteUp,
  onVoteDown,
  orientation = 'horizontal',
  size = 'md',
}) => {
  const isUpVoted = userId ? upVotes.includes(userId) : false;
  const isDownVoted = userId ? downVotes.includes(userId) : false;

  const upVoteCount = upVotes.length;
  const downVoteCount = downVotes.length;

  return (
    <div className={`vote-widget vote-${orientation} vote-${size}`}>
      <button
        type="button"
        onClick={onVoteUp}
        className={`vote-btn vote-up-btn ${isUpVoted ? 'vote-up-active' : ''}`}
        title={isUpVoted ? 'Batalkan suka' : 'Sukai diskusi'}
        aria-label="Upvote"
      >
        <ThumbsUp size={size === 'sm' ? 14 : 16} />
        <span className="vote-count">{upVoteCount}</span>
      </button>

      <button
        type="button"
        onClick={onVoteDown}
        className={`vote-btn vote-down-btn ${isDownVoted ? 'vote-down-active' : ''}`}
        title={isDownVoted ? 'Batalkan tidak suka' : 'Tidak suka diskusi'}
        aria-label="Downvote"
      >
        <ThumbsDown size={size === 'sm' ? 14 : 16} />
        <span className="vote-count">{downVoteCount}</span>
      </button>
    </div>
  );
};

VoteButton.propTypes = {
  upVotes: PropTypes.arrayOf(PropTypes.string),
  downVotes: PropTypes.arrayOf(PropTypes.string),
  userId: PropTypes.string,
  onVoteUp: PropTypes.func.isRequired,
  onVoteDown: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  size: PropTypes.oneOf(['sm', 'md']),
};

export default VoteButton;
