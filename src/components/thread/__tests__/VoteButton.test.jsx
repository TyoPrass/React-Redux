import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteButton from '../VoteButton';

/**
 * test scenario for VoteButton component
 *
 * - VoteButton component
 *  - should render vote counts correctly
 *  - should apply active class when user has upvoted
 *  - should apply active class when user has downvoted
 *  - should call onVoteUp callback when upvote button is clicked
 *  - should call onVoteDown callback when downvote button is clicked
 */

describe('VoteButton component', () => {
  it('should render vote counts correctly', () => {
    // Arrange
    const upVotes = ['user-1', 'user-2'];
    const downVotes = ['user-3'];

    // Act
    render(
      <VoteButton
        upVotes={upVotes}
        downVotes={downVotes}
        onVoteUp={() => {}}
        onVoteDown={() => {}}
      />
    );

    // Assert
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should apply active class when user has upvoted', () => {
    // Arrange & Act
    render(
      <VoteButton
        upVotes={['user-1']}
        downVotes={[]}
        userId="user-1"
        onVoteUp={() => {}}
        onVoteDown={() => {}}
      />
    );

    // Assert
    const upVoteBtn = screen.getByRole('button', { name: /upvote/i });
    expect(upVoteBtn).toHaveClass('vote-up-active');
  });

  it('should apply active class when user has downvoted', () => {
    // Arrange & Act
    render(
      <VoteButton
        upVotes={[]}
        downVotes={['user-1']}
        userId="user-1"
        onVoteUp={() => {}}
        onVoteDown={() => {}}
      />
    );

    // Assert
    const downVoteBtn = screen.getByRole('button', { name: /downvote/i });
    expect(downVoteBtn).toHaveClass('vote-down-active');
  });

  it('should call onVoteUp callback when upvote button is clicked', async () => {
    // Arrange
    const mockOnVoteUp = vi.fn();
    render(
      <VoteButton
        upVotes={[]}
        downVotes={[]}
        onVoteUp={mockOnVoteUp}
        onVoteDown={() => {}}
      />
    );

    const user = userEvent.setup();
    const upVoteBtn = screen.getByRole('button', { name: /upvote/i });

    // Act
    await user.click(upVoteBtn);

    // Assert
    expect(mockOnVoteUp).toHaveBeenCalledTimes(1);
  });

  it('should call onVoteDown callback when downvote button is clicked', async () => {
    // Arrange
    const mockOnVoteDown = vi.fn();
    render(
      <VoteButton
        upVotes={[]}
        downVotes={[]}
        onVoteUp={() => {}}
        onVoteDown={mockOnVoteDown}
      />
    );

    const user = userEvent.setup();
    const downVoteBtn = screen.getByRole('button', { name: /downvote/i });

    // Act
    await user.click(downVoteBtn);

    // Assert
    expect(mockOnVoteDown).toHaveBeenCalledTimes(1);
  });
});
