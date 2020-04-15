import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivaRouter from '../src/resource/PrivateRouter';
import Home from '../src/components/Home';
import Register from '../src/components/Register';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;
