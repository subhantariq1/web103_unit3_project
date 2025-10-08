// server/controllers/locations.js
import { pool } from '../config/database.js'

export async function getLocations(req, res) {
  try {
    const results = await pool.query('SELECT * FROM locations ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function getLocationsById(req, res) {
  try {
    const selectQuery = `SELECT * FROM locations WHERE id = $1`
    const results = await pool.query(selectQuery, [req.params.locationId])
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
