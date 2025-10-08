// src/services/EventsAPI.jsx
const BASE_URL = import.meta.env.VITE_API_BASE || '/api';

async function handle(res) {
  const ct = res.headers.get('content-type') || '';
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0,200)}`);
  if (!ct.includes('application/json')) throw new Error(`Expected JSON, got ${ct}: ${text.slice(0,200)}`);
  return JSON.parse(text);
}

const EventsAPI = {
  async getAllEvents() {
    return handle(await fetch(`${BASE_URL}/events`));
  },
  async getEventById(eventId) {
    if (eventId === undefined || eventId === null || eventId === '') return null;
    const id = encodeURIComponent(eventId);
    return handle(await fetch(`${BASE_URL}/events/${id}`));
  },
  // alias so either call works
  async getEventsById(eventId) {
    return this.getEventById(eventId);
  },
  async getEventsByLocationId(locationId) {
    const all = await this.getAllEvents();
    return all.filter(e => String(e.locationID) === String(locationId));
  }
};

export default EventsAPI;
