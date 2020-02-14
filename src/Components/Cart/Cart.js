import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

const Cart = props => {
    const [cart, setCart] = useState([])

    useEffect(() => {
        axios.get(`/api/cart/${props.user.customer_order_id}`)
        .then(res => setCart(res.data))
        .catch(err => console.log(err))
    }, [props.user.customer_order_id])

    console.log(cart)

    const delete =

    // const mappedCart = cart.map((campsite, i) => {
    //     console.log(campsite)
    //     return(
    //         <div key={i}></div>
    //     )
    // })

    return(
        <div>

            {props.user.customer_order_id ? (
                <div>
                    <h2>My Cart</h2>
                    <hr/>
                    <div className='cart-header-row'>
                        <p className='cart-header-row-item'>Campsite</p>
                        <p className='cart-header-row-item'>Description</p>
                        <p className='cart-header-row-item'>Start Date</p>
                        <p className='cart-header-row-item'>Days</p>
                        <p className='cart-header-row-item'>Total</p>
                    </div>
                    {cart && cart.map((cart, campsite_id) => {
                        const {campsite_primary_img_url, park_name, campground_name, campsite_name, start_date, duration, campsite_price} = cart
                        // const start_date = start_date.toLocaleDateString
                        console.log(cart)
                        return(
                            <div key={campsite_id} className='cart-container'>
                                <img src={campsite_primary_img_url} alt={campsite_name} />
                                <div className='cart-campsite-description'>
                                    <h3>{park_name}</h3>
                                    <h2>{campground_name}</h2>
                                    <p>{campsite_name}</p>
                                </div>
                                <h3>
                                    {start_date.slice(0,10)}
                                </h3>
                                <h3>{duration}</h3>
                                <h2>{duration * campsite_price}</h2>
                                <button className='remove-btn'>x</button>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div>
                    <h2>Your cart is empty...</h2>
                    <h5>Login or add a campsite to your cart.</h5>
                    <button onClick={() => props.history.push('/campgrounds')}>View Campgrounds</button>
                </div>
            )}
            
        </div>
    )

}

function mapStateToProps(state) {
    return {user: state.userReducer.user}
}

export default connect(mapStateToProps)(withRouter(Cart));


