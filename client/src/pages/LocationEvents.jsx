// src/pages/LocationEvents.jsx
import React, { useEffect, useState } from 'react';
import Event from '../components/Event';
import LocationsAPI from '../../services/LocationsAPI';
import EventsAPI from '../../services/EventsAPI';
import '../css/LocationEvents.css';

const LocationEvents = ({ index }) => {
  // index is your location id (1..4)
  const locationId = index;

  const [location, setLocation] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setError(null);
        setLoading(true);

        // fetch location + its events in parallel
        const [loc, evts] = await Promise.all([
          LocationsAPI.getLocationById(locationId),
          EventsAPI.getEventsByLocationId(locationId),
        ]);

        if (!alive) return;
        setLocation(loc);
        setEvents(evts);
      } catch (e) {
        if (!alive) return;
        console.error(e);
        setError(e.message || 'Failed to load');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [locationId]);

  return (
    <div className="location-events">
      <header>
        <div className="location-image">
          {location?.image ? (
            <img src={location.image} alt={location.name} />
          ) : (
            <div style={{height: 180, background: '#eee'}} />
          )}
        </div>

        <div className="location-info">
          <h2>{location?.name || 'Loading…'}</h2>
          <p>
            {location
              ? `${location.address}, ${location.city}, ${location.state} ${location.zip}`
              : ''}
          </p>
        </div>
      </header>

      <main>
        {loading && <p>Loading events…</p>}
        {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}

        {!loading && !error && events.length === 0 && (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i>{' '}
            No events scheduled at this location yet!
          </h2>
        )}

        {!loading && !error && events.length > 0 && (
          <>
            {/* quick debug line you can remove later */}
            <p style={{opacity:.6, fontSize:12}}>
              Loaded {events.length} event(s) for locationId {locationId}:{' '}
              {events.map(e => e.id).join(', ')}
            </p>

            {events.map(evt => (
              <Event
                key={evt.id}
                id={evt.id}
                title={evt.title}
                date={evt.date}
                time={evt.time}
                image={evt.image}
                remaining={evt.remaining}
              />
            ))}
          </>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;
