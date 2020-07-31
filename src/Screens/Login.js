import React from "react";
import ReactDom from "react-dom";

import "../sass/materialize.scss";
import "../App.css";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import {signInWithGoogle} from '../firebase';

// firebase auth 를 이용한 login

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
  }

  signin(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          // alert(errorMessage);
          alert("Do not Sign In. Check your email/password");
        }
        // document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
  }

  handler = e => {
    if (firebase.auth().currentUser) {
      alert("이미 로그인되있음");
      firebase.auth().signOut();
    } 
    else {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      // alert("login...\n"+email+'\n'+password);
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      alert("실행전");
      const result = this.signin(email, password);      
      alert(result[0]);
    }
    // document.getElementById('quickstart-sign-in').disabled = true;
  }

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     requestID : '',
  //     requestPW : ''
  //   };
  // }

  // handlerID = e => {
  //   this.setState({requestID : e.target.value});
  // };
  // handlerPW = e => {
  //   this.setState({requestPW : e.target.value});
  // };
  // handler = e => {
  //   const login_info = {
  //     method : "POST",
  //     body : JSON.stringify(this.state),
  //     headers : {"Content-Type":"application/json"}
  //   };
  //   fetch("http://localhost:3000/login", login_info)
  //   .then(res => {return res.json();})
  //   .then(json => {
  //     this.setState({requestID : json.requestID, requestPW : json.requestPW});
  //   });
  //   console.log(this.state.requestID, this.state.requestPW);
  //   alert("로그인 되었습니다.\nID : "+this.state.requestID+"\nPW : "+this.state.requestPW);
  //   this.props.history.push('/');
  // }

  render(){
    return (
      <body id = "login_body">
        <div class="container">
          <div class="row"/>
          <div class="row">
          <form onSubmit = {this.handler}>
              <h4 id = "signinTitle">Sign In</h4>
              <div class="row">
                <div class="col s3" />
                <div class="input-field col s6">
                  <input 
                    placeholder="example@google.com" 
                    id="email" 
                    type="email"
                    class="validate"
                    // value = {this.state.requestID}
                    // onChange = {this.handlerID}
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
                    // value = {this.state.requestPW}
                    // onChange = {this.handlerPW}
                    />
                </div>
                <div class="col s3" />
              </div>
              
              <div class="row">
                <div class="col s4" />
                <div class="col s4">
                  <button
                    class="waves-effect waves-light btn-large col s12"
                    type = "submit"
                    > Sign In </button>
                </div>
                <div class="col s4" />
              </div>

            </form>
            <div class="row">
                <div class="col s4"/>
                <div class="col s4">
                <button id = "googleLoingBtn"
                    class="waves-effect waves-light btn-large col s12"
                    onClick = {signInWithGoogle} isGoogleSignIn> sign In Google </button>
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
