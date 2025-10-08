// src/components/Event.jsx
import React, { useEffect, useState } from 'react';
import EventsAPI from '../../services/EventsAPI';
import { dates } from '../utils/dates';
import '../css/Event.css';

const Event = (props) => {
  const [event, setEvent] = useState(null);
  const [time, setTime] = useState('');
  const [remaining, setRemaining] = useState('');

  // use data from props if provided
  useEffect(() => {
    const has = props?.title || props?.date || props?.time || props?.image || props?.remaining;
    if (has) {
      setEvent({
        id: props.id,
        title: props.title,
        image: props.image,
        date: props.date,
        time: props.time,
        remaining: props.remaining,
      });
    }
  }, [props.id, props.title, props.image, props.date, props.time, props.remaining]);

  // only fetch if we don't have details but we do have a valid id
  useEffect(() => {
    if (event || props?.id == null || props?.id === '') return;
    let alive = true;
    (async () => {
      try {
        const data = await EventsAPI.getEventById(props.id);
        if (!alive) return;
        setEvent(data);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => { alive = false; };
  }, [props.id, event]);

  useEffect(() => {
    if (!event?.time) return;
    (async () => setTime(await dates.formatTime(event.time)))();
  }, [event?.time]);

  useEffect(() => {
    if (!event?.remaining) return;
    (async () => {
      const t = await dates.formatRemainingTime(event.remaining);
      setRemaining(t);
      dates.formatNegativeTimeRemaining(t, event.id);
    })();
  }, [event?.remaining, event?.id]);

  return (
    <article className="event-information">
      <img src={event?.image} alt={event?.title || 'Event'} />
      <div className="event-information-overlay">
        <div className="text">
          <h3>{event?.title || 'Loading…'}</h3>
          <p>
            <i className="fa-regular fa-calendar fa-bounce"></i>{' '}
            {event?.date} <br /> {time}
          </p>
          <p id={`remaining-${event?.id}`}>{remaining}</p>
        </div>
      </div>
    </article>
  );
};

export default Event;
