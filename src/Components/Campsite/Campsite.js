import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Carousel} from 'react-responsive-carousel';
import axios from 'axios';
import './carousel.css';

const Campsite = props => {

    const [campsite, setCampsite] = useState([]);
    const [startDateInput, setStartDateInput] = useState('');
    const [durationInput, setDurationInput] = useState('');

    useEffect(() => {
        axios.get(`/api/campsite/${props.match.params.id}`)
            .then(res => {
                setCampsite(res.data)
            })
            .catch(err => console.log(err))
    }, [props.match.params.id])


    const addToCart = (campsite_id, startDateInput, durationInput, campsite_price) => {
        if(props.user.email){
            axios.post('/api/cart', {
                customer_order_id: props.user.customer_order_id,
                campsite_id,
                start_date: startDateInput,
                duration: durationInput,
                campsite_price
            }).then(res => {
                window.alert('Campsite added to cart')
            }).catch(err=>console.log(err));
        } else {
            window.alert('Please login or create an account')
        }
    }

    const mappedCampsite = campsite.map((campsite, i) => {
        const {
            campsite_id,
            campsite_name,
            campground_name,
            park_name,
            campsite_primary_img_url,
            campsite_type,
            campsite_price,
            campsite_latitude,
            campsite_longitude,
            water,
            toilets,
            showers,
            campfire_allowed,
            grill,
            parking,
            site_length,
            site_width,
            water_hookups,
            sewer_hookups,
            electric_hookups,
            campsite_img_url,
            campsite_img_credit,
            campsite_img_url_2,
            campsite_img_credit_2,
            campsite_img_url_3,
            campsite_img_credit_3
        } = campsite

        let styles = {
            margin: 'auto',
            width: '500px'
        };

        return(
            <div key={i} className='campsite-container'>
                <div className='campsite-primary-info-container'>
                    <div className='carousel-container' style ={styles}>
                        <Carousel>
                            <div>
                                <img src={campsite_primary_img_url} alt={campsite_name} />
                                {/* <p className='legend'>{null}</p> */}
                            </div>
                            {campsite_img_url ? (
                                <div>
                                    <img src={campsite_img_url} alt={campsite_name}/>
                                    <p className='legend'>{campsite_img_credit}</p>
                                </div>
                            ) : (
                                null
                            )}
                            {campsite_img_url_2 ? (
                                <div>
                                    <img src={campsite_img_url_2} alt={campsite_name}/>
                                    <p className='legend'>{campsite_img_credit_2}</p>
                                </div>
                            ) : (
                                null
                            )}
                            {campsite_img_url_3 ? (
                                <div>
                                    <img src={campsite_img_url_3} alt={campsite_name}/>
                                    <p className='legend'>{campsite_img_credit_3}</p>
                                </div>
                            ) : (
                                null
                            )}
                        </Carousel>
                        <div className='campsite-primary-info'>
                            <h5>{park_name}</h5>
                            <h2>{campground_name}</h2>
                            <div className='campsite-name-type-container'>
                                <h3># {campsite_name}</h3>
                                <h3>Type: {campsite_type}</h3>
                            </div>
                            <p className='campsite-price'>{campsite_price}</p>
                            <div className='campsite-inputs'>
                                <div className='input-container'>
                                    <p className='input-labels'>Start Date</p>
                                    <input
                                        className='date-input'
                                        value={startDateInput}
                                        placeholder='YYYY-MM-DD'
                                        type='date'
                                        onChange={(e) => setStartDateInput(e.target.value)}
                                    />
                                </div>
                                <div className='input-container'>
                                    <p className='input-labels'>Days:</p>
                                    <input
                                        className='duration-input'
                                        value={durationInput}
                                        type='number'
                                        onChange={(e) => setDurationInput(e.target.value)}
                                    />
                                </div>
                                <button onClick={() => addToCart(campsite_id, startDateInput, durationInput, campsite_price)}>Add to Cart</button>
                            </div>
                            <div className='attributes-container'>
                                <div className='attributes-row'>
                                    <div className='coordinate-attribute'>Latitude:<br/>{campsite_latitude}</div>
                                    <div className='coordinate-attribute'>Longitude:<br/>{campsite_longitude}</div>
                                </div>
                                <div className='attributes-row'>
                                    <div className='attribute'>Water:<br/>{water}</div>
                                    <div className='attribute'>Toilets:<br/>{toilets}</div>
                                    <div className='attribute'>Showers:<br/>{showers}</div>
                                    <div className='attribute'>Campfire Allowed:<br/>{campfire_allowed}</div>
                                    <div className='attribute'>Site Width:<br/>{site_width}</div>
                                    <div className='attribute'>Site Length:<br/>{site_length}</div>
                                </div>
                                <div className='attributes-row'>
                                    <div className='attribute'>Grill:<br/>{grill}</div>
                                    <div className='attribute'>Parking:<br/>{parking}</div>
                                    <div className='attribute'>Water Hookups:<br/>{water_hookups}</div>
                                    <div className='attribute'>Sewer Hookups:<br/>{sewer_hookups}</div>
                                    <div className='attribute'>Electric Hookups:<br/>{electric_hookups}</div>

                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return(
        <div>{mappedCampsite}</div>
    )
}

function mapStateToProps(state) {
    return {user: state.userReducer.user}
}

export default connect(mapStateToProps)(withRouter(Campsite));