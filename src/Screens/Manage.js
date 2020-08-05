import React from "react";
import "../sass/materialize.scss";
import "../firebase";
import "./Manage.css";
import "../App.css";
import Typography from "@material-ui/core/Typography";
import jQuery from "jquery";
import $ from 'jquery';
import {auth} from '../firebase';
import {Admin} from './Admin';
window.$ = window.jQuery = jQuery;
const url = "https://duggy-music.firebaseio.com";


class Manage_score extends React.Component{

  render(){
      var lists = [];
      var data = this.props.data;
      var i = 0;
      while( i < data.length){

        lists.push(<li key = {data[i].id}><a href = {"/Content/" + data[i].id}> {data[i].title} </a></li>)
        i = i + 1;

      }

    return(

      <ul>
        {lists}
      </ul>

    );
  }

}

class Manage_read_album extends React.Component{

  render(){

    var lists = [];
    var data = this.props.data;
    var i = 0;
    while( i < data.length){

      lists.push(<li key = {data[i].id}><a href = {"/manage/" + data[i].id}> {data[i].id}번 앨범 </a></li>)
      i = i + 1;

    }

    return(
        <ul>
          {lists}
        </ul>
    );
  }
}



class Manage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      admin_album : {},
      album_information : {},
      ALBUM_1:[
        {id:1, title:'1집', desc:'1집 is for information'},
        {id:2, title:'1집', desc:'1집 is for information'},
        {id:3, title:'1집', desc:'1집 is for information'}
      ],
      ALBUM_2:[],
    }

  }
  
  _get(){
    fetch(`${url}/.json`).then(res => {
      if(res.status !== 200){ 
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(admin_album => this.setState({admin_album:admin_album}));
  }
  // shouldComponentUpdate(nextProbs, nextState){ // react가 제공하는 함수, 
  //   return nextState.user!= this.state.user; // this.state.user 의 user 변수가 변경이 되는 경우 component를 업데이트 하도록 설정
  // }
  componentDidMount(){
    this._get();

    $(document).ready(function($){
      $(".button-collapse").sidenav({
        menuWidth: 275
      });
      $('.collapsible').collapsible();
    });
    
  }

  handler_notAdmin = () => {
    this.props.history.push("/");
  }


  render(){
    if(auth.currentUser && Admin === auth.currentUser.email){
      return (
        <body class ="wrapping">
          {/* <nav>
            <a href ="#" data-target = "slide-out" class = "sidenav-trigger show-on-large">
              <i class = " material-icons">menu</i></a>            
          </nav> */}
          
            <ul id ="slide-out" class="sidenav sidenav-fixed">
              <ul class="collapsible collapsible-expandable">
              
                <li><a class="collapsible-header">ALBUM<i class="material-icons right">arrow_drop_down</i></a>
                  <div class ="collapsible-body" >
                    <Manage_read_album data = {this.state.admin_album}></Manage_read_album>
                  </div>
                </li>
              
              </ul>
            </ul>
  
            <h1>here Managing Page</h1>
            <Manage_score data = {this.state.ALBUM_1}></Manage_score>
  
            {Object.keys(this.state.admin_album).map(idx => {
              const admin_album = this.state.admin_album[idx];
              const admin_albumidx = idx;
              console.log(admin_album); // check console
              return (
                <div>
                  <div>{admin_albumidx}번째!</div>
                  <p></p>
                </div>
              );
            })}
  
        </body>
      );
    }
    else{
      return (
      <div>
        {this.handler_notAdmin()}
      </div>
      );
    }
  }
}

export default Manage;