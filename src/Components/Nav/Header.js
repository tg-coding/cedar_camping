import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUser} from '../../redux/userReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
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

    render(){
        return(
            <header>
                <img src='logo' id='logo' alt='logo'/>
                <nav id='desktop-nav'>
                    <Link to='/'>Home</Link>
                    <Link to='/campgrounds'>Campgrounds</Link>
                    <img id='profile-pic' src={this.props.user.profile_pic || null} alt={this.props.user.username} />
                    <p id='username'>{this.props.user.username}</p>
                    <FontAwesomeIcon
                        icon={faShoppingCart}
                        onClick={() => this.props.history.push('/cart')}
                    />
                </nav>
            </header>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.reducer)
    // return {user: state.reducer.user}
}

export default connect(mapStateToProps, {getUser})(withRouter(Header));