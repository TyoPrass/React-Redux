export const postedAt = (dateString) => {
  const now = new Date();
  const posted = new Date(dateString);
  const diff = now - posted;

  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays} hari lalu`;
  }
  if (diffHours > 0) {
    return `${diffHours} jam lalu`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} menit lalu`;
  }
  if (diffSeconds > 0) {
    return `${diffSeconds} detik lalu`;
  }
  return 'baru saja';
};

export const formatFullDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
