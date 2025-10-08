// src/pages/EventsPage.jsx
import React, { useEffect, useState } from 'react'
import Event from '../components/Event'
import EventsAPI from '../../services/EventsAPI'
import LocationsAPI from '../../services/LocationsAPI'
import '../css/LocationEvents.css' // reuse layout styles; optional to make a dedicated EventsPage.css

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [locationsById, setLocationsById] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        // Fetch everything in parallel
        const [allEvents, allLocations] = await Promise.all([
          EventsAPI.getAllEvents(),
          LocationsAPI.getAllLocations(),
        ])

        if (!alive) return

        // Sort by remaining (soonest first)
        const sorted = [...allEvents].sort(
          (a, b) => new Date(a.remaining) - new Date(b.remaining)
        )

        // Make a quick lookup map for locations
        const map = Object.fromEntries(
          allLocations.map(l => [String(l.id), l])
        )

        setEvents(sorted)
        setLocationsById(map)
      } catch (e) {
        if (!alive) return
        console.error(e)
        setError(e.message || 'Failed to load events')
      } finally {
        if (alive) setLoading(false)
      }
    })()

    return () => { alive = false }
  }, [])

  return (
    <div className="location-events">
      <header>
        <div className="location-info">
          <h2>All Events</h2>
          {!loading && !error && (
            <p style={{ opacity: .7 }}>{events.length} total</p>
          )}
        </div>
      </header>

      <main>
        {loading && <p>Loading events…</p>}
        {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}

        {!loading && !error && events.length === 0 && (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake" /> No events yet!
          </h2>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="events-grid" style={{ display:'grid', gap:16 }}>
            {events.map(evt => {
              const loc = locationsById[String(evt.locationID)]
              return (
                <div key={evt.id}>
                  <Event
                    id={evt.id}
                    title={evt.title}
                    date={evt.date}
                    time={evt.time}
                    image={evt.image}
                    remaining={evt.remaining}
                  />
                  <div style={{ marginTop: 6, fontSize: 12, opacity: .75 }}>
                    {loc ? `@ ${loc.name}` : 'Location: Unknown'}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

export default EventsPage
