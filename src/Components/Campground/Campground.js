import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import axios from 'axios';
import googleMap from '../../googleMap';
import './campground.scss';




const Campground = props => {

    const [campsites, setCampsites] = useState([]);


    useEffect(() => {
        axios.get(`/api/campsites/${props.match.params.id}`)
            .then(res => {
                setCampsites(res.data)
            })
            .catch(err => console.log(err))
    }, [props.match])

    
  const mapStyles = {
    width: '100%',
    maxWidth: '1100px',
    height: '300px',
  };
    
    const campgroundHero = campsites.slice(0,1).map((campsite, i) => {
        const {campground_name, park_name, campground_img, campground_img_credit, campground_latitude, campground_longitude, campground_description} = campsite
        return(
            <div key={i} >
                <div id='campground-background-container' style={{backgroundImage: `url(${campground_img})`}}>
                    <div className='campground-background-overlay'>
                        <h5 id='campground-hero-park-name'>{park_name}</h5>
                        <h2 id='campground-hero-name'>{campground_name}</h2>
                        <h6 id='campground-hero-coordinates'>Latitude: {campground_latitude}&emsp;Longitude:{campground_longitude}</h6>
                        <p id='campground-hero-desc'>{campground_description}</p>
                        <p id='campground-hero-img-credit'>Image Credit: {campground_img_credit}</p>
                        <div className='blur'></div>
                    </div>
                </div>
            </div>
        )
    })

    const campgroundMap = campsites.slice(0,1).map((campsite, i) => {
        const {campground_latitude, campground_longitude} = campsite
        return(
            <div key={i} >
                <div className='google-map-container'>
                    <Map
                        google={props.google}
                        zoom={8}
                        style={mapStyles}
                        initialCenter={{lat: campground_latitude, lng: campground_longitude}} >
                            <Marker position={{lat: campground_latitude, lng: campground_longitude}} />
                    </Map>
                </div>
            </div>
        )
    })


console.log(campsites)
    const mappedCampsites = campsites.map((campsite, i) => {
        const {campsite_id, campsite_primary_img_url, park_name, campground_name, campsite_name, campsite_type, campsite_price} = campsite
        const campsitePrice = Math.round(campsite_price)
        return (
            <div key={i} className='campsite-container' onClick={() => props.history.push(`/campsite/${campsite_id}`)}>
                <img id='campsite-preview-img' src={campsite_primary_img_url} alt={campsite_name} />
                <div className='campsite-preview-info'>
                    <p id='campsite-prev-park-name'>{park_name}</p>
                    <p id='campsite-prev-cg-name'>{campground_name}</p>
                    <h3 id='campsite-prev-cs-name'>SITE: {campsite_name}</h3>
                    <p id='campsite-prev-type'>Type: {campsite_type}</p>
                    <p id='campsite-prev-price'>${campsitePrice}</p>
                </div>
            </div>
        )
    })

    return(
        <div className='campgrounds-container'>
            
            <div className='campground-landing-hero'>
                {campgroundHero}
            </div>

            <div className='mapped-campsites-container'>
                {mappedCampsites}
            </div>

            <div className='mapped-campground-map-container'>
                {campgroundMap}
            </div>

        </div>
    )
}


export default GoogleApiWrapper({
    apiKey: googleMap.key
}) (withRouter(Campground));



// const campgroundHero = campsites.slice(0,1).map((campsite, i) => {
//     const {campground_name, park_name, campground_img, campground_img_credit, campground_latitude, campground_longitude, campground_description} = campsite
//     return(
//         <div key={i} >
//             <div id='campground-background-container' style={{backgroundImage: `url(${campground_img})`}}>
//                 <p className='campground-hero-park-name'>{park_name}</p>
//                 <h2 className='campground-hero-name'>{campground_name}</h2>
//                 <p className='campground-hero-coordinates'>Latitude: {campground_latitude}&emsp;Longitude:{campground_longitude}</p>
//                 <p className='campground-hero-desc'>{campground_description}</p>
//                 <p id='campground-hero-img-credit'>Image Credit: {campground_img_credit}</p>
//             </div>
//             <div className='google-map-container'>
//                 <Map
//                     google={props.google}
//                     zoom={8}
//                     style={mapStyles}
//                     initialCenter={{lat: campground_latitude, lng: campground_longitude}} >
//                         <Marker position={{lat: campground_latitude, lng: campground_longitude}} />
//                 </Map>
//             </div>
//         </div>
//     )
// })