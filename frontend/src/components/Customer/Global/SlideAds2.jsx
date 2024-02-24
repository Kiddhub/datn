import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import banner from '../../../assets/ads/banner3.png'
import banner1 from '../../../assets/ads/banner5.png'
const items = [
    <img src={banner1} className="item h-1/2" alt="1" />,
    <img src={banner} className="item h-1/2" alt="1" />,
    <img src={banner1} className="item h-1/2" alt="1" />,
    <img src={banner} className="item h-1/2" alt="1" />,
];

export const SlideAds2 = () => (
    <AliceCarousel
        autoPlay
        autoPlayStrategy="none"
        autoPlayInterval={2000}
        animationDuration={1000}
        infinite
        touchTracking={false}
        disableDotsControls
        disableButtonsControls
        items={items}
    />
);