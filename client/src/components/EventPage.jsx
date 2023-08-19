// EventPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import '../css/page.css';

const EventPage = ({ events }) => {
  const { eventLink } = useParams();
  const selectedEvent = events.find((event) => event.link === eventLink);

  
  if (!selectedEvent) {
    return (
      <Layout>
        <div>Event not found.</div>
      </Layout>
    );
  }

  const formattedDescription = selectedEvent.description.replace(/\n/g, '<br>');
  return (
    <Layout>
      <div className="pcontainer event-details">
        <div className="event-thumbnail">
          <img src={selectedEvent.thumb} alt={selectedEvent.name} />
        </div>
        <div className="event-info mt-3">
          <h2 className="event-name">{selectedEvent.name}</h2>
          </div>
        <div className="event-info">
            <p className='mt-3 mb-3'>
                <p className="event-description" dangerouslySetInnerHTML={{ __html: formattedDescription }} />
            </p>
        </div>
            <div className="event-info">
          <ul>
            <li>
              <strong>Location:</strong> {selectedEvent.location}
            </li>
            <li>
              <strong>Capacity:</strong> {selectedEvent.capacity}
            </li>
            <li>
              <strong>Host:</strong> {selectedEvent.host}
            </li>
            <li>
              <strong>Entry Fee:</strong>{' '}
              {selectedEvent.entryFee ? `${selectedEvent.entryFee} USD` : 'Free'}
            </li>
            <li>
              <strong>Date:</strong> {selectedEvent.date}
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default EventPage;
