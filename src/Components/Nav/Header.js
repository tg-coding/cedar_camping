import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUser} from '../../redux/userReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import AuthModal from '../AuthModal/AuthModal';
import axios from 'axios';

class Header extends Component{
    constructor(){
        super()
        this.state = {
            showDropdown: false,
            showModal: false
        }
    }


    handleToggle = () => {
        this.setState({showModal: !this.state.showModal})
    }


    logout = () => {
        axios.post('/auth/logout');
        this.props.getUser({})
    }



    render(){
        console.log(this.props)
        return(
            <header>
                <img src='' id='logo' alt='logo'/>
                <nav id='desktop-nav'>
                    <Link to='/'>Home</Link>
                    <Link to='/campgrounds'>Campgrounds</Link>
                    {this.props.user.customer_id ? (
                        <div className='user-info'>
                            <img id='profile-pic' src={this.props.user.profile_pic} alt={this.props.user.username} />
                            <p id='username'>{this.props.user.username}</p>
                            <button onClick={this.logout}>Logout</button>
                        </div>
                    ) : (
                        <button onClick={this.handleToggle}>Login</button>
                    )}
                    
                    <FontAwesomeIcon
                        icon={faShoppingCart}
                        onClick={() => this.props.history.push('/cart')}
                    />
                </nav> 

                {this.state.showModal ? (
                    <AuthModal toggleFn={this.handleToggle} reRender={this.reRender}/>
                ) : (
                    null
                )}
            </header>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.userReducer)
    return {user: state.userReducer.user}
}

export default connect(mapStateToProps, {getUser})(withRouter(Header));