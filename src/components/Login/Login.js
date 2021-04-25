import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";

import { Formik, Form } from 'formik';
import TextField from './TextField';
import * as Yup from 'yup';

import firebaseConfig from '../../firebase.config';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserDetails } from '../../App';
import { signInWithEmailAndPassword, handleGoogleSignIn } from './loginManager';

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
}


const Login = () => {
    const [user, setUser] = useState({
        isSignedIn: false,
        name:'',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const [loggedInUser ,setLoggedInUser] = useContext(UserDetails);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const validate = Yup.object({
        email: Yup.string()
        .email('Email is Invalid')
        .required('Email is Required'),
        password: Yup.string()
        .min(6, 'Password must be at least six characters')
        .required('Password is Required'),
    })

    const handleResponse = (res, redirect) =>{
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);
        }
    }

    const googleSignIn = () =>{
        handleGoogleSignIn()
        .then(res => {
            setUser(res);
            setLoggedInUser(res);
            history.replace(from);
        })
    }
    return (
        <div>
            <Header></Header>
            <Formik
                initialValues={{
                    name:'',
                    email: '',
                    password: ''
                }}
                validationSchema={validate}
                onSubmit={value =>{
                    setUser(value)
                    if(value.email && value.password){
                        signInWithEmailAndPassword(value.email, value.password)
                        .then(res =>{
                            console.log(res)
                            handleResponse(res, res.success)
                        })
                    }
                }}
            >
                
            {formik =>(
                <div className="form-body">
                    <div className="form-body-style mt-5 p-4 pl-5">
                        {user.success ? <p style={{color:'green'}}>{user.error}</p> : <p style={{color:'red'}}>{user.error}</p>}
                        <h1 className="my-4 font-weight-bold-display-4">Login</h1>
                        <Form onSubmit={formik.handleSubmit} className="form-body-main mr-4">
                            <TextField name="email" type="email" placeholder="Email"></TextField>
                            <TextField name="password" type="password" placeholder="Password"></TextField>

                            <div className="forget-pass d-flex justify-content-between mt-3">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                                    <label class="form-check-label" for="exampleCheck1">Remember Me</label>
                                </div>

                                <a href="" style={{color:'orange'}}>Forget Password</a>
                            </div>
                            
                            <button type="submit"  className="btn btn-warning mt-5 w-100">Login</button>

                            <p className="text-center mt-4">Don't Have an Account?
                                <Link to="/signup"
                                    style={{color:'orange', cursor: 'pointer', fontWeight:'bold'}}> Create An Account
                                </Link>
                            </p>
                        </Form>
                    </div>
                    <div className="or mt-5">
                        <div className="lines mb-5">
                            <p>Or</p>
                        </div>
                        <button onClick={googleSignIn} className="btn btn-warning w-100 button-custom button-custom-g">Continue With Google</button>
                        <button className="btn btn-warning w-100 button-custom button-custom-fb  mt-3 disabled" disabled>Continue With Facebook</button>
                    </div>
                </div>
            )}
            </Formik>
        </div>
    );
};

export default Login;