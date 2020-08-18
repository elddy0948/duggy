import React from "react";
import youtubeIcon from "../images/Youtubeicon.png";
import instagramIcon from "../images/Instagramicon.png";

function Home() {
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
        <h1> Home </h1>
      </body>
    </>
  );
}

export default Home;
