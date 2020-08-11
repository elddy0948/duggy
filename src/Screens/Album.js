import React from "react";
import "../sass/materialize.scss";
import firebase from "../firebase";
import { storage } from "firebase";

class Album extends React.Component{

  constructor(props){
    super(props);
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
                src="https://www.youtube.com/embed/twGrfBQhfgE" 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
                </iframe>
              <div id = "album_primary_row_div"/>
            </div>
            <div id = "album_primary_row2">
              <div id = "album_primary_row2_title">
                <div id = "album_primary_row_div"/>
                <div id = "album_songName">%songName%</div>
                <div id = "album_primary_row_div"/>
              </div>
              <div id = "album_primary_row2_discription">
                <div id = "album_primary_row_div"/>
                <div id = "album_discription">%discription%</div>
                <div id = "album_primary_row_div"/>
              </div>
            </div>
          </div>

            <div id = "album_secondary">
              
              <div>
                <table id = "album_songNameList">
                  <tr id = "songNameTitle"><h5>album_Xsheet song List</h5></tr>
                  <tr id = "songName">SongName</tr>
                  <tr id = "songName">SongName</tr>
                  <tr id = "songName">SongName</tr>
                  <tr id = "songName">SongName</tr>
                  <tr id = "songName">SongName</tr>
                  <tr id = "songName">SongName</tr>
                  <tr id = "songName">SongName</tr>
                  <tr id = "songName">SongName</tr>
                  <tr id = "songName">SongName</tr>
                  <tr id = "songName">SongName</tr>
                </table>
              </div>
              <div/>
            </div>

        </div>
      </div>
    )
  }
}

export default Album;
