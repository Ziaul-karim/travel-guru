import React, { useContext, useState } from 'react';
import './Booking.css';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import differentLocations from '../../fakeData';
import Header from '../Header/Header';
import { BookingDetails } from '../../App';

const Booking = () => {

    const {locationID} = useParams();
    const history = useHistory();
    
    const getLocation = differentLocations.find(eachLocation => eachLocation.id === locationID);
    const  [bookingData, setBookingData] = useState({
        location: getLocation,
        origin: '',
        destination: getLocation.name,
        from: '',
        to: ''
    })

    const [booking, setBooking] = useContext(BookingDetails)

    const handleChange = e =>{
        setBookingData(previousState => ({ ...previousState, [e.target.name]: e.target.value }))
    }

    const handleSubmit = e =>{
        const existingBooking = {...bookingData}
        setBooking(existingBooking);
        history.push("/booked");
        e.preventDefault();
    }

    return (
        <div className="home text-light">
            <Header />
            <Container fluid>
                <div className="p-4">
                    <Row className="cardBody">
                        <Col xl={6} lg={6} md={12}>
                            <div  className="styleLocation mr-5">
                                <h1 className="mb-3">{getLocation.name}</h1>
                                <p>{getLocation.description}</p>
                            </div>
                        </Col>
                        <Col xl={6} lg={6} md={12}>
                            <Card className="bg-white p-3 card-body-custom">
                                <Card.Body>
                                    <Form  onSubmit={handleSubmit}>
                                        <Form className="text-dark">
                                            <Form.Group>
                                                <Form.Label className="label" htmlFor="origin">Origin</Form.Label>
                                                <Form.Control size="lg" id="origin" onChange={handleChange} type="text" required name="origin" placeholder="Origin"></Form.Control>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label className="label" htmlFor="destination">Destination</Form.Label>
                                                <Form.Control size="lg" id="destination" onChange={handleChange} type="text" name="destination" value={getLocation.name}></Form.Control>
                                            </Form.Group>
                                        </Form>

                                        <Form.Row>
                                            <Form.Group as={Col} xl={6} lg={12} md={12}>
                                                <Form.Label className="label" htmlFor="from">From</Form.Label>
                                                <Form.Control size="lg" id="from" onChange={handleChange} type="date" required name="from" placeholder="From"></Form.Control>
                                            </Form.Group>
                                            <Form.Group as={Col} xl={6} lg={12} md={12}>
                                                <Form.Label className="label" htmlFor="to">To</Form.Label>
                                                <Form.Control size="lg" id="to" onChange={handleChange} type="date" required name="to" placeholder="To"></Form.Control>
                                            </Form.Group>
                                        </Form.Row>
                                       <button type="submit" style={{background:'orange'}} className="btn btn-warning btn-block btn-lg mt-3">Start Booking</button>
                                    </Form>                                    
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>            
            </Container>
        </div>
    );
};

export default Booking;