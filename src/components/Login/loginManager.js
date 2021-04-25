import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';

export const initializeLoginFramework = () =>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig)
    }
} 

export const handleGoogleSignIn = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then( res => {

        const getUser = firebase.auth().currentUser;
            console.log(getUser)
            if(getUser != null){
                const newUserInfo = res.user
                newUserInfo.success = true;
                newUserInfo.error = "User Logged in Successfully";   
                newUserInfo.name = getUser.displayName;
                return newUserInfo;
                } 
    })
    .catch( error =>{
        console.log(error.message)
    })
}

export const createUserWithEmailAndPassword = (name, email, password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            console.log(res)
            const newUserInfo = res.user;
            newUserInfo.success = true;
            newUserInfo.error = "User created Successfully"; 
            updateName(name);                       
            return newUserInfo
            
        })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.success = false;
            newUserInfo.error = error.message;
            return newUserInfo;
        });
}

const updateName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
    displayName: name
    }).then(function() {
        console.log("Name Updated Successfully")
    }).catch(function(error) {
    // An error happened.
    });
}

export const signInWithEmailAndPassword = (email, password) =>{
   return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const getUser = firebase.auth().currentUser;
            console.log(getUser)

            if(getUser != null){
                const newUserInfo = res.user
                newUserInfo.success = true;
                newUserInfo.error = "User Logged in Successfully";   
                newUserInfo.name = getUser.displayName;
                return newUserInfo;
                }                            
            })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.success = false;
            newUserInfo.error = error.message;
            return newUserInfo;
        });
}