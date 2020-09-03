import React from "react";
import "../sass/materialize.scss";
import firebase from "../firebase";
import {firestore} from '../firebase';
import {auth} from '../firebase';
import '../App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sheet_list from './Sheet_list';

import jQuery from "jquery";
import $ from "jquery";
window.$ = window.jQuery = jQuery;

class Album_XSheet extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          sheet : props.url, // 현재 sheet
          songNameList : [], // 노래테이블
          songName : null, // 현재 노래
          songUrl : null, // 현재 url
          all_song : [], // 음원 전체를 담을 경우 사용
          buy_sheet : [],
          buy_score : []
        };
      }
    
      componentDidMount(){

        // get song Start
        firestore.collection(this.state.sheet).get().then(res => {
          
          var docsong = [];
          var docurl = [];
          var list = [];
    
          res.forEach(doc => {
            let songname = doc.get('songName');
            let songurl = '';
            songurl += doc.get('youtubeURL');
            let real_songurl = songurl.replace("watch?v=", "embed/");
    
            docsong.push(songname);
            docurl.push(real_songurl);
            list.push(<tr id = "songName" onClick = {() => this.page_change(songname, real_songurl)}>{songname}</tr>)
          })

          this.setState({songNameList:list, songName:docsong[0], songUrl : docurl[0], all_song : docsong});
        })
        // get song End

        // get buyList Start
        if(auth.currentUser !== null){
          firestore.collection("Users").get().then(res => {
            let buysheet;
            let buyscore;
            res.forEach(doc => {
              if(doc.get("Email") === auth.currentUser.email){
                buysheet = doc.get("buy_sheet");
                buyscore = doc.get("buy_score");
                return true;
              }
            })
            this.setState({buy_sheet : buysheet, buy_score : buyscore});

          })
        }
        // get buyList End
    
        $(document).on("click", "#songName", function(){
          $(this).parent().children().removeAttr("style");
          $(this).parent().children().removeClass("active");
          $(this).addClass("active");
          $(this).css({background:'#bdbdbd'});
        });

        $(document).ready(function(){
          $("#songNameTitle .sheetul").hover(
            function(){
              $(this).find('.ul').show();
            }, function(){
              $(this).find('.ul').hide();
            }
          )
        })

        // $(document).on("ready", ".tabs", function(){
        //   $('.tabs').tabs();
        // })
      }

      // 노래 변경
      page_change(name, url){
        this.setState({songName:name, songUrl:url});
      }

      // 음원, 악보 담기를 눌렀을 때
      // 현재 노래의 제목과 음원or악보를 구분해서
      // firestore 의 user - cart에 넣어줘야함
      user_in_cart_select(data, divisions){
        var join = "cart_"+divisions;
        firestore.collection("Users").get()
        .then(res => {
          res.forEach(doc => {
            if(doc.get("Email") === auth.currentUser.email){
              let authcart = doc.get(join);
              let can_join = [];
              let joincart = [];
              var i, j;
              for(i = 0; i<authcart.length; i++){
                joincart.push(authcart[i]);
              }

              for(i = 0; i<data.length; i++){
                var check = false;
                for(j = 0; j<joincart.length; j++){
                  if(joincart[j] === data[i]){
                    check = true;
                    break;
                  }
                }
                if(check === false) can_join.push(data[i]);
              }

              for(i = 0; i<can_join.length; i++){
                joincart.push(can_join[i]);
              }
              firestore.collection("Users").doc(doc.id).update({ [join] : joincart})
              .then(()=>{
                if(can_join.length === 0){
                  alert("이미 장바구니에 있거나, 구매했던 내역이 있습니다.");
                }
                else{
                  if(window.confirm("장바구니에 등록되었습니다.\n이동하시겠습니까?")){
                    window.location.href = "/cart";
                  }
                }
              })
              return true;
            }
          })
        })
      }

      // 음원, 악보담기를 눌렀을 때,
      // 노래를 유저가 구입한 내역이 있는지 buy_sheet, buy_score 에서 확인해야함

      check_buy = (song, divisions) => {
        if(divisions === "sheet"){
          var i;
          for(i = 0; i<this.state.buy_sheet.length; i++){
            if(song === this.state.buy_sheet[i]) return false;
          }
          return true;
        }
        if(divisions === "score"){
          var i;
          for(i = 0; i<this.state.buy_score.length; i++){
            if(song === this.state.buy_score[i]) return false;
          }
          return true;
        }
      }

      // 장바구니의 경우 로그인했을 때만 가능해야함
      check_login(){
        if(auth.currentUser === null){
          alert("please Login!");
          window.location.href = "/login";
        }
      }

      cart_sheet = () => {
        this.check_login();
        if(this.check_buy(this.state.songName, "sheet")){
          var data = [];
          data.push(this.state.songName);
          this.user_in_cart_select(data, "sheet");
        }
      }

      cart_score = () => {
        this.check_login();
        if(this.check_buy(this.state.songName, "score")){
          var data = [];
          data.push(this.state.songName);
          this.user_in_cart_select(data, "score");
        }
      }

      cart_all_sheet = () => {
        this.check_login();
        var i;
          let data = [];
          data.push(this.state.all_song);
          for(i = 0; i<data.length; i++){
            if(this.check_buy(data[i], "sheet")){
              this.user_in_cart_select(this.state.all_song, "sheet");
            }
          }
      }

      cart_all_score = () => {
        this.check_login();
        var i;
        let data = [];
        data.push(this.state.all_song);
        for(i = 0; i<data.length; i++){
          if(this.check_buy(data[i], "score")){
            this.user_in_cart_select(this.state.all_song, "score");
          }
        }        
      }

      render(){
          return(
              <div>
                <div className = "album_col_div"/>
                <div className = "album_grid" id = {this.state.sheet}>

                  <div id = "album_primary">
                    
                    <div id = "album_primary_row1">
                      <div id = "album_primary_row_div"/>
                        <iframe 
                        width="728" 
                        height="410"
                        src={this.state.songUrl}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                        </iframe>
                      <div id = "album_primary_row_div"/>
                    </div>
                    
                    <div id = "album_primary_row2">
                      <div id = "album_primary_row_div"/>
                      <div id = "album_primary_row2_center">
                        <div id = "album_primary_row2_title">
                        <div id = "album_primary_songName">{this.state.songName}</div>
                        </div>
                        <div id = "album_primary_row2_title_bottom">
                          <button id = "album_primary_row2_shopbtn" className = "waves-effect waves-light btn" onClick = {this.cart_sheet}><i className = "material-icons left">shopping_cart</i>음원/700￦</button>
                          <button id = "album_primary_row2_shopbtn" className = "waves-effect waves-light btn" onClick = {this.cart_score}><i className = "material-icons left">shopping_cart</i>악보/2000￦</button>
                        </div>
                      </div>
                      <div id = "album_primary_row_div"/>
                    </div>
                  
                  </div>

                  <div id = "album_secondary">

                  <div id = "album_secondary_title_col">
                      <div id = "songNameTitle">
                        <h5>{this.state.sheet}</h5>
                        <ul className = "sheetul"><div id = "album_primary_row2_shopbtn" className = "waves-effect waves-light btn"><i className = "material-icons left">shopping_cart</i>담기</div>
                        <ul class = "ul">
                          <li><button id = "album_primary_row2_shopbtn" className = "waves-effect waves-light btn" onClick = {this.cart_all_sheet}>음원 전체담기</button></li>
                          <li><button id = "album_primary_row2_shopbtn" className = "waves-effect waves-light btn" onClick = {this.cart_all_score}>악보 전체담기</button></li>
                        </ul>
                        </ul>
                      </div>
                      <div/>
                    </div>

                    <div id = "album_secondary_col">
                      
                      <div id = "album_songNameList_table">
                        <table id = "album_songNameList"><tbody>
                          {this.state.songNameList}
                        </tbody></table>
                      </div>
                      <div/>

                    </div>

                  </div>

              </div>
            </div>
          )
      }

}

export default Album_XSheet; 