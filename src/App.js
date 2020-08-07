import React from "react";

import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Album, Login, Signup, Store, Home, Manage, Admin_Component } from "./Screens";

import "./sass/materialize.scss";
import 'materialize-css/dist/css/materialize.min.css';
import M from  'materialize-css/dist/js/materialize.min.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import {auth} from './firebase';

import jQuery from "jquery";
import $ from "jquery";
window.$ = window.jQuery = jQuery;

const url = "https://duggy-music.firebaseio.com";

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        currentUser : null,
        administrator : null
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
      if(user){
        fetch(`${url}/duggy_music_admin.json`)
        .then(res => {return res.json()})
        .then(ress => {
          this.setState({administrator : ress});
        })
      }
      else{
        this.setState({administrator : null});
      }
    })

    let sidenav = document.querySelector('#slide-out');
    M.Sidenav.init(sidenav, {});
    $(".nav-wrapper #nav-mobile .li1").hover(function(){{
      $(this).find(".ul1").stop().fadeToggle(300);
    }});

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
      window.location.href = "/";
    });
  }

  // check = () => {
  //   console.log("now currentUser : ", this.state.currentUser);
  //   console.log("now email : ", this.state.currentUser.email);
  // }

  render(){
    return(
      <Router>
      <nav>
        <div class="nav-wrapper">
          <a href="/" class="brand-logo center">
            Duggy-Music
          </a>
          <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li class = "li1"><a>ALBUM</a>
              <ul class = "ul1">
                <li class = "li1"><a href="/album-1sheet">1 sheet</a></li>
                <li class = "li1"><a href="/album-2sheet">2 sheet</a></li>
                <li class = "li1"><a href="/album-3sheet">3 sheet</a></li>
              </ul>
            </li>
            <li>
              <Link to="/store">STORE</Link>
            </li>
          </ul>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            {
              this.state.currentUser ?
                <Admin_Component displayname = {this.state.currentUser.displayName} admintrue = {this.state.currentUser.email === this.state.administrator ? true : false}/>
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
      <Route path="/album-:url" component={Album} />
      <Route path="/store" component={Store} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/manage" 
        render={() => 
        this.state.currentUser ? this.state.currentUser.email === this.state.administrator ? <Manage /> 
        : <Home /> : <Home /> } />
    </Router>
    )
  };
}

export default App;
