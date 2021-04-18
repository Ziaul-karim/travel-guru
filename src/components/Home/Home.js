import React, { useEffect, useState } from 'react';
import './Home.css'
import Header from '../Header/Header';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import differentLocations from '../../fakeData';
import LocationDetails from '../LocationDetails/LocationDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Link } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const Home = () => {
    
    const arrowRight = <FontAwesomeIcon icon={faArrowRight} />
    const getLocation = differentLocations;
    const [locations] = useState(getLocation);
    const [indexNumber, setIndexNumber] = useState(0);
    const [locationDetails, setLocationDetails] = useState({});
    useEffect(()=>{
      const getSwipedLocation = locations.find((swipedLc, index) => index === indexNumber);
    setLocationDetails(getSwipedLocation);
    },[indexNumber])
   

    return (
        <div className="home">            
          <Header></Header>
          <div className="p-4" style={{marginTop:'100px'}}>
            <div className="row m-0 mt-5 main-row">
              <div className="col-xl-5 col-lg-4 col-md-12  text-white d-flex flex-column main-col-one">
                  <div  className="styleLocation">
                    <h1 className="mb-3">{locationDetails.name}</h1>
                    <p className="mb-5">{locationDetails.description?.slice(0, 120)}...</p>
                    <Link style={{ textDecoration: 'none', color:'black'}} to={"/location/"+locationDetails.id} className="btn-main">Booking<span>{' '}{arrowRight}</span></Link>
                  </div>
              </div>
              <div className="col-xl-7 col-lg-8 main-col-two">
                  <Swiper
                    spaceBetween={25}
                    slidesPerView={3}
                    autoplay={{                          
                    delay: 3000,
                    disableOnInteraction: false
                    }}
                    navigation= {{
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    }}
                    loop={true}
                    onSlideChange={(swiper) => setIndexNumber(swiper.realIndex)}
                    breakpoints={{
                      // when window width is >= 640px
                      1400: {
                        slidesPerView: 3,
                      },
                      // when window width is >= 768px
                      500: {
                        slidesPerView: 2,
                      },
                      0: {
                        slidesPerView: 1,
                      },
                    }}
                  >
                    {
                      locations.map(location => {
                        return(<SwiperSlide key = {location.id}>
                          {({ isActive }) => (
                          <LocationDetails                           
                            location={location}
                            isActive = {isActive}
                          ></LocationDetails>)}
                        </SwiperSlide>)})
                    }
                  </Swiper>   
                  <div className="swiper-button-prev"></div>
                  <div className="swiper-button-next"></div>               
              </div>
            </div>
          </div>

        </div>
    );
};

export default Home;