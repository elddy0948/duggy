import React from "react";
import ReactDom from "react-dom";

import "../sass/materialize.scss";
import "../App.css";
import styled from 'styled-components';

import firebase, { auth } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import {signInWithGoogle} from '../firebase';
import {signInWithFirebase} from '../firebase';

import KaKaoLogin from 'react-kakao-login';

const url = "https://duggy-music.firebaseio.com";

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

      // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      // .then(()=>{
      //   signInWithFirebase(email, password)
      //   .then(()=>{
      //     this.props.history.push("/");
      //   })
      //   .catch(error => {
      //     alert(error);
      //     return;
      //   });
      // })

    }
    // document.getElementById('quickstart-sign-in').disabled = true;
  }

  handler_google = e => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(()=>{
      signInWithGoogle()
      .then(()=>{
        this.props.history.push("/");
      })
      .catch(error => {
        // 배포할 때 수정
        alert(error);
        return;
      });
    })
  }

  handler_kakao = () => {
    // 작업순서
    // 1. 사용자로부터 카카오 로그인을 통해 Access Token(String)을 발급받는다
    // 2. Firebase Custom Token을 만들기 위해서 kakao access token을 서버로 전송한다
    // 3. 서버에서 kakao API에 access token을 넘겨 사용자의 정보를 받아오는지 확인한다
    // 4. 사용자의 정보를 성공적으로 받았다면, Firebase Admin SDK 을 이용해서 firebase Auth 에 User을 생성한다
    // 5. 생성된 User의 UID를 통해 Firebase Custom Token을 생성해서 클라이언트에게 반환한다
    // 6. Firebase Auth 에서 제공하는 signinWithcustomtoken 메서드의 인자로 Custom Token을 넘겨 로그인을 처리한다
  }

  responseGoogle = res => {
    window.location.href="/";
  }

  responseKaKao = res => {
    window.location.href="/";
  }

  responseError = error => {
    // alert(error.code);
    // window.location.reload();
    alert("google : ", process.env.REACT_APP_API_KEY);
    alert("kakao : ", process.env.REACT_APP_KAKAO_API_KEY);
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
                    // placeholder="example@google.com" 
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
                    // placeholder="Password" 
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
                <KaKaoButton
                    jsKey={process.env.REACT_APP_KAKAO_API_KEY}
                    // class="waves-effect waves-light btn-large col s12"
                    buttonText = "sign in with KaKao"
                    onSuccess = {this.responseKaKao}
                    onFailure = {this.responseError}
                    />
                    {/* onClick = {this.handler_kakao} >sign in with KaKao</KaKaoButton> */}
                </div>
                <div class="col s4"/>
            </div>

          </div>
        </div>
      </body>
    );
  }
}

const KaKaoButton = styled(KaKaoLogin)`
  padding: 0;
  width: 100%;
  height: 100%;
  line-height: 44px;
  color: #783c00;
  background-color: #FFEB00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  $:hover{
    box-shadow: 0 0px 15px 0 rgba(0,0,0,0.2)
  }
`

export default Login;