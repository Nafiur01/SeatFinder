// EventPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import '../css/page.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';

const EventPage = ({ events }) => {

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };
  const { eventLink } = useParams();
  const selectedEvent = events.find((event) => event.link === eventLink);
  const [eventData, setEventData] = useState(null);
  const [eventSpeakers, setEventSpeakers] = useState([]);
  const [eventImages, setEventImages] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === eventImages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? eventImages.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = eventImages.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.id}
      >
        <img className='event-image' src={`http://192.168.0.106:8000${item.image}`} />
        
      </CarouselItem>
    );
  });


  useEffect(() => {
    if (selectedEvent) {
      // Fetch event speakers using selectedEvent.id
      axios.get(`http://192.168.0.106:8000/api/events/${selectedEvent.id}/speakers/`).then((response) => {
        setEventSpeakers(response.data);
      });
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (selectedEvent) {
      // Fetch event speakers using selectedEvent.id
      axios.get(`http://192.168.0.106:8000/api/events/${selectedEvent.id}/images/`).then((response) => {
        setEventImages(response.data);
      });
    }
  }, [selectedEvent]);


  
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
      <div className="pcontainer">
        <div className="event-details">
        <div className="event-thumbnail">
          <img src={selectedEvent.thumb} alt={selectedEvent.name} />
        </div>
        <div className="event-info mt-3">
          <span className="text-yellow">{selectedEvent.name}</span>
          </div>
          <div className="event-info">
            <i className="bi bi-geo-alt"></i>
            <span>{selectedEvent.location}</span>
          </div>
          <div className="event-info">
            <i className="bi bi-calendar"></i>
            <span>{selectedEvent.date}</span>
          </div>
          <div className="event-info">
            <i className="bi bi-people"></i>
            <span>at most <spanText className='sm bg-indigo bold rounded'>{selectedEvent.capacity}</spanText> can attend</span>
          </div>
          <div className='mt-5 mb-1'>
          <spanText className='s17 bg-purple p8'>More About This Event</spanText>
          </div>
        <div className="event-info">
            <p className='mt-3 mb-3'>
                <p className="event-description mb-0" dangerouslySetInnerHTML={{ __html: formattedDescription }} />
            </p>
        </div>

        <div className='mt-5 mb-4'>
          <spanText className='s17 bg-purple p8'>Event Image Gallery</spanText>
          </div>
        {eventImages.length > 0 ? (
        <Carousel className='text-center'
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      
    >
      <CarouselIndicators
        items={eventImages}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
    ) : (
    <div className='alert alert-info py-4 text-center'>This event has no Related Images</div>
  )}
            
          <div className="event-info">
          <spanText className='s17 bg-purple p8'>Key People</spanText>
          
            </div>
            <div className="event-info">
            {eventSpeakers.length > 0 ? (
  <div className="speaker-list">
    {eventSpeakers.map((speaker) => {
      const speakerName = truncateText(speaker.name, 10);
      return (
        <div className="speaker-gap" key={speaker.id}>
          <div className="speaker-item">
            <img src={`http://192.168.0.106:8000${speaker.dp}`} className='speaker-dp' alt={speakerName} />
          </div>
          <div className="speaker-item">
            <span className="speaker-name">{speakerName}</span>
          </div>
        </div>
      );
    })}
  </div>
) : (
  <p>No speakers found.</p>
)}
</div>
        </div>
        </div>
    </Layout>
  );
};

export default EventPage;
