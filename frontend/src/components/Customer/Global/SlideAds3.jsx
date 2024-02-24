import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import banner from '../../../assets/ads/banner2.png'
import banner1 from '../../../assets/ads/banner4.png'
const items = [
    <img src={banner1} className="item" alt="1" />,
    <img src={banner} className="item" alt="1" />,
    <img src={banner1} className="item" alt="1" />,
    <img src={banner} className="item" alt="1" />,
];

export const SlideAds3 = () => (
    <AliceCarousel
        autoPlay
        autoPlayStrategy="none"
        autoPlayInterval={3000}
        animationDuration={1000}
        infinite
        touchTracking={false}
        disableDotsControls
        disableButtonsControls
        items={items}
    />
);