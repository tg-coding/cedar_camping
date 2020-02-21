import React from 'react';
import './footer.scss';
import logo from '../../logo/great-outdoors-logo_white.svg';

function Footer (){

        return(
            <footer>
                <img id='footer-logo' src={logo} alt='Logo' />
                <p id='data-source'>Data Source: Recreation.gov</p>
            </footer>
        )
}

export default Footer