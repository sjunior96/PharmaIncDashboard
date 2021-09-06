import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './routes';
import history from './history';
import { PatientsProvider } from './Context/PatientsContext';

const App = () => {
    return (
        <PatientsProvider>
            <Router history={history}>
                <Routes />
            </Router>
        </PatientsProvider>
    );
};

export default App;