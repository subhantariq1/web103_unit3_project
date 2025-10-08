import './dotenv.js';
import { pool } from './database.js';
import { locationsData } from '../data/locations.js';
import { eventsData } from '../data/events.js';

async function createTables() {
  // run DDL in a transaction; drop in FK-safe order
  const ddl = `
    BEGIN;

    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE locations (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      image TEXT NOT NULL,
      address TEXT,
      city TEXT,
      state VARCHAR(2),
      zip VARCHAR(10)
    );

    CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      image TEXT NOT NULL,
      date VARCHAR(255) NOT NULL,
      time VARCHAR(255) NOT NULL,
      remaining TIMESTAMPTZ NOT NULL,
      location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE
    );

    COMMIT;
  `;
  try {
    await pool.query(ddl);
    console.log('✅ tables created');
  } catch (e) {
    await pool.query('ROLLBACK').catch(() => {});
    throw e;
  }
}

async function seedLocations() {
  const insert = `
    INSERT INTO locations (id, name, image, address, city, state, zip)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    ON CONFLICT (id) DO NOTHING;
  `;
  await Promise.all(
    locationsData.map((loc) =>
      pool.query(insert, [
        loc.id,
        loc.name,
        loc.image,
        loc.address,
        loc.city,
        loc.state,
        loc.zip,
      ])
    )
  );
  console.log('✅ locations seeded');
}

async function seedEvents() {
  const insert = `
    INSERT INTO events (title, image, date, time, remaining, location_id)
    VALUES ($1,$2,$3,$4,$5,$6);
  `;
  await Promise.all(
    eventsData.map((e) =>
      pool.query(insert, [
        e.title,
        e.image,
        e.date,
        e.time,
        e.remaining,
        e.locationID, // maps to location_id
      ])
    )
  );
  console.log('✅ events seeded');
}

(async () => {
  try {
    await createTables();
    await seedLocations();
    await seedEvents();
    console.log('🎉 reset complete');
  } catch (err) {
    console.error('❌ reset failed', err);
  } finally {
    await pool.end();
  }
})();
