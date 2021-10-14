import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {useSelector } from 'react-redux';
import Layout from './hocs/Layout';
import { Users, Tasks, Timesheet ,Login } from './containers';



const App = () => {

    /*************************** Redux hook ****************************/
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
   
    return (

        <>
            <Router>
                <Layout>
                    <Switch>
                        {!isAuthenticated ?
                            <Route exact path='/' component={Login} /> : <Route exact path='/' component={Users} />}
                        <Route exact path='/users' component={Users} />
                        <Route exact path='/tasks' component={Tasks} />
                        <Route exact path='/timesheet' component={Timesheet} />
                        <Route exact path='/login' component={Login} />
                    </Switch>
                </Layout>
            </Router>
        </>
    )
};

export default App;

































{/* <Route exact path='/signup' component={Signup} />
                    <Route exact path='/facebook' component={Facebook} />
                    <Route exact path='/google' component={Google} />
                    <Route exact path='/reset-password' component={ResetPassword} />
                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                    <Route exact path='/activate/:uid/:token' component={Activate} /> */}