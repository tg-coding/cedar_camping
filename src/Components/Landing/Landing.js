import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Landing = props => {

    const [campgrounds, setCampgrounds] = useState([]);

    useEffect(() => {
        axios.get('/api/campgrounds').then(res => {
            setCampgrounds
        })
      }, [])

        return(
            <div>Landing</div>
        )
}

export default Landing