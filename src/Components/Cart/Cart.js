import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/userReducer';
import {setCart} from '../../redux/cartReducer';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import CartItems from './CartItems';
import StripeCheckout from 'react-stripe-checkout';
import stripe from '../../stripeKey';
import './cart.scss';

const Cart = props => {
    // const [cart, setCart] = useState([])
    
    // const [editing, setEditing] = useState(false)


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

    // const submitEdit = (order_item_id, start_date, duration) => {
    //     axios.put(`/api/cart/${order_item_id}`, {start_date, duration})
    //     .then(() => {
    //         props.rerender()
    //     })
    //     .then(() => {
    //         setEditing(false)
    //     })
    //     .catch(err => console.log(err))
    // }

    // const remove = (id) => {
    //     axios.delete(`/api/cart/${id}`)
    //     .then(res => {
    //         setCart(res.data)
    //     })
    //     .then(() => {
    //         rerender()
    //     })
    //     .catch(err => console.log(err))
    // }


    

    
    
    


    const cartTotal = props.cart.reduce((total, current) => {
        return total + (current.campsite_price * current.duration)
    }, 0 )


    return(
        <div className='cart-container'>

            {props.user.customer_order_id ? (

                <div>
                    {props.cart.length ? (
                        <div>
                        <h2 className='my-cart'>My Cart</h2>
                        <hr className='cart-divider-lines'/>
                        {props.cart && props.cart.map((cart, campsite_id) => {
                            const {campsite_primary_img_url, park_name, campground_name, campsite_name, campsite_type, start_date, duration, campsite_price, order_item_id} = cart
                            const total = duration * +campsite_price
                            const formattedDate = (new Date(start_date)).toString();

                            return (
                                <CartItems 
                                    key={cart.id}
                                    cartInfo={cart}
                                    rerender={rerender}
                                    setCart={setCart}
                                    // submitEdit={submitEdit}
                                    // remove={remove}
                                />
                            )
                                   
                            
                        })}
                        
                        <div className='subtotal-container'>
                            <p className='subtotal-text'>Subtotal</p>
                            <p className='subtotal-total'>${cartTotal.toFixed(2)}</p>
                        </div>
                        <div className='stripe-btn-container'>
                            <StripeCheckout
                                token={onToken}
                                stripeKey={ stripe.pub_key }
                                amount={(100 * cartTotal.toFixed(2))}
                                className='stripe-checkout-btn'
                            />
                        </div>
                        
                                    <hr className='cart-divider-lines' id='bottom-cart-divider-line'/>

                    </div>
                    ):(
                        <div className='empty-cart-container'>
                            <h2 className='empty-cart-header-text'>Your cart is empty...</h2>
                            <h5 className='empty-cart-sub-head-text'>Please add a campsite to your cart.</h5>
                            <button className='view-campgrounds-btn' onClick={() => props.history.push('/campgrounds')}>View Campgrounds</button>
                        </div>
                    )}
                
                </div>
            ) : (
                <div className='empty-cart-container'>
                    <h2 className='empty-cart-header-text'>You're not logged in...</h2>
                    <h5 className='empty-cart-sub-head-text'>Please login to view your cart.</h5>
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


