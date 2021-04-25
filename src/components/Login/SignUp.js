import React, { useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import TextField from './TextField';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { initializeLoginFramework, createUserWithEmailAndPassword } from './loginManager';
import { UserDetails } from '../../App';

const SignUp = () => {
    const [user, setUser] = useState({
        isSignedIn: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        success: false
    })

    initializeLoginFramework()

    const [loggedInUser, setLoggedInUser] = useContext(UserDetails);

    const handleResponse = (res) =>{
        setUser(res);
    }
    
    
    

    const validate = Yup.object({
        firstName: Yup.string()
        .required('First Name is Required'),
        lastName: Yup.string()
        .required('Last Name is Required'),
        email: Yup.string()
        .email('Email is Invalid')
        .required('Email is Required'),
        password: Yup.string()
        .min(6, 'Password must be at least six characters')
        .required('Password is Required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Confirm password is Required'),
    })

    
    return (
        <div>
            <Header></Header>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={validate}
                onSubmit={value =>{
                    setUser(value)
                    if(value.email && value.password){
                        createUserWithEmailAndPassword(value.firstName, value.email, value.password)
                        .then(res => {
                            handleResponse(res)
                        })
                    }
                }}
            >
                
                {formik =>(
                    <div className="form-body">
                        <div className="form-body-style mt-5 p-4 pl-5">
                            {user.success ? <p style={{color:'green'}}>{user.error}</p> : <p style={{color:'red'}}>{user.error}</p>}
                            <h1 className="my-4 font-weight-bold-display-4">Create an Account</h1>
                            <Form onSubmit={formik.handleSubmit} className="form-body-main mr-4">
                                <TextField name="firstName" type="text" placeholder="First Name"></TextField>
                                <TextField name="lastName" type="text" placeholder="Last Name"></TextField>
                                <TextField name="email" type="email" placeholder="Email"></TextField>
                                <TextField name="password" type="password" placeholder="Password"></TextField>
                                <TextField name="confirmPassword" type="password" placeholder="Confirm Password"></TextField>
                                {/* {
                                newUser ? <button type="submit"  className="btn btn-warning mt-5 w-100">Create an Account</button> 
                                        : <button type="submit" className="btn btn-warning mt-5 w-100">Login</button>
                                } */}
                                
                                <button type="submit"  className="btn btn-warning mt-5 w-100">Create an Account</button>

                                {/* <p className="text-center mt-4">{newUser ? "Already Have an Account?" : "Don't have Account?" } 
                                    <span 
                                        onClick={()=> setNewUser(!newUser)} 
                                        style={{color:'orange', cursor: 'pointer', fontWeight:'bold'}}>{newUser ? " Login" : " Sign Up"}
                                    </span>
                                </p> */}

                                <p className="text-center mt-4">"Already have an Account?" 
                                    <Link to="/login" 
                                        style={{color:'orange', cursor: 'pointer', fontWeight:'bold'}}> Login
                                    </Link>
                                </p>
                            </Form>
                        </div>
                        <div className="or mt-5">
                            <div className="lines mb-5">
                                <p>Or</p>
                            </div>
                            <button className="btn btn-warning w-100 button-custom button-custom-fb">Continue With Facebook</button>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default SignUp;