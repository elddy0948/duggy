import React from "react";
import youtubeIcon from "../images/Youtubeicon.png";
import instagramIcon from "../images/Instagramicon.png";
import cover1 from "../images/cover1.png";
import cover2 from "../images/cover2.png";

import jQuery from "jquery";
import $ from "jquery";
import { black } from "material-ui/styles/colors";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

window.$ = window.jQuery = jQuery;

function Home() {
  $(document).ready(function () {
    $(".tabs").tabs({
      swipeable: true,
    });
  });
  const images = [cover1, cover2, cover1];

  return (
      <div>
        <h3></h3>
        <div className="row center-align">
          <div className="col s6 right-align">
            <a
              target="_blank"
              href="https://www.youtube.com/channel/UCvjoc8M_tZKmelczU4EtKAw"
            >
              <img src={youtubeIcon} />
            </a>
          </div>
          <div className="col s6 left-align">
            <a target="_blank" href="https://www.instagram.com/hyun_duggy/">
              <img src={instagramIcon} />
            </a>
          </div>
        </div>
        <div className="slide-container center-align">
          <Fade>
            <div className="each-fade">
              <div className="image-container">
                <img src={images[0]} />
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={images[1]} />
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={images[2]} />
              </div>
            </div>
          </Fade>
        </div>
      </div>
  );
}

export default Home;
