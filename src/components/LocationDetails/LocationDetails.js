import React from 'react';
import { Card } from 'react-bootstrap';
import './LocationDetails.css'

const LocationDetails = (props) => {
    // console.log(props)
    const {name, image} = props.location;
    const{isActive} = props;
    return (
        <Card className={`bg-transparent text-white ${isActive ? 'active' : 'not-active'}`}>
            <Card.Img variant="top" className="img-fluid" src={image} alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Title   className='align-bottom'>{name}</Card.Title>                
                </Card.ImgOverlay>
        </Card>
    );
};

export default LocationDetails;