import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';



const Campground = props => {

    const [campsites, setCampsites] = useState([]);


    // useEffect(() => {
    //     axios.get('/api/campsites').then(res => {
    //         setCampsites(res.data)
    //     }).catch(err => console.log(err))
    //     axios.get('/api/')
    // }, [])

    // const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        console.log(props.match)
        axios.get(`/api/campsites/${props.match.params.id}`)
            .then(res => {
                setCampsites(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const campgroundHero = campsites.map((campsite) => {
        const {campground_name, park_name, campground_img, campground_img_credit, campground_latitude, campground_longitude, campground_description} = campsite
        return(
            <div id='campground-preview-img' style={{backgroundImage: `url(${campground_img})`}}>
                <h5>{park_name}</h5>
                <h2>{campground_name}</h2>
                <h6>Latitude: {campground_latitude}&emsp;Longitude:{campground_longitude}</h6>
                <p>{campground_description}</p>
                <p id='campground-preview-img-credit'>Image Credit: {campground_img_credit}</p>
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

    // const{campground_img, campground_img_credit} = campsite
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


export default withRouter(Campground);