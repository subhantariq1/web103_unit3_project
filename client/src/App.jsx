import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import EventsPage from './pages/EventsPage'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/innovation',
      element: <LocationEvents index={1} />
    },
    {
      path: '/science',
      element: <LocationEvents index={2} />
    },
    {
      path: '/lexus',
      element: <LocationEvents index={3} />
    },
    {
      path: '/park',
      element: <LocationEvents index={4} />
    },
    {
      path: '/student',
      element: <LocationEvents index={5} />
    },
    {
      path: '/events',
      element: <EventsPage />
    }
  ])

  return (
    <div className='app'>

      <header className='main-header'>
        <h1>Baruch Club Finder</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          <Link to='/events' role='button'>Events</Link>
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App