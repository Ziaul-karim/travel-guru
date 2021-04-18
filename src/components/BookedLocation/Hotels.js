import React from 'react';

const Hotels = (props) => {
    const {title, image, type, type1, type2} = props.hotel
    return (
        <div>
            <div className="hotel-body mt-4 mb-3 ml-3">
                <div className="hotel-img">
                    <img src={image} alt=""/>
                </div>
                <div className="hotel-details ml-5">
                    <h4>{title}</h4>
                    <div className="mt-3 text-muted">
                        <p className="mb-1">{type}</p>
                        <p className="mb-1">{type1}</p>
                        <p>{type2}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hotels;