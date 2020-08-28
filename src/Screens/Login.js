import React from "react";
import ReactDom from "react-dom";

import "../sass/materialize.scss";
import "../App.css";
import styled from 'styled-components';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {firestore} from '../firebase';
import {auth} from '../firebase';

import {signInWithGoogle} from '../firebase';
import {signInWithFirebase} from '../firebase';

import KaKaoLogin from 'react-kakao-login';
import kakao from 'kakaojs';
import kakaobuttonimg from '../images/kakao_login_medium_wide.png';

const url = "https://duggy-music.firebaseio.com";

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {    };
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
  }
  
  handler_google = e => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(()=>{
      signInWithGoogle()
      .then(()=>{
        
        // 첫 로그인인 경우 authentication 에는 등록되지만 firestore에는 들어가지 않음
        // 그러므로 구글로 로그인하는 경우 추가적으로 firestore에 정보를 입력할 필요가 있음
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
        // 배포할 때 수정
        alert(error);
        return;
      });
    })
  }


  responseKaKao = () => {
    // 작업순서
    // 1. 사용자로부터 카카오 로그인을 통해 Access Token(String)을 발급받는다
    // 2. Firebase Custom Token을 만들기 위해서 kakao access token을 서버로 전송한다
    // 3. 서버에서 kakao API에 access token을 넘겨 사용자의 정보를 받아오는지 확인한다
    // 4. 사용자의 정보를 성공적으로 받았다면, Firebase Admin SDK 을 이용해서 firebase Auth 에 User을 생성한다
    // 5. 생성된 User의 UID를 통해 Firebase Custom Token을 생성해서 클라이언트에게 반환한다
    // 6. Firebase Auth 에서 제공하는 signinWithcustomtoken 메서드의 인자로 Custom Token을 넘겨 로그인을 처리한다
    
    // 여기까지 왓다면, 6번에 도달한것이 된다.
    fetch(`http://localhost:3001/login`, {
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    .then(res => {return res.json()})
    .then(res => {
      // 인증코드 도착
      fetch(`http://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&
      redirect_uri=http://localhost:3001/login2&code=`+res, {
        method : 'POST',
        header : {
          'Content-Type' : 'application/json'
        }
      })
      .then(res => {return res.json()})
      .then(res => {
        // 사용자토큰 도착
        // access_token 사용
        
      })
    })
  }

/*
// token 도착
      auth.signInWithCustomToken(token)
      .then(() => {
        // firestore에 user정보가 없다면 생성
        firestore.collection("Users").get()
        .then(res => {
          let check = false;
          res.forEach(doc => {
            if(doc.get("Email") === auth.currentUser.email){
              check = true;
              return true;
            }
          });
          if(check === false){ // firestore에 추가
            var store_data = {
              Email : auth.currentUser.email,
              name : auth.currentUser.displayName,
              buy_score : [],
              buy_sheet : [],
              cart_score : [],
              cart_sheet : []
            };
      
            firestore.collection("Users").doc().set(store_data)
            .then(()=>{
              console.log("카카오 첫 로그인 => firestore등록완료");
            })
            .catch(error => { // this error is firestore Add
              console.log("user info not join firestore" + error);
            });            
          }
        })
      })
*/

  responseError = (error) => {
    alert(error);
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
                    buttonText = "sign in with KaKao"
                    // onClick = {this.handler_kakao}
                    onSuccess = {this.responseKaKao}
                    onFailure = {this.responseError}
                    />
                  {/* <a href = {"https://kauth.kakao.com/oauth/authorize?client_id=9084ec318708cfb4deb6b4975d5865da&redirect_url=http://localhost:3001/login&reponse_type=code"}>
                    <img id = "kakaologinbtn" src = {kakaobuttonimg}/>
                  </a> */}
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