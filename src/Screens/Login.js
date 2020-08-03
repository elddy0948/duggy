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

// firebase auth 를 이용한 login

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
  }

  handler = e => {
    if(firebase.auth().currentUser){
      alert("로그인 세션 유지중 -> 자동 로그아웃");
      firebase.auth().signOut();
    }
    else {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      
      signInWithFirebase(email, password)
      .then(()=>{
        this.props.history.push("/");
      })
      .catch(error => {
        alert(error);
        return;
      });

    }
    // document.getElementById('quickstart-sign-in').disabled = true;
  }

  handler_google = e => {
    signInWithGoogle()
    .then(()=>{
      this.props.history.push("/");
    })
    .catch(error => {
      // 배포할 때 수정
      alert(error);
      return;
    });
  }

  render(){
    return (
      <body id = "login_body">
        <div class="container">
          <div class="row"/>
          <div class="row">

          <h4 id = "signinTitle">Sign In</h4>
              <div class="row">
                <div class="col s3" />
                <div class="input-field col s6">
                  <input 
                    placeholder="example@google.com" 
                    id="email" 
                    type="email"
                    class="validate"
                    />
                </div>
                <div class="col s3" />
              </div>
              
              <div class="row">
                <div class="col s3" />
                <div class="input-field col s6">
                  <input 
                    placeholder="Password" 
                    id="password"
                    type="password" 
                    class="validate"
                    />
                </div>
                <div class="col s3" />
              </div>
              
              <div class="row">
                <div class="col s4" />
                <div class="col s4">
                  <button
                    class="waves-effect waves-light btn-large col s12"
                    onClick = {this.handler} > Sign In </button>
                </div>
                <div class="col s4" />
              </div>

            <div class="row">
                <div class="col s4"/>
                <div class="col s4">
                <button id = "googleLoingBtn"
                    class="waves-effect waves-light btn-large col s12"
                    onClick = {this.handler_google} > sign In Google </button>
                </div>
                <div class="col s4"/>
              </div>
          </div>
        </div>
      </body>
    );
  }
}

export default Login;
