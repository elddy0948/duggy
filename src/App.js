import React from "react";

import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Album, Login, Signup, Store, Home, Manage } from "./Screens";

import "./sass/materialize.scss";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import LoginCheck from "./Screens/Logincheck";

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        signing : false,
        email : ''
    }
  }

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
  shouldComponentUpdate(nextProbs, nextState){ // react가 제공하는 함수, 
      return nextState.user!== this.state.user; // this.state.user 의 user 변수가 변경이 되는 경우 component를 업데이트 하도록 설정
  }
  componentDidMount(){
      // return async function(){ await this._get();}
      this._get();
  }

  render(){
    return(
      <Router>
      <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo center">
            Duggy-Music
          </a>
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
            <li>
              {Object.keys(this.state).map(()=>{
                const now = this.state;
                console.log(now);
                if(now.signing == true){
                  return(
                  <Link to = "/mypage">{now.email}</Link>
                  )
                }
                else{
                  return(
                    <Link to = "/login">LOGIN</Link>
                  )
                }
              })}
            </li>
            <li>
              <Link to="/signup">SIGNUP</Link>
            </li>
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
