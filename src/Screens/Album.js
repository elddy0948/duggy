import React from "react";
import "../sass/materialize.scss";
import firebase from "../firebase";
import {firestore} from '../firebase';
import '../App.css';

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
    firestore.collection(this.state.sheet).get().then(res => {
      // this.setState({songNameList:res});
      // 어떻게 첫번째 문서에 접근하냔 말입니다 행님들..
      // 일단 전체 다받아와서 접근할테니 방법좀 구사해주십쇼!
      var doclist = [];
      var doclist2 = [];
      var list = [];

      res.forEach(doc => {
        let songname = doc.get('songName');
        let songurl = '';
        songurl += doc.get('youtubeURL');
        let real_songurl = songurl.replace("watch?v=", "embed/");

        doclist.push(songname);
        doclist2.push(real_songurl);
        list.push(
        <tr id = "songName" onClick = {() => this.page_change(songname, real_songurl)}>
        {songname}</tr>)
      })
      this.setState({songNameList:list});
      this.setState({songName:doclist[0], songUrl : doclist2[0]});
    })

    $(document).on("click", "#songName", function(){
      $(this).parent().children().removeAttr("style");
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
      $(this).css({background:'#bdbdbd'});
    });

  }

  page_change(name, url){
    this.setState({songName:name, songUrl:url});
  }

  render(){

    return (
      <div>
        <div class = "album_col_div"/>
        <div id = "album_grid">

            <div id = "album_primary">
              <div id = "album_primary_row1">
                <div id = "album_primary_row_div"/>
                  <iframe 
                  width="728" 
                  height="410"
                  src={this.state.songUrl}
                  frameborder="0" 
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
                  </iframe>
                <div id = "album_primary_row_div"/>
              </div>
              <div id = "album_primary_row2">
                <div id = "album_primary_row2_title">
                  <div id = "album_primary_row_div"/>
                  <div id = "album_primary_songName">{this.state.songName}</div>
                  <div id = "album_primary_row_div"/>
                </div>
                <div id = "album_primary_row2_discription">
                  <div id = "album_primary_row_div"/>
                  <div id = "album_primary_discription">{this.state.discription}</div>
                  <div id = "album_primary_row_div"/>
                </div>
              </div>
            </div>

            <div id = "album_secondary">

              <div id = "album_secondary_title_col">
              <h5 id = "songNameTitle">album_{this.state.sheet} song List</h5><div/>
              </div>

              <div id = "album_secondary_col">
                
                <div id = "album_songNameList_table">
                  <table id = "album_songNameList">
                    {this.state.songNameList}
                  </table>
                </div>
                <div/>

              </div>

            </div>

        </div>
      </div>
    )
  }
}

export default Album;
