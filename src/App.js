import React from "react";

import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Album, Login, Signup, Store, Home, Manage } from "./Screens";

import "./sass/materialize.scss";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import {auth} from './firebase';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        currentUser : null
    }
  }

  /*
  componentDidMount()
  유저가 로그인한 상태가 변경될 경우, state의 값을 변경함 
  유저가 로그인 한 경우, 로그인 한 유저의 정보가 currentUser에 저됨장
  만약 로그아웃을 하면 다시 this.state.currentUser에 null이 저장됨 
  유저가 로그아웃하지 않는 이상, 창을 끄거나 새로운 탭에서 페이지에 들어가도 로그인 정보는 그대로 유지됨
  */

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser : user});
    })
  }

  /*
  open subscription은 App 컴포넌트가 DOM에 존재하는 한 유효함
  하지만 DOM에서 App 컴포넌트가 unmount될 경우, 이 과정을 멈춰주지 않으면(close subscription) 메모리 누수가 발생함
  이를 위해서 Mount위에 있는 변수인 unsubscribeFromAuth 변수를 사용
  초기에는 null을 넣어두고, 만약 user 정보가 갱신되면 auth.onAuthStateChanged 메소드가 리턴하는 함수를 unsubscribeFromAuth 변수에 담아두고,
  이후 App 컴포넌트가 unmount 되면 이 값이 호출되도록 해주면 close subscription이 가능함
  */

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  handler_signOut = () => {
    auth.signOut().then(()=>{
      alert("success SignOUT!");
      window.location.reload();
    });
  }

  handlerbtn = () => {
    console.log(auth.currentUser);
  }

  /* Dont touch
  _get(){
      firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            //var email = user.email;
              this.state({email:user.email, signing : true});
          }
          else {
              this.state({email:'', signing : false});
          }
      });
  }
  shouldComponentUpdate(nextProbs, nextState){ // false를 반환하면 render()를 호출하지 않는다. default : true !      
    if(this.state.signing !== nextState.signing){
        this._get();
        return true;
    }
    else return false;
    // return nextState.signing !== this.state.signing; // state 의 signing 즉 접속중이 변경되면 재 렌더링이 이루어짐
  }
  componentDidMount(){
      // return async function(){ await this._get();}
      // this._get();
  }
  */

  render(){
    return(
      <Router>
      <nav>
        <div class="nav-wrapper">
          <a href="/" class="brand-logo center">
            Duggy-Music
          </a>
          <a onClick = {this.handlerbtn}>현재 user 정보는 ?</a>
          <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/album">ALBUM</Link>
            </li>
            <li>
              <Link to="/store">STORE</Link>
            </li>
          </ul>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
              {
                this.state.currentUser ?
                  <li>
                  <li><a href = "">{this.state.currentUser.displayName}</a></li>
                  <li><a onClick = {this.handler_signOut}>Sign Out</a></li>
                  </li>
                :
                <li>
                  <li><Link to = "/login">LOGIN</Link></li>
                  <li><Link to="/signup">SIGNUP</Link></li>
                </li>
              }
          </ul>
        </div>
      </nav>
      <Route exact path="/" component={Home} />
      <Route path="/album" component={Album} />
      <Route path="/store" component={Store} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/manage" component={Manage} />
    </Router>
    )
  };
}

export default App;
