'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GuestList = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    axios.get('/api/guests')
      .then(response => setGuests(response.data.data))
      .catch(error => console.error('Error fetching guests:', error));
  }, []);

  return (
    <div>
      <h1>Guest List</h1>
      <ul>
        {guests.map((guest: any) => (
          <li key={guest._id}>
            {guest.name} - {guest.attending ? 'Attending' : 'Not Attending'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;
