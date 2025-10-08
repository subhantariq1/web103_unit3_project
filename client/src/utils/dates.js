export const dates = {
    // "14:00" -> "2:00 PM"
    async formatTime(timeStr) {
      if (!timeStr) return '';
      const [h, m] = timeStr.split(':').map(Number);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const hh = (h % 12) || 12;
      const mm = String(m ?? 0).padStart(2, '0');
      return `${hh}:${mm} ${ampm}`;
    },
  
    // "2025-11-02T09:30:00.000Z" -> human remaining text
    async formatRemainingTime(iso) {
      if (!iso) return '';
      const target = new Date(iso);
      const now = new Date();
      const diffMs = target - now;
  
      if (diffMs <= 0) return 'Event Passed';
  
      const mins = Math.floor(diffMs / 60000);
      const days = Math.floor(mins / (60 * 24));
      const hours = Math.floor((mins % (60 * 24)) / 60);
      const minutes = mins % 60;
  
      if (days > 0) return `${days}d ${hours}h ${minutes}m remaining`;
      if (hours > 0) return `${hours}h ${minutes}m remaining`;
      return `${minutes}m remaining`;
    },
  
    // style the remaining label red if passed (same id pattern your component uses)
    formatNegativeTimeRemaining(remainingText, id) {
      if (remainingText === 'Event Passed') {
        const el = document.getElementById(`remaining-${id}`);
        if (el) el.style.color = 'crimson';
      }
    }
  };
  