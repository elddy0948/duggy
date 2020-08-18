import React from "react";
import youtubeIcon from "../images/Youtubeicon.png";
import instagramIcon from "../images/Instagramicon.png";

import jQuery from "jquery";
import $ from "jquery";
import { black } from "material-ui/styles/colors";
window.$ = window.jQuery = jQuery;

function Home() {

  $(document).ready(function(){
    $(".tabs").tabs({
      swipeable : true
    })
  })

  return (
    <>
      <body>
        <h3></h3>
        <div class="row center-align">
          <div class="col s6 right-align">
            <img src={youtubeIcon} />
          </div>
          <div class="col s6 left-align">
            <img src={instagramIcon} />
          </div>
        </div>
        <div class = "row">
          <div class = "col s6">
        <ul id="tabs-swipe-demo" class="tabs">
    <li class="tab col s3"><a href="#1">Test 1</a></li>
    <li class="tab col s3"><a href="#2">Test 2</a></li>
    <li class="tab col s3"><a href="#3">Test 3</a></li>
  </ul>
  <div id="1" class="col s1 blue">Test 1</div>
  <div id="2" class="col s1 red">Test 2</div>
  <div id="3" class="col s1 green">Test 3</div>
  </div>
        </div>
      </body>
    </>
  );
}

export default Home;
