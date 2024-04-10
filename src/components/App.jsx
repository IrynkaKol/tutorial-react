/*import React from 'react';
import {connect} from 'react-redux'
import {setTitle}  from '../store';

export const App = (props) => {
  const handleButton = () => {
    props.setTitle();
  }
  return (
    <div>
      <h1>{props.title}</h1>
      <button onClick={handleButton}>Button</button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    title: state.title,
  }
}

export default connect(mapStateToProps, {setTitle})(App)
*/
import React, { useState } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';


export const App = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [participants, setParticipants] = useState([]);

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      name: eventName,
      date: eventDate,
      location: eventLocation,
      participants: [],
    };
    setEvents([...events, newEvent]);
    setEventName('');
    setEventDate('');
    setEventLocation('');
  };

  const handleParticipantSubmit = (e, eventId) => {
    e.preventDefault();
    const participantName = e.target.elements.participantName.value;
    const participantContact = e.target.elements.participantContact.value;
    const newParticipant = { name: participantName, contact: participantContact };
    const updatedEvents = [...events];
    updatedEvents[eventId].participants.push(newParticipant);
    setEvents(updatedEvents);
    e.target.reset();
  };

  const handleDeleteParticipant = (eventId, participantIndex) => {
    const updatedEvents = [...events];
    updatedEvents[eventId].participants.splice(participantIndex, 1);
    setEvents(updatedEvents);
  };

  return (
    <Container>
      <h1>Event Management App</h1>

      <h2>Create Event</h2>
      <Form onSubmit={handleEventSubmit}>
        <Form.Group controlId="eventName">
          <Form.Label>Event Name</Form.Label>
          <Form.Control type="text" placeholder="Enter event name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="eventDate">
          <Form.Label>Event Date</Form.Label>
          <Form.Control type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="eventLocation">
          <Form.Label>Event Location</Form.Label>
          <Form.Control type="text" placeholder="Enter event location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">Create Event</Button>
      </Form>

      <h2>Events</h2>
      <ListGroup>
        {events.map((event, eventId) => (
          <ListGroup.Item key={eventId}>
            <h3>{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <Form onSubmit={(e) => handleParticipantSubmit(e, eventId)}>
              <Form.Group controlId="participantName">
                <Form.Control type="text" placeholder="Enter your name" required />
              </Form.Group>
              <Form.Group controlId="participantContact">
                <Form.Control type="text" placeholder="Enter your contact information" required />
              </Form.Group>
              <Button variant="primary" type="submit">Register</Button>
            </Form>
            <h4>Participants:</h4>
            <ListGroup>
              {event.participants.map((participant, participantIndex) => (
                <ListGroup.Item key={participantIndex}>
                  <p>Name: {participant.name}</p>
                  <p>Contact: {participant.contact}</p>
                  <Button variant="danger" onClick={() => handleDeleteParticipant(eventId, participantIndex)}>Delete</Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}


