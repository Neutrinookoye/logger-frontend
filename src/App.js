import React, { useState, useEffect } from 'react';

import {Route, Switch, Redirect, useLocation} from 'react-router-dom';
import accountController from './server/controller'
import {PrivateRoute} from './components/private-route'


import Navbar from './components/navbar'
import Home from './pages/home'
import Profile from './pages/profile'
import Activities from './pages/activities'
import InboxPage from './pages/inbox'

import {Account} from './account'

function App(){
    const { pathname } = useLocation(); 
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountController.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    return(
        <div className={'app-container ' + (user)}>
            <Navbar />
            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute path="/inbox" component={InboxPage} />
                <PrivateRoute path="/activities" component={Activities} />
                <PrivateRoute path="/profile" component={Profile} />
                <Route path="/account" component={Account} />
                <Redirect from="*" to="/" />
            </Switch>
        </div>
    )
}

export default App