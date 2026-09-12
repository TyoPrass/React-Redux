import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CommentForm from '../CommentForm';

/**
 * test scenario for CommentForm component
 *
 * - CommentForm component
 *  - should render login prompt when isLoggedIn is false
 *  - should render comment form and textarea when isLoggedIn is true
 *  - should handle typing in comment textarea correctly
 *  - should call onSubmit with entered text and reset textarea when submitted
 */

describe('CommentForm component', () => {
  it('should render login prompt when isLoggedIn is false', () => {
    // Arrange & Act
    render(
      <MemoryRouter>
        <CommentForm onSubmit={() => {}} isLoggedIn={false} />
      </MemoryRouter>
    );

    // Assert
    expect(
      screen.getByText(/Ingin ikut berdiskusi dan memberikan balasan\?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Masuk untuk Membalas/i })
    ).toBeInTheDocument();
  });

  it('should render comment form and textarea when isLoggedIn is true', () => {
    // Arrange & Act
    render(
      <MemoryRouter>
        <CommentForm onSubmit={() => {}} isLoggedIn={true} />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByRole('heading', { name: /Tulis Balasan/i })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Tulis tanggapan atau solusi kamu dengan sopan dan jelas/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Kirim Balasan/i })
    ).toBeInTheDocument();
  });

  it('should handle typing in comment textarea correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <CommentForm onSubmit={() => {}} isLoggedIn={true} />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const textarea = screen.getByPlaceholderText(/Tulis tanggapan atau solusi kamu dengan sopan dan jelas/i);

    // Act
    await user.type(textarea, 'Ini komentar pengujian saya');

    // Assert
    expect(textarea).toHaveValue('Ini komentar pengujian saya');
  });

  it('should call onSubmit with entered text and reset textarea when submitted', async () => {
    // Arrange
    const mockOnSubmit = vi.fn();
    render(
      <MemoryRouter>
        <CommentForm onSubmit={mockOnSubmit} isLoggedIn={true} />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const textarea = screen.getByPlaceholderText(/Tulis tanggapan atau solusi kamu dengan sopan dan jelas/i);
    const submitBtn = screen.getByRole('button', { name: /Kirim Balasan/i });

    // Act
    await user.type(textarea, 'Komentar yang valid');
    await user.click(submitBtn);

    // Assert
    expect(mockOnSubmit).toHaveBeenCalledWith('Komentar yang valid');
    expect(textarea).toHaveValue('');
  });
});
