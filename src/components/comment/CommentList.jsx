import PropTypes from 'prop-types';
import { MessageSquare } from 'lucide-react';
import CommentItem from './CommentItem';

const CommentList = ({ comments, currentUserId, onVoteUp, onVoteDown }) => {
  return (
    <div className="comment-list-section">
      <div className="comment-list-header">
        <MessageSquare size={18} />
        <h3>Balasan ({comments ? comments.length : 0})</h3>
      </div>

      {!comments || comments.length === 0 ? (
        <div className="empty-comments-box">
          <p>Belum ada balasan untuk diskusi ini. Jadilah yang pertama berkomentar!</p>
        </div>
      ) : (
        <div className="comments-stack">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
              onVoteUp={onVoteUp}
              onVoteDown={onVoteDown}
            />
          ))}
        </div>
      )}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  currentUserId: PropTypes.string,
  onVoteUp: PropTypes.func.isRequired,
  onVoteDown: PropTypes.func.isRequired,
};

export default CommentList;
