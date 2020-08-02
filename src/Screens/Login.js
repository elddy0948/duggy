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
    this.state = {
      checking : false
    };
  }

  handler = e => {
    this.setState({checking:false});
    var check_login;
    console.log("currentUser 호출전 check_login 값 : "+check_login);
    check_login = function(){
      return firebase.auth().currentUser; 
    }
    console.log("currentUser 호출후 check_login 값 : "+check_login);
    if (check_login === true) {
      alert("이미 로그인되있음");
      firebase.auth().signOut();
    }
    else {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      alert("login...\n"+email+'\n'+password);
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }

      firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        this.setState({checking:true});
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
    // document.getElementById('quickstart-sign-in').disabled = true;
  }

  hander_google = e => {
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
                    onClick = {this.hander_google} > sign In Google </button>
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
