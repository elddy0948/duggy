import React from "react";
import ReactDom, { render } from "react-dom";

import "../sass/materialize.scss";
import '../App.css';
import '../firebase';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
/*

-> 회원가입을 하면 userName, userID, password 를 입력받음
-> useriD 와 password 는 authentication 에 등록하여 사용자 인증을 받도록 하고,
-> 입력받은 userName, 동일 이름이 있을 수 있으니 userID, 나중에 store 에서 권한 부여를 위해 일반 사용자인 connect
-> {userName : '', userID : '', auth : ''} 의 JSON 형태로 DB에 등록한다.

-> auth 의 경우 구매할 수 있는 악보에 대한 권한이 1개가 아니기 때문에, 여러가지 값을 줄 수 있도록 해야한다.
-> DB를 어떤식으로 구성해야되냐?
-> 이렇게 하면 괜찮을듯 함
-> 위의 {userName : '', userID : '', auth : ''} 의 JSON 형태로 DB에 등록한다. 에서
-> auth 값에도 여러 값을 부여할 수 있는 형태로 구성할 수 있기 때문에(NOSQL)
-> auth X -> store 로 변경해서
-> 사용자가 악보를 구매할 때 마다 store의 값에 악보에 대한 권한을 추가해주는 것

-> 이런 형태가 됨
------------------------------------------
** fb DB **
duggy-music
ㄴ user
    ㄴ 사용자1 ㅡ
                ㄴ  .........?? 권한을 줘야되나? 

                일단 안준다고 가정하고 구현하겠음

duggy-music
ㄴ user
    ㄴ idx ㅡ
            ㄴ userName : 이름
            ㄴ userID : 아이디
    ㄴ idx ㅡ
            ㄴ userName : 이름
            ㄴ userID : 아이디
    ㄴ idx ㅡ ...

------------------------------------------
*/

class Signup extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      requestID : '',
      requestPW : '',
      requestNAME : ''
    }
  }

  handlerID = e => {
    this.setState({requestID : e.target.value});
  }
  handlerPW = e => {
    this.setState({requestPW : e.target.value});
  }
  handlerNAME = e => {
    this.setState({requestNAME : e.target.value});
  }
  handler = e => {
    var check = false;
    var userNAME = document.getElementById('userNAME').value;
    var userID = document.getElementById('userID').value;
    var userPW = document.getElementById('userPW').value;
    
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
    // 이 함수는 비동기 함수이기 때문에 내부적으로 아이디가 만들어진건지 아닌지 콜백 후의 결과에 따라 처리


    firebase.auth().createUserWithEmailAndPassword(userID, userPW)
    .then(function() {
      alert("Thank you Create your account.\nPlease SignIn!");
      console.log('make ID!!');
      // this.props.history.push("/");
    })
    .catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    // [START_EXCLUDE]
       if (errorCode == 'auth/weak-password') {
          alert('The password is too weak\nPlease using stronger password.');
       } else {
          // alert(errorMessage);
          alert("Do not create ID, retry Sign Up!");
       }
      //  this.props.history.push("/signin");
    // [END_EXCLUDE]
    });

  }

  // handler = e => {
  //   const signup_info = {
  //     method : 'POST',
  //     body : JSON.stringify(this.state),
  //     headers : {'Content-Type':'application/json'}
  //   };
  //   fetch('http://location:3000/signup', signup_info)
  //   .then(res => {
  //     if(res.status !== 200){
  //       throw new Error;
  //     }
  //     return res.json();
  //   })
  //   .then(json => {
  //     this.setState({requestID : json.requestID, requestPW : json.requestPW, requestNAME : json.requestNAME});
  //   });
  //   alert("회원가입 되었습니다.\nNAME : "+this.state.requestNAME+"\nID : "+this.state.requestID+"\nPW : "+this.state.requestPW);
  //   this.props.history.push('/');
  // }

  render(){
    return (
      <body>
        <h5 id = "SignUpTitle">Join Duggy-Music</h5>
        <h4 id = "SignUpTitle2">Create your account</h4>
        <div class="container" id = "SignUpBody">
          <div class="row">

            <form class="col s12" onSubmit = {this.handler}>

            <div class="row">
                <div class="col s3" />
                <div class="input-field col s6" id = "SignUpinput">
                <font color = "gray">UserName</font>&nbsp;<font color = "red">*</font>
                  <input
                    placeholder="Write your name"
                    id="userNAME"
                    type="text"
                    class="validate"
                    value = {this.state.requestNAME}
                    onChange = {this.handlerNAME}/>
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
                    class="validate"
                    value = {this.state.requestID}
                    onChange = {this.handlerID}/>
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
                    class="validate"
                    value = {this.state.requestPW}
                    onChange = {this.handlerPW}/>
                </div>
                <div class="col s3" />
              </div>

              <div class="row" id = "SignUpBtn">
                <div class="col s4" />
                <div class="col s4">
                  <button
                    class="waves-effect waves-light btn-large col s12"
                    type = "submit"
                    > create! </button>
                </div>
                <div class="col s4" />
              </div>

            </form>

          </div>
        </div>
      </body>
    );
  }
}

export default Signup;
