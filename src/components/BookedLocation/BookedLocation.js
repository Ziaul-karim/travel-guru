import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { BookingDetails } from '../../App';
import Header from '../Header/Header';
import './BookedLocation.css'
import Hotels from './Hotels';

const BookedLocation = () => {

    const [booking] = useContext(BookingDetails);
    const {destination, from, to} = booking;
    const hotels = booking.location.hotels;
    return (
        <div>
            <Header></Header>
            <hr style={{width:"88%", margin:'auto'}}/>

            <div className="p-3 booked-body">
                <div className="row">
                    <div className="col-xl-7 col-lg-4">
                        <p className="mb-2">Stays from: <b>{from}</b> to: <b>{to}</b></p>
                        <h2>Welcome To {destination}</h2>
                        <Row>
                                {
                                    hotels.map(hotel => <Hotels
                                        key={hotel.id}
                                        hotel={hotel}></Hotels>)
                                }
                        </Row>
                    </div>
                    <div className="col-xl-5">
                        <h1>Hello right</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookedLocation;