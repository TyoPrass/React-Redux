import PropTypes from 'prop-types';
import { MessageSquareOff, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThreadItem from './ThreadItem';
import Button from '../common/Button';

const ThreadList = ({ threads, currentUserId, onVoteUp, onVoteDown }) => {
  if (!threads || threads.length === 0) {
    return (
      <div className="empty-state-box">
        <div className="empty-icon-wrapper">
          <MessageSquareOff size={48} className="empty-icon" />
        </div>
        <h3 className="empty-title">Tidak ada diskusi ditemukan</h3>
        <p className="empty-description">
          Belum ada diskusi untuk kategori ini. Buat diskusi baru dan bagikan pemikiranmu dengan komunitas!
        </p>
        <Link to="/create-thread">
          <Button variant="primary" size="md" icon={PlusCircle}>
            Mulai Diskusi Baru
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          currentUserId={currentUserId}
          onVoteUp={onVoteUp}
          onVoteDown={onVoteDown}
        />
      ))}
    </div>
  );
};

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentUserId: PropTypes.string,
  onVoteUp: PropTypes.func.isRequired,
  onVoteDown: PropTypes.func.isRequired,
};

export default ThreadList;
