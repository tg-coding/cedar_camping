
import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

const Campgrounds = props => {

    const [campgrounds, setCampgrounds] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    // const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        axios.get(`/api/campgrounds/${campgrounds.campground_id}?search=${searchInput}`)
            .then(res => {
                setCampgrounds(res.data)
            })
            .catch(err => console.log(err))
    }, [searchInput, campgrounds.campground_id])



    console.log(campgrounds)


    const mappedCampgrounds = campgrounds.map((campground, i) => {
        const {campground_id, campground_img, park_name, campground_name} = campground
        console.log(campground_id)
        return (
            <div key={i} className='campground-container' onClick={() => props.history.push(`/campground/${campground_id}`)}>
                <img id='campground-preview-img' src={campground_img} alt={campground_name} />
                <p>{park_name}</p>
                <h3>{campground_name}</h3>
            </div>
        )
    })


    return(
        <div className='campgrounds-container'>
            
            <div className='campgrounds-landing-hero'>
                <h2>Tagline</h2>
                <input 
                    className='search-input'
                    value={searchInput}
                    placeholder='search'
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            <div className='campgrounds-listing'>{mappedCampgrounds}</div>
        </div>
    )
    
}


export default withRouter(Campgrounds);