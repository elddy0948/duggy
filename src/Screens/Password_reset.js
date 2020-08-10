import React from "react";
import ReactDom from "react-dom";

import "../sass/materialize.scss";
import "../App.css";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import {signInWithGoogle} from '../firebase';
import {signInWithFirebase} from '../firebase';
import {auth} from '../firebase';

class Password_reset extends React.Component{
    constructor(props){
        super(props);
    }

    btn = () => {
        var email = document.getElementById('email').value;

        if(email.length < 4){
            alert('Please enter a email address.');
            return;
        }
        auth.sendPasswordResetEmail(email)
        .then(()=>{
            alert('check your email');
            window.location.href = "/";
        })
        .catch(error => {
            if(error.code === "auth/user-not-found") alert('Email is not registered.');
            window.location.reload();
        })
    }

    render(){
        return(
            <body id = "password_reset_body">
                <div class="container">
                    <div class="row"/>
                    <div class="row" id = "password_reset_form">
                        <h4 id = "password_resetTitle">Reset password</h4>
                        
                        <div class="row">
                            <div class="col s3"/>
                            <div class="input-field col s6">
                                <label for = "email">Enter your Email</label>
                                <input
                                    id = "email"
                                    type = "email"
                                    class = "validate"/>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col s4"/>
                            <div class="col s4">
                                <button
                                class="waves-effect waves-light btn-large col s12"
                                onClick={this.btn}>Send password reset email</button>
                            </div>
                        </div>

                    </div>
                </div>
            </body>
        )
    }
}

export default Password_reset;