import React from "react";

class Home extends React.Component{
  render(){
    return (
      <div>
        <h2>가엾은 중생들이여!</h2>
        <h3>Duggy 님의 노래를 듣고 참회하소서!</h3>
        <a href = "https://www.youtube.com/channel/UCvjoc8M_tZKmelczU4EtKAw" target = "_blank">>> 참회는 여기서</a><p></p>
        <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/twGrfBQhfgE" 
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
        </iframe>
      </div>
    );
  }
}

export default Home;
