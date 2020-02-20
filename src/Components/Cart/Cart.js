import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/userReducer';
import {setCart} from '../../redux/cartReducer';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import stripe from '../../stripeKey';

const Cart = props => {
    // const [cart, setCart] = useState([])
    const [startDateInput, setStartDateInput] = useState('');
    const [durationInput, setDurationInput] = useState('');
    const [editing, setEditing] = useState(false)


    useEffect(() => {
        rerender();
    }, [props.user.customer_order_id])


    const rerender = () => {
        axios.get(`/api/cart/${props.user.customer_order_id}`)
        .then(res => props.setCart(res.data))
        .catch(err => console.log(err))
    }

    const onToken = (token) => {
        token.card = void 0;
        axios.post('/api/payment', { 
            token, 
            amount: cartTotal.toFixed(2), 
            customer_order_id: props.user.customer_order_id, 
            customer_id: props.user.customer_id } )
        .then(res => {
            props.getUser(res.data)
            alert('Payment Successful');
            console.log(res.data)
        })
      }

    const remove = (id) => {
        axios.delete(`/api/cart/${id}`)
        .then(res => {
            setCart(res.data)
        })
        .then(() => {
            rerender()
        })
        .catch(err => console.log(err))
    }


    const edit = () => {
        setEditing(!editing)
    }

    
    const submitEdit = (order_item_id, start_date, duration) => {
        axios.put(`/api/cart/${order_item_id}`, {start_date, duration})
        .then(() => {
            rerender()
        })
        .then(() => {
            setEditing(false)
        })
        // .then(res=> {
        //     setCart(res.data)
        // })
        .catch(err => console.log(err))
    }
    


    const cartTotal = props.cart.reduce((total, current) => {
        return total + (current.campsite_price * current.duration)
    }, 0 )


    return(
        <div>

            {props.user.customer_order_id ? (

                <div>
                    {props.cart.length ? (
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
                        {props.cart && props.cart.map((cart, campsite_id) => {
                            const {campsite_primary_img_url, park_name, campground_name, campsite_name, start_date, duration, campsite_price, order_item_id} = cart
                            const total = duration * +campsite_price
                            
                            console.log(cart)
                            return(
                                <div key={campsite_id} className='cart-container'>
                                    <img src={campsite_primary_img_url} alt={campsite_name} />
                                    <div className='cart-campsite-description'>
                                        <h3>{park_name}</h3>
                                        <h2>{campground_name}</h2>
                                        <p>{campsite_name}</p>
                                    </div>
                                     {editing ? (
                                        <div>
                                            <input
                                            name='start-date-input'
                                            className='date-input'
                                            value={startDateInput}
                                            placeholder={start_date.slice(0,10)}
                                            type='date'
                                            onChange={(e) => setStartDateInput(e.target.value)}
                                        />
                                            <input
                                                className='duration-input'
                                                value={durationInput}
                                                placeholder={duration}
                                                type='number'
                                                onChange={(e) => setDurationInput(e.target.value)}
                                            />
                                            <button onClick={() => submitEdit(order_item_id, startDateInput, durationInput)}>Submit</button>
                                            <button onClick={edit}>Cancel</button>
    
                                        </div>
                                        
                        
                                     ) : (
                                        <div>
                                            <h3>{start_date.slice(0,10)}</h3>
                                            <h3>{duration}</h3>
                                            <button onClick={edit}>Edit</button>
                                        </div>
                                     )}
                                    <h2>${total.toFixed(2)}</h2>
                                    <button className='remove-btn' onClick={() => remove(order_item_id)}>x</button>
                                </div>
                            )
                        })}
                        <hr/>
                        <div className='subtotal-container'>
                            <p className='subtotal-text'>Subtotal</p>
                            <h2 className='subtotal-total'>
                            {cartTotal.toFixed(2)}
                            </h2>
                        </div>
    
                        <StripeCheckout
                            token={onToken}
                            stripeKey={ stripe.pub_key }
                            amount={(100 * cartTotal.toFixed(2))}
                        />
                        
                    </div>
                    ):(
                        <div>
                            <h2>Your cart is empty...</h2>
                            <h5>Please add a campsite to your cart.</h5>
                            <button onClick={() => props.history.push('/campgrounds')}>View Campgrounds</button>
                        </div>
                    )}
                
                </div>
            ) : (
                <div>
                    
                        
                        <div>
                            <h2>You're not logged in...</h2>
                            <h5>Please login to view your cart.</h5>
                        </div>

                </div>
             )} 
        </div>
    )
}

function mapStateToProps(state) {
    return {user: state.userReducer.user,
            cart: state.cartReducer.cart}
}

export default connect(mapStateToProps, {getUser, setCart})(withRouter(Cart));


