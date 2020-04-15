import React from 'react';
import firebase from './firebase';
import { Redirect, Route } from 'react-router-dom';

let autenticado = ''

firebase.userInitialized().then(result =>{
    autenticado = true
})
.catch(err =>{
    autenticado = false
});

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (<Route {...rest} render={props => (
        autenticado ? (<Component {...props} />) : (<Redirect to={{ pathname: "/auth", state: { from: props.location } }} />)
    )} />)
};
