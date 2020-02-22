import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUser} from '../../redux/userReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import AuthModal from '../AuthModal/AuthModal';
import axios from 'axios';
import logo from '../../logo/great-outdoors-logo_white.svg'
import './header.scss';

class Header extends Component{
    constructor(){
        super()
        this.state = {
            showDropdown: false,
            showModal: false
        }
    }


    dropdownToggle = () => {
        this.setState({showDropdown: !this.state.showDropdown})
    }


    modalToggle = () => {
        this.setState({showModal: !this.state.showModal})
        this.setState({showDropdown: false})

    }


    logout = () => {
        axios.post('/auth/logout');
        this.props.getUser({})
        this.setState({showDropdown: !this.state.showDropdown})
    }



    render(){
        return(
            <header>
                <img src={logo} id='logo' alt='logo' onClick={() => this.props.history.push('/')}/>

                <nav id='desktop-nav'>

                    <Link to='/' className='desktop-nav-link'>Home</Link>

                    <Link to='/campgrounds' className='desktop-nav-link'>Campgrounds</Link>

                    {this.props.user.customer_id ? (
                        <div className='desktop-user-info-container'>
                            <img id='desktop-profile-pic' src={this.props.user.profile_pic} alt={this.props.user.username} />
                            <div className='desktop-user-info'>
                                <p className='desktop-welcome'>Welcome</p>
                                <p id='desktop-username'>{this.props.user.username}</p>
                                <button onClick={this.logout} className='desktop-logout-btn'>Logout</button>
                            </div>                       
                        </div>
                    ) : (
                        <button onClick={this.modalToggle} className='desktop-login-btn'>Login</button>
                    )}
                    
                    <FontAwesomeIcon id='cart-btn' icon={faShoppingCart} onClick={() => this.props.history.push('/cart')}/>
                </nav>

                <nav id='mobile-nav'>
                        <FontAwesomeIcon id='cart-btn' icon={faShoppingCart} onClick={() => this.props.history.push('/cart')}/>
                        <button id='mobile-menu-btn' onClick={this.dropdownToggle}>&#9776;</button>


                    {this.state.showDropdown ? (

                        <div id='dropdown-container'>
                            {this.props.user.customer_id ? (
                                <div className='dropdown-links'>
                                    <p id='mobile-welcome-text'>Welcome</p>
                                    <p id='mobile-username'> {this.props.user.username}</p>
                                    <hr className='mobile-line'/>
                                    <Link to='/' className='mobile-nav-link' onClick={this.dropdownToggle}>Home</Link>
                                    <Link to='/campgrounds' className='mobile-nav-link' onClick={this.dropdownToggle}>Campgrounds</Link>
                                    <button onClick={this.logout} className='mobile-login-logout-btn'>Logout</button>
                                </div>
                            ) : (
                                <div className='dropdown-links'>
                                    <Link to='/' className='mobile-nav-link' onClick={this.dropdownToggle}>Home</Link>
                                    <Link to='/campgrounds' className='mobile-nav-link' onClick={this.dropdownToggle}>Campgrounds</Link>
                                    <button onClick={this.modalToggle} className='mobile-login-logout-btn'>Login</button>
                                </div>
                            )}
                            
                        </div>

                    ) : (
                        null
                    )}
                </nav> 

                {this.state.showModal ? (
                    <AuthModal toggleFn={this.modalToggle} reRender={this.reRender}/>
                ) : (
                    null
                )}
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {user: state.userReducer.user}
}

export default connect(mapStateToProps, {getUser})(withRouter(Header));