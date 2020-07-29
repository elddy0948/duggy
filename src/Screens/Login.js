import React from "react";
import ReactDom from "react-dom";
import "../sass/materialize.scss";
import "../App.css";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {signInWithGoogle} from '../firebase';

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      requestID : '',
      requestPW : ''
    };
  }

  handlerID = e => {
    this.setState({requestID : e.target.value});
  };
  handlerPW = e => {
    this.setState({requestPW : e.target.value});
  };
  handler = e => {
    const login_info = {
      method : "POST",
      body : JSON.stringify(this.state),
      headers : {"Content-Type":"application/json"}
    };
    fetch("http://localhost:3000/login", login_info)
    .then(res => {return res.json();})
    .then(json => {
      this.setState({requestID : json.requestID, requestPW : json.requestPW});
    });
    console.log(this.state.requestID, this.state.requestPW);
    alert("로그인 되었습니다.\nID : "+this.state.requestID+"\nPW : "+this.state.requestPW);
    this.props.history.push('/');
  }

  render(){
    return (
      <body id = "login_body">
        <div class="container">
          <div class="row"/>
          <div class="row">
          <form onSubmit = {this.handler}>
              
              <div class="row">
                <div class="col s3" />
                <div class="input-field col s6">
                  <input 
                    placeholder="example@google.com" 
                    id="email" 
                    type="email"
                    class="validate"
                    value = {this.state.requestID}
                    onChange = {this.handlerID}
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
                    value = {this.state.requestPW}
                    onChange = {this.handlerPW}
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
                    > 로그인 </button>
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
