import PropTypes from 'prop-types';
import { Clock } from 'lucide-react';
import Avatar from '../common/Avatar';
import VoteButton from '../thread/VoteButton';
import { postedAt } from '../../utils/formatDate';

const CommentItem = ({ comment, currentUserId, onVoteUp, onVoteDown }) => {
  return (
    <div className="comment-item-card">
      <div className="comment-item-header">
        <div className="comment-author-info">
          <Avatar
            src={comment.owner?.avatar}
            name={comment.owner?.name || 'Pengguna'}
            size="sm"
          />
          <div className="comment-meta">
            <span className="comment-author-name">
              {comment.owner?.name || 'Pengguna'}
            </span>
            <span className="comment-time">
              <Clock size={12} className="inline-icon" />
              {postedAt(comment.createdAt)}
            </span>
          </div>
        </div>

        <VoteButton
          upVotes={comment.upVotesBy || []}
          downVotes={comment.downVotesBy || []}
          userId={currentUserId}
          onVoteUp={() => onVoteUp(comment.id)}
          onVoteDown={() => onVoteDown(comment.id)}
          size="sm"
        />
      </div>

      <div
        className="comment-content"
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
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

export default CommentItem;
