import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Campgrounds from './Components/Campgrounds/Campgrounds';
import Campground from './Components/Campground/Campground';
import Campsite from './Components/Campsite/Campsite';
import Cart from './Components/Cart/Cart';

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/campgrounds' component={Campgrounds}/>
        <Route path='/campground/:id' component={Campground}/>
        <Route path='/campsite/:id' component={Campsite}/>
        <Route path='/cart' component={Cart}/>
    </Switch>
)