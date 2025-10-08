// /src/services/LocationsAPI.jsx
const BASE_URL = import.meta.env.VITE_API_BASE || '/api'; // ⬅️ for Option B

async function handle(res) {
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`LocationsAPI error (${res.status}): ${msg}`);
  }
  return res.json();
}

const LocationsAPI = {
  /** GET /locations */
  async getAllLocations() {
    const res = await fetch(`${BASE_URL}/locations`, { credentials: 'include' });
    return handle(res);
  },

  /** GET /locations/:locationId */
  async getLocationById(locationId) {
    if (locationId == null) throw new Error('getLocationById requires locationId');
    const res = await fetch(`${BASE_URL}/locations/${locationId}`, { credentials: 'include' });
    return handle(res);
  }
};

export default LocationsAPI;
