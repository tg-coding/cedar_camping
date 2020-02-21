import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import './landing.scss';

const Landing = props => {

    const [campgrounds, setCampgrounds] = useState([]);

    useEffect(() => {
        axios.get('/api/campgrounds').then(res => {
            let list = []
            for(let i =0; i < 4; i++){
                list.push(res.data[Math.ceil(Math.random()*15)])}
            setCampgrounds(list)
        }).catch(err => console.log(err))
      }, [])
      
      console.log(campgrounds)



    // <div id='campground-preview-img' style={{backgroundImage: `url(${campground_img})`}}>
    //     <p id='campground-preview-img-credit'>Image Credit: {campground_img_credit}</p>
    // </div>

       //   const mappedCampgrounds = campgrounds.slice(0, 4).map((campground, i) => {

      const mappedCampgrounds = campgrounds.map((campground, i) => {
          const {campground_id, campground_img, park_name, campground_name} = campground
          return (
              <div key={i} className='campground-container' onClick={() => props.history.push(`/campground/${campground_id}`)}>
                  <img id='campground-preview-img' src={campground_img} alt={campground_name} />
                  <p className='preview-park-name'>{park_name}</p>
                  <h3 className='preview-campground-name'>{campground_name}</h3>
              </div>
          )
      })

   

    return(

        <div className='landing-container'>
            
            <div id='hero'>
                <h1 className='landing-hero-text'>THE OUTDOORS ARE CALLING.</h1>
                <button className='landing-hero-btn' onClick={() => props.history.push(`/campgrounds`)}>FIND THE PERFECT CAMPING DESTINATION</button>
            </div>

            <div className='featured-container'>
                <h2 className='popular-text'>Popular Campgrounds</h2>
                <div className='featured-campgrounds'>
                    {mappedCampgrounds}
                </div>
                <button className='more-campgrounds-btn' onClick={() => props.history.push(`/campgrounds`)}>Browse More Campgrounds</button>
            </div>

        </div>
    )
}

export default withRouter(Landing)