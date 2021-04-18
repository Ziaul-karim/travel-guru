import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserDetails } from '../../App';

const PrivateRoute = ({children, ...rest}) => {

    const [loggedInUser] = useContext(UserDetails);

    return (
        <Route
        {...rest}
        render={({ location }) =>
            loggedInUser.email ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: "/login",
                state: { from: location }
                }}
            />
            )
        }
        />
    );
};

export default PrivateRoute;