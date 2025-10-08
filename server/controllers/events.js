import { pool } from '../config/database.js';

const getEvents = async (_req, res) => {
  try {
    const selectQuery = `
      SELECT id, title, image, date, time, remaining,
             location_id AS "locationID"
      FROM events
      ORDER BY id ASC
    `;
    const results = await pool.query(selectQuery);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEventsById = async (req, res) => {
  try {
    const selectQuery = `
      SELECT id, title, image, date, time, remaining,
             location_id AS "locationID"
      FROM events
      WHERE id = $1
    `;
    const results = await pool.query(selectQuery, [req.params.eventId]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getEvents, getEventsById };
