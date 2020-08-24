import React from "react";
import "../sass/materialize.scss";
import firebase from "../firebase";
import {firestore} from '../firebase';
import '../App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sheet_list from './Sheet_list';
import Album_XSheet from './Album_XSheet';

import jQuery from "jquery";
import $ from "jquery";
window.$ = window.jQuery = jQuery;

class Album extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      sheet : props.match.params.url,
      songNameList : [],
      songName : null,
      songUrl : null,
      discription : 'Write discription this music!'
    };
  }

  // HELP ME ! i dont know method firestore read
  componentDidMount(){

    $(document).on("click", "#songName", function(){
      $(this).parent().children().removeAttr("style");
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
      $(this).css({background:'#bdbdbd'});
    });

    // $(document).on("ready", ".tabs", function(){
    //   $('.tabs').tabs({
    //     swipeable : true
    //   });
    // })

    // $(document).ready(function(){
    //   $(".tabs").tabs({
    //     swipeable : true
    //   })
    // })
  }

  render(){

    return (
      <div id = "album_top">
        <Sheet_list/>
      </div>
    )
  }
}

export default Album;
