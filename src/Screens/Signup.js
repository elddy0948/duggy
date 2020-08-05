import React from "react";
import ReactDom, { render } from "react-dom";

import "../sass/materialize.scss";
import '../App.css';
import '../firebase';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import {signInWithFirebase} from '../firebase';
import {signUpWithFirebase} from '../firebase';
import {auth} from '../firebase';

class Signup extends React.Component{

  constructor(props){
    super(props);
    this.state = {}
  }

  handler = e => {
    var userNAME = document.getElementById('userNAME').value;
    var userID = document.getElementById('userID').value;
    var userPW = document.getElementById('userPW').value;
    

    if(userNAME.length < 4){
      alert('Please enter userNAME(nickName) address.');
      return;
    }
    if (userID.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (userPW.length < 4) {
      alert('Please enter a password.');
      return;
    }

    // Sign in with email and pass.
    // [START createwithemail]

    signUpWithFirebase(userID, userPW)
    .then(() => {
      
      // 유저의 displayName 을 업데이트

      var userInfo = auth.currentUser;
      userInfo.updateProfile({
        displayName : userNAME
      }).then(()=>{
        auth.signOut()
        .then(()=>{
          alert("Thank you Create your account.\nPlease SignIn!");
          this.props.history.push("/");
        })
        .catch(error => {
          alert("signOut error : ", error);
        })
      }).catch(error => {
        alert("updateProfile error : ", error);
      })

    })
    .catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    // [START_EXCLUDE]
       if (errorCode == 'auth/weak-password') {
          alert('The password is too weak\nPlease using stronger password.');
       } 
       else if(errorMessage === 'The email address is already in use by another account.'){
         alert(errorMessage);
       }
       else {
          // alert(errorMessage);
          alert("Do not create ID, retry Sign Up!");
       }
      //  this.props.history.push("/signin");
    // [END_EXCLUDE]
    });

  }

  render(){
    return (
      <body>
        <h5 id = "SignUpTitle">Join Duggy-Music</h5>
        <h4 id = "SignUpTitle2">Create your account</h4>
        <div class="container" id = "SignUpBody">
          <div class="row">

          <div class="row">
                <div class="col s3" />
                <div class="input-field col s6" id = "SignUpinput">
                <font color = "gray">UserName</font>&nbsp;<font color = "red">*</font>
                  <input
                    placeholder="Write your name"
                    id="userNAME"
                    type="text"
                    class="validate"/>
                </div>
                <div class="col s3" />
              </div>
              
              <div class="row">
                <div class="col s3" />
                <div class="input-field col s6" id = "SignUpinput">
                <font color = "gray">UserID</font>&nbsp;<font color = "red">*</font>
                  <input
                    placeholder="Write Sign Up ID"
                    id="userID"
                    type="text"
                    class="validate"/>
                </div>
                <div class="col s3" />
              </div>
            
              <div class="row">
                <div class="col s3" />
                <div class="input-field col s6" id = "SignUpinput">
                <font color = "gray">Password</font>&nbsp;<font color = "red">*</font>
                  <input
                    placeholder="Write password"
                    id="userPW"
                    type="password"
                    class="validate"/>
                </div>
                <div class="col s3" />
              </div>

              <div class="row" id = "SignUpBtn">
                <div class="col s4" />
                <div class="col s4">
                  <button
                    class="waves-effect waves-light btn-large col s12"
                    onClick = {this.handler}> create! </button>
                </div>
                <div class="col s4" />
              </div>


          </div>
        </div>
      </body>
    );
  }
}

export default Signup;
