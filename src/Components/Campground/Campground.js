import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import axios from 'axios';
import googleMap from '../../googleMap';




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
        height: '300px',
      };
    
    const campgroundHero = campsites.slice(0,1).map((campsite, i) => {
        const {campground_name, park_name, campground_img, campground_img_credit, campground_latitude, campground_longitude, campground_description} = campsite
        return(
            <div key={i} >
                <div id='campground-preview-img' style={{backgroundImage: `url(${campground_img})`}}>
                    <h5>{park_name}</h5>
                    <h2>{campground_name}</h2>
                    <h6>Latitude: {campground_latitude}&emsp;Longitude:{campground_longitude}</h6>
                    <p>{campground_description}</p>
                    <p id='campground-preview-img-credit'>Image Credit: {campground_img_credit}</p>
                </div>
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



    const mappedCampsites = campsites.map((campsite, i) => {
        const {campsite_id, campsite_primary_img_url, campsite_name, campsite_type, campsite_price} = campsite
        return (
            <div key={i} className='campground-container' onClick={() => props.history.push(`/campsite/${campsite_id}`)}>
                <img id='campground-preview-img' src={campsite_primary_img_url} alt={campsite_name} />
                <h3>{campsite_name}</h3>
                <p id='campsite-type'>{campsite_type}</p>
                <p id='campsite-price'>{campsite_price}</p>
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

        </div>
    )
}


export default GoogleApiWrapper({
    apiKey: googleMap.key
}) (withRouter(Campground));