import './App.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login/Login';
import Booking from './components/Booking/Booking';
import { createContext, useState } from 'react';
import BookedLocation from './components/BookedLocation/BookedLocation';
import SignUp from './components/Login/SignUp';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const BookingDetails = createContext();
export const UserDetails = createContext();


function App() {
  const [booking, setBooking] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});
  console.log(loggedInUser)
  return (
    <BookingDetails.Provider value={[booking, setBooking]}>
      <UserDetails.Provider value={[loggedInUser, setLoggedInUser]}> 
        <Router>
          <Switch>
            <Route exact path = "/">
              <Home></Home>
            </Route>
            <Route path = "/home">
              <Home></Home>
            </Route>
            <Route path = "/login">
              <Login></Login>
            </Route>
            <Route path = "/signup">
              <SignUp></SignUp>
            </Route>
            <PrivateRoute path="/booked">
              <BookedLocation></BookedLocation>
            </PrivateRoute>
            <Route path="/location/:locationID">
              <Booking />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </UserDetails.Provider>
    </BookingDetails.Provider>
  );
}

export default App;
