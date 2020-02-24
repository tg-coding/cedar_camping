import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CartItems = props => {
    const [startDateInput, setStartDateInput] = useState('');
    const [durationInput, setDurationInput] = useState('');
    const [editing, setEditing] = useState(false)

    const edit = () => {
        setEditing(!editing)
    }


    const submitEdit = (order_item_id, start_date, duration) => {
        axios.put(`/api/cart/${order_item_id}`, {start_date, duration})
        .then(() => {
            props.rerender()
        })
        .then(() => {
            setEditing(false)
        })
        .catch(err => console.log(err))
    }

    const remove = (id) => {
        axios.delete(`/api/cart/${id}`)
        .then(res => {
            props.setCart(res.data)
        })
        .then(() => {
            props.rerender()
        })
        .catch(err => console.log(err))
    }
    
    

console.log(props.cartInfo)

    const {campsite_primary_img_url, park_name, campground_name, campsite_name, campsite_type, start_date, duration, campsite_price, order_item_id} = props.cartInfo;
    const total = duration * +campsite_price;
    const formattedDate = (new Date(start_date)).toString();

    return(
        // <div>Cart Item</div>
        <div className='my-cart-container'>
            <img className='cart-campsite-img' src={campsite_primary_img_url} alt={campsite_name} />
            <div className='cart-campsite-description'>
                <h3 className='cart-park-name'>{park_name}</h3>
                <h2 className='cart-cg-name'>{campground_name}</h2>
                <p className='cart-cs-name'>Site: {campsite_name}</p>
                <p className='cart-cs-type'>Type: {campsite_type}</p>
            </div>
             {editing ? (
                <div>
                    <div className='cart-start-date-container'>
                        Start Date<br/>
                        <input
                            name='start-date-input'
                            className='cart-date-input'
                            value={startDateInput}
                            placeholder={start_date.slice(0,10)}
                            type='date'
                            onChange={(e) => setStartDateInput(e.target.value)}
                        />
                    </div>
                    <div className='cart-duration-container'>
                        Days<br/>
                        <input
                            className='cart-duration-input'
                            value={durationInput}
                            placeholder='#'
                            type='number'
                            min='1'
                            step="1"
                            onChange={(e) => setDurationInput(e.target.value)}
                        />
                    </div>
                    <button className='cart-submit-btn' onClick={() => submitEdit(order_item_id, startDateInput, durationInput)}>Submit</button>
                    <button className='cart-cancel-btn' onClick={edit}>Cancel</button>

                </div>
                

             ) : (
                <div>
                    <div className='cart-start-date-container'>
                        Start Date<br/>
                        {/* <h3 id='cart-start-date'>{start_date.slice(0,10)}</h3> */}
                        <h3 id='cart-start-date'>{formattedDate.slice(4,15)}</h3>
                    </div>
                    <div className='cart-duration-container'>
                        Days<br/>
                        <h3 id='cart-duration'>{duration}</h3>
                    </div>
                    <button className='cart-edit-btn' onClick={edit}>Edit</button>
                    <div className='cart-total-container'>
                        Total<br/>
                        <h5 className='cart-total'>${total.toFixed(2)}</h5>
                    </div>
                </div>
             )}
            
            <button className='cart-remove-btn' onClick={() => remove(order_item_id)}>x</button>
            <hr className='cart-divider-lines' id='bottom-cart-divider-line'/>
        </div>
    )
}

export default CartItems;