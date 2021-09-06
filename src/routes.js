import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Patients from './Pages/Patients/Patients';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/patients" component={Patients} />
            <Route exact path="/patients/:id/:seed/:page" component={Patients} />

            {/* <Redirect to="/patients" /> */}
        </Switch>
    );
};

export default Routes;