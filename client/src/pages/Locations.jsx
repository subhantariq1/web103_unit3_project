import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocationsAPI from '../../services/LocationsAPI';
import '../css/Locations.css';

const Locations = () => {
    const [locations, setLocations] = useState([]);
    const pathById = { 1:'innovation', 2:'science', 3:'lexus', 4:'park', 5:'student' };

    useEffect(() => {
        (async () => {
            try {
                const locationsData = await LocationsAPI.getAllLocations();
                setLocations(locationsData);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <div className="venues-container">
            {locations.map((location, index) => (
                <Link 
                    to={`/${pathById[location.id]}`} 
                    className="venue-card"
                    key={index}
                >
                    <img src={location.image} alt={location.name} className="venue-image" />
                    <h3 className="venue-name">{location.name}</h3>
                </Link>
            ))}
        </div>
    );
};

export default Locations;