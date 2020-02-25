import React from 'react';


const carouselTEST = props => {
    const images = _.compact([{ src: 'img1', legend: 'leg1' }, yourCondition && { src: 'img2', legend: 'leg2 }, { src: 'img3'legend: 'leg3' }]);
    const slides = _.map(images, slide => <div><img src={slide.src} /><p>{slide.legend}</p></div>);
    
    const slides = 

    const slides = campsite.map((campsite, i) => {
        const {
          campsite_primary_img_url,
          campsite_primary_img_credit,
          campsite_img_url,
          campsite_img_credit,
          campsite_img_url_2,
          campsite_img_credit_2,
          campsite_img_url_3,
          campsite_img_credit_3
        } = campsite;

    return (

        <Carousel>
            {slides}
        </Carousel>
    )
    };

export default carouselTEST;