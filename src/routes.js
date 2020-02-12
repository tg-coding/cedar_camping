import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Campsites from './Components/Campsites/Campsites';
import Campsite from './Components/Campsite/Campsite';
import Cart from './Components/Cart/Cart';

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/campsites' component={Campsites}/>
        <Route path='/campsite/:id' component={Campsite}/>
        <Route path='/cart' component={Cart}/>
    </Switch>
)