import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import accountController from '../server/controller'

import { Login } from './login'
import { Register } from './register'


function Account({ history, match }) {
    const { path } = match;

    useEffect(() => {
        // redirect to home if already logged in
        if (accountController.userValue) {
            history.push('/');
        }
    }, []);

    return (
        <>
            <Switch>
                <Route path={`${path}/login`} component={Login} />
                <Route path={`${path}/register`} component={Register} />
            </Switch>
        </>
    );
}

export { Account };