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
        <h1>Duggy - My Story</h1>
        <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/twGrfBQhfgE" 
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
        </iframe>
      </div>
    )
  }
}

export default Album;
