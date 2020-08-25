import React from "react";
import ReactDom, { render } from "react-dom";

import "../sass/materialize.scss";
import '../App.css';
import '../firebase';

// import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebase from '../firebase';
import {firestore} from '../firebase';

import {signInWithFirebase} from '../firebase';
import {signUpWithFirebase} from '../firebase';
import {auth} from '../firebase';

class Signup extends React.Component{

  constructor(props){
    super(props);
    this.state = {}
  }

  handler = e => {
    var userName = document.getElementById('userName').value;
    var userEmail = document.getElementById('userEmail').value;
    var userPW = document.getElementById('userPW').value;
    

    if(userName.length < 4){
      alert('Please enter Nickname address.');
      window.location.reload();
    }
    if(userName.length === 'administrator'){
      alert('Cant signup this userName, please enter another userName.');
      window.location.reload();
    }
    if (userEmail.length < 4) {
      alert('Please enter an email address.');
      window.location.reload();
    }
    if (userPW.length < 4) {
      alert('Please enter a password.');
      window.location.reload();
    }

    // Sign in with email and pass.
    // [START createwithemail]

    signUpWithFirebase(userEmail, userPW)
    .then(() => {
      
      // firestore 에 유저정보 등록하기 collection : Users (Email : userEmail, name : userName, authority(array) : null)
      var store_data = {
        Email : userEmail,
        authority : [],
        name : userName
      };

      firestore.collection("Users").doc().set(store_data)
      .then(()=>{
        // 유저의 displayName 을 업데이트
        var userInfo = auth.currentUser;
        userInfo.updateProfile({
          displayName : userName
        }).then(()=>{
          auth.signOut()
          .then(()=>{ // clear!
            alert("Thank you Create your account.\nPlease SignIn!");
            this.props.history.push("/");
          })
          .catch(error => { // this error is signOut error
            alert("session error : " + error);
            window.location.reload();
          })
        }).catch(error => { // this error is updateProfile error
          alert("updateProfile error : " + error);
          window.location.reload();
        })
      })
      .catch(error => { // this error is firestore Add
        alert("user info not join firestore" + error);
        window.location.reload();
      })
    })
    .catch(error => { // not make auth info
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak\nPlease using stronger password.' + error);
        window.location.reload();
     } 
     else if(errorMessage === 'The email address is already in use by another account.' + error){
        alert(errorMessage);
        window.location.reload();
      }
      else {
         // alert(errorMessage);
        alert("Do not create ID, retry Sign Up!" + error);
        window.location.reload();
      }
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
                {/* <font color = "gray">userNick</font>&nbsp;<font color = "red">*</font> */}
                  <input
                    // placeholder="Write your name"
                    id="userName"
                    type="text"
                    class="validate"/>
                    <label for = "userName">userName</label>
                </div>
                <div class="col s3" />
              </div>
              
              <div class="row">
                <div class="col s3" />
                <div class="input-field col s6" id = "SignUpinput">
                {/* <font color = "gray">userEmail</font>&nbsp;<font color = "red">*</font> */}
                  <input
                    // placeholder="Write Sign Up ID"
                    id="userEmail"
                    type="text"
                    class="validate"/>
                    <label for = "userEmail">userEmail</label>
                </div>
                <div class="col s3" />
              </div>
            
              <div class="row">
                <div class="col s3" />
                <div class="input-field col s6" id = "SignUpinput">
                {/* <font color = "gray">Password</font>&nbsp;<font color = "red">*</font> */}
                  <input
                    // placeholder="Write password"
                    id="userPW"
                    type="password"
                    class="validate"/>
                    <label for = "userPW">password</label>
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
