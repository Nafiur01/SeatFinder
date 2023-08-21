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

import { Link } from 'react-router-dom';

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

  

  
  // console.log(selectedEvent);
  // const [eTags, seteTags] = useState([]);
  // const eTags = selectedEvent.tags

//  console.log(eTags);

const [registeredUsers, setRegisteredUsers] = useState([]);

  
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

  useEffect(() => {
    if (selectedEvent) {
    // Fetch event attendances when the component mounts
    axios.get(`http://192.168.0.106:8000/api/events/${selectedEvent.id}/attendances/`)
    .then(response => {
      setRegisteredUsers(response.data);
    })
    .catch(error => {
      // Handle error
    });
  }
}, [selectedEvent]);

const [animatedCount, setAnimatedCount] = useState(0);
  const targetCount = registeredUsers.length;

  useEffect(() => {
    if (animatedCount < targetCount) {
      // Update the animated count every 100 milliseconds until it reaches the target count
      const interval = setInterval(() => {
        setAnimatedCount((prevCount) => prevCount + 1);
      }, 100);

      // Clear the interval when the animated count reaches the target count
      return () => clearInterval(interval);
    }
  }, [animatedCount, targetCount]);


  
  if (!selectedEvent) {
    return (
      <Layout>
        <div>Event not found.</div>
      </Layout>
    );
  }
  
  const percentageRegistered = (registeredUsers.length / selectedEvent.capacity) * 100;
  const circleBar = {
    background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),
    conic-gradient(#6da23a ${percentageRegistered}%, #c8e7aa 0)`,
 // Adjust the border radius based on the percentage
  };
  
  
  
  // console.log("registeredUsers:", registeredUsers);

  let eTags = selectedEvent.tags
  // let eventTags = [];
  // {eTags.length > 0 ? (
  //   eventTags = eTags.split(',')
  // ) : (
  //   eventTags = []
  // ) 
  // }
  const availableSeats = selectedEvent.capacity - registeredUsers.length;
  const registeredPercentage = (registeredUsers.length / selectedEvent.capacity) * 100;
  console.log(registeredPercentage)

// Calculate the dash offset to control the border length
const dashOffset = (100 - registeredPercentage) * 314 / 100;

// Determine the border color based on the percentage
let borderColor = "";
if (registeredPercentage <= 50) {
  borderColor = "green";
} else if (registeredPercentage <= 75) {
  borderColor = "yellow";
} else {
  borderColor = "red";
}

// Apply the calculated border color and dash offset to the circle
const circleStyle = {
  border: `8px solid transparent`,
  borderBottom: `8px solid ${borderColor}`,
  borderLeft: `8px solid ${borderColor}`,
  transform: `rotate(${90 - (360 * dashOffset) / 628}deg)`,
};
  

const circleBorderStyle = {
  borderWidth: `${registeredPercentage}%`,
  // borderColor: registeredPercentage === 100 ? 'green' : 'yellow',
};

const formatRegisteredUsers = (count) => {
  if (count < 1) {
    return <><span className="progress-text nb">Nobody</span><span className="progress-text sm">Registered</span></>;
  } else if (count > 999 && count <= 999999) {
    return <><Link to={`/${selectedEvent.link}/registered`}><span className="progress-text">${Math.floor(count / 1000)}K</span></Link><span className="progress-text sm">Registered</span></>;
  } else if (count > 999999) {
    return <><Link to={`/${selectedEvent.link}/registered`}><span className="progress-text">${Math.floor(count / 1000000)}M</span></Link><span className="progress-text sm">Registered</span></>;
  } else {
    return <><Link to={`/${selectedEvent.link}/registered`}><span className="progress-text"><u>{count}</u></span></Link><span className="progress-text sm">Registered</span></>;
  }
};

const formattedCount = formatRegisteredUsers(registeredUsers.length);


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

          {eTags && eTags.length > 0 ? (
            <div className="event-info scrollable mt-2 mb-3">
              <span className="badge eTagsTitle bg-purple sm rounded-corner mr-2">
                Event Tags:
              </span>
              {eTags.split(",").map((tag, index) => (
                <span
                  className="badge eTags sm rounded-corner mr-2"
                  key={index}
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <></>
          )}

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
            <span>
              at most{" "}
              <spanText className="sm bg-indigo bold rounded">
                {selectedEvent.capacity}
              </spanText>{" "}
              can attend
            </span>
          </div>
          <div className="mt-4 mb-5">
          <div className="container">
  <div className="row gx-3 justify-content-center">

    <div className="col-lg-4 col-md-12">

    </div>

    <div className="col-lg-4 col-md-6">

    </div>

    <div className="col-lg-4 col-md-6">

    </div>

  </div>
</div>
            <div className="inblock">
            <div className="progress-bar" style={circleBar}>
            <div className="progress-bar-inner">
              {registeredPercentage === 100.0 ? (
                <b className="progress-text hf">Housefull</b>
              ) : (
                <>{formattedCount}</>
              )}
            </div>
          </div>

          <div className="progress-bar" style={circleBar}>
            <div className="progress-bar-inner">
              {registeredPercentage === 100.0 ? (
                <b className="progress-text hf">Housefull</b>
              ) : (
                <>{formattedCount}</>
              )}
            </div>
          </div>
          </div>
            
          </div>
          <div className="mt-4 mb-1">
            <spanText className="s17 bg-purple p8 rounded-corner">
              More About This Event
            </spanText>
          </div>
          <div className="event-info">
            <p className="mt-3 mb-3">
              <p
                className="event-description mb-0"
                dangerouslySetInnerHTML={{ __html: formattedDescription }}
              />
            </p>
          </div>

          <div className="mt-5 mb-4">
            <spanText className="s17 bg-purple p8 rounded-corner">
              Event Image Gallery
            </spanText>
          </div>
          {eventImages.length > 0 ? (
            <Carousel
              className="text-center"
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
            <div className="alert alert-info py-4 text-center">
              This event has no Related Images
            </div>
          )}

          <div className="event-info">
            <spanText className="s17 bg-purple p8 rounded-corner">
              Key People
            </spanText>
          </div>
          <div className="event-info">
            {eventSpeakers.length > 0 ? (
              <div className="speaker-list">
                {eventSpeakers.map((speaker) => {
                  const speakerName = truncateText(speaker.name, 10);
                  return (
                    <div className="speaker-gap" key={speaker.id}>
                      <div className="speaker-item">
                        <img
                          src={`http://192.168.0.106:8000${speaker.dp}`}
                          className="speaker-dp"
                          alt={speakerName}
                        />
                      </div>
                      <div className="speaker-item text-center speaker-name">
                        <span className="text-center">{speakerName}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No speakers found.</p>
            )}
          </div>

          {/* <div>
  <h2>Registered Users:</h2>
  <ul>
    {registeredUsers.map(attendance => (
      <li key={attendance.id}>
        {attendance.user_details && attendance.user_details.username
          ? attendance.user_details.username
          : "Unknown User"}
      </li>
    ))}
  </ul>
</div> */}

          
        </div>
      </div>
    </Layout>
  );
  
  

};




export default EventPage;
