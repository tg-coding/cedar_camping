import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

const Landing = props => {

    const [campgrounds, setCampgrounds] = useState([]);

    useEffect(() => {
        axios.get('/api/campgrounds').then(res => {
            console.log(res)
            let list = []
            for(let i =0; i < 2; i++){
                list.push(res.data[Math.ceil(Math.random()*1)])
            }console.log(list)
            setCampgrounds(list)
        }).catch(err => console.log(err))
      }, [])
      
      console.log(campgrounds)



    // <div id='campground-preview-img' style={{backgroundImage: `url(${campground_img})`}}>
    //     <p id='campground-preview-img-credit'>Image Credit: {campground_img_credit}</p>
    // </div>

       //   const mappedCampgrounds = campgrounds.slice(0, 4).map((campground, i) => {

      const mappedCampgrounds = campgrounds.map((campground, i) => {
          const {campground_id, campground_img, campground_img_credit, park_name, campground_name} = campground
          return (
              <div key={i} className='campground-container' onClick={() => props.history.push(`/campground/${campground_id}`)}>
                  <img id='campground-preview-img' src={campground_img} alt={campground_name} />
                  <p>{park_name}</p>
                  <h3>{campground_name}</h3>
              </div>
          )
      })

   

    return(
        


        <div className='landing-container'>
            

            <div id='hero'>
                <h1>Ready to go camping?</h1>
                <button>Find the perfect place</button>
            </div>

            <div className='featured-container'>
                <h2>Popular Locations</h2>
                <div className='featured-campgrounds'>
                    {mappedCampgrounds}
                </div>
                <Link to='/campgrounds' className='desktop-nav-link'>Browse More Campgrounds</Link>
            </div>

        </div>
    )
}

export default withRouter(Landing)