import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

const Cart = props => {
    const [cart, setCart] = useState([])
    const [startDateInput, setStartDateInput] = useState('');
    const [durationInput, setDurationInput] = useState('');
    const [editing, setEditing] = useState(false)


    useEffect(() => {
        console.log(props)
        rerender();
    }, [props.user.customer_order_id])


    const rerender = () => {
        axios.get(`/api/cart/${props.user.customer_order_id}`)
        .then(res => setCart(res.data))
        .catch(err => console.log(err))
    }


    const remove = (id) => {
        axios.delete(`/api/cart/${id}`)
        .then(res => {
            setCart(res.data)
        })
        .catch(err => console.log(err))
    }


    const edit = () => {
        setEditing(true)
    }

    

    const submitEdit = (order_item, start_date, duration) => {
        axios.put(`/api/cart/${order_item}`, {start_date, duration})
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
                        const {campsite_primary_img_url, park_name, campground_name, campsite_name, start_date, duration, campsite_price, order_item} = cart
                        // const start_date = start_date.toLocaleDateString
                        console.log(cart)
                        console.log('start-date', startDateInput)
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
                                        <button onClick={() => submitEdit(order_item, startDateInput, durationInput)}>Submit</button>
                                    </div>
                                 ) : (
                                    <div>
                                        <h3>{start_date.slice(0,10)}</h3>
                                        <h3>{duration}</h3>
                                        <button onClick={edit}>Edit</button>
                                    </div>
                                 )}
                                <h2>{duration * campsite_price}</h2>
                                <button className='remove-btn' onClick={() => remove(order_item)}>x</button>
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


