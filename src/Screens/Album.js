import React from "react";
import "../sass/materialize.scss";

class Album extends React.Component{
  render(){
    return (
      <div class="row">
        <div class="col s12">
          <ul class="tabs">
            <li class="tab col s3">
              <a class="active" href="#test-swipe-2">
                Test 1
              </a>
            </li>
            <li class="tab col s3">
              <a class="active" href="#test-swipe-2">
                Test 2
              </a>
            </li>
            <li class="tab col s3">
              <a class="active" href="#test-swipe-2">
                Test 3
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Album;
