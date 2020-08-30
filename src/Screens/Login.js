import React from "react";
import ReactDom from "react-dom";

import "../sass/materialize.scss";
import "../App.css";
import styled from 'styled-components';

import firebase from '../firebase';
import {firestore} from '../firebase';
import {auth} from '../firebase';

import {signInWithGoogle} from '../firebase';
import {signInWithFirebase} from '../firebase';

import kakao from 'kakaojs';
import kakaobuttonimg from '../images/kakao_login_medium_wide.png';

import jQuery from "jquery";
import $ from "jquery";
window.$ = window.jQuery = jQuery;

const url = "https://duggy-music.firebaseio.com";

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount(){

    $(document).ready(() =>{
      window.addEventListener('message', function(e){
        
        if(e.origin === 'http://localhost:3001'){
          if(e.data.logic === true){
            
            let token = e.data.firebase_token;
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
                
                firebase.auth().signInWithCustomToken(token).then(() => {

                  var login_check = false;
                  firestore.collection("Users").get().then(res => {

                      res.forEach(doc => {
                        if(doc.get("Email") === auth.currentUser.email){
                          login_check = true;
                          return true;
                        }
                      })

                      if(login_check === false){
                        var store_data = {
                          Email : auth.currentUser.email,
                          buy_score : [],
                          buy_sheet : [],
                          cart_score : [],
                          cart_sheet : [],
                          name : auth.currentUser.displayName
                        };

                        firestore.collection("Users").doc().set(store_data).then( () => {
                          // this.props.history.push("/");
                          window.location.href = "/";
                        })
                        .catch( error => {
                          alert(error);
                          return;
                        })
                      }

                  })
                  .catch(error => {console.log(error); alert(error);})
                })
            })
          }          
        }
      })
    })
  }

  handler = e => {
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
    
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(()=>{
      signInWithFirebase(email, password)
      .then(()=>{
        this.props.history.push("/");
      })
      .catch(error => {
        alert(error);
        return;
      });
    })    
  }
  
  handler_google = e => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(()=>{
      signInWithGoogle()
      .then(()=>{
        
        var login_check = false;
        firestore.collection("Users").get()
        .then(res => {
          res.forEach(doc => {
            if(doc.get("Email") === auth.currentUser.email){
              login_check = true;
              return true;
            }
          })
          
          if(login_check == false){
            var store_data = {
              Email : auth.currentUser.email,
              authority : [],
              name : auth.currentUser.displayName
            };

            firestore.collection("Users").doc().set(store_data)
            .then( () => {
              this.props.history.push("/");
            })
            .catch( error => {
              alert(error);
              return;
            })
          }
        })

        this.props.history.push("/");
      })
      .catch(error => {
        alert(error);
        return;
      });
    })
  }

  responseKaKao = () => {
    let windowHeight = window.screen.height;
    let windowWidth = window.screen.width;
    let popupHeight = 650;
    let popupWidth = 480;

    let popupH = (windowHeight/2)-(popupHeight/2);
    let popupW = (windowWidth/2)-(popupWidth/2);

    let kakao_restapi = 'height = '+popupHeight+', width = '+popupWidth+', top = '+popupH+', left = '+popupW;
    window.open("https://kauth.kakao.com/oauth/authorize?client_id=9084ec318708cfb4deb6b4975d5865da&redirect_uri=http://localhost:3001/login&response_type=code",
    'SignIn with KaKao', kakao_restapi);
  }

  forget_user_password = () => {
    this.props.history.push("/password_reset");
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
                  <label for = "email">UserEmail</label>
                  <input 
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
                  <label for = "password">password</label>
                  <input
                    id="password"
                    type="password" 
                    class="validate"
                    />
                  <a href = "#" onClick = {this.forget_user_password}>forgot password?</a>
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
                <button
                    class="waves-effect waves-light btn-large col s12"
                    onClick = {this.handler_google} > sign in with Google </button>
                </div>
                <div class="col s4"/>
            </div>

            <div class="row">
                <div class="col s4"/>
                <div class="col s4">
                  <a id = "kakaologincheck" onClick = {this.responseKaKao}>
                    <img id = "kakaologinbtn" src = {kakaobuttonimg}/>
                  </a>
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