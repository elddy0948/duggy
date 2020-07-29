import React from "react";
import "../sass/materialize.scss";
import "../firebase";
import Typography from "@material-ui/core/Typography";

const url = "https://duggy-music.firebaseio.com";

class Manage extends React.Component{
  constructor(){ // Manage 컴포넌트 생성자
    super();
    this.state = {
      user : {} // user 라는 데이터가 있다고 가정
    }
  }
  _get(){ // url 의 user.json 경로에 접속을 해서 데이터를 가져오는 형태
    fetch(`${url}/user.json`).then(res => {
      if(res.status !== 200){ // 접속을 했을 때 상태 코드가 200이 아니라면 firebase 서버에 문제가 발생
        throw new Error(res.statusText); // 오류 출력
      }
      return res.json(); // 결과를 json 형태로 출력
    }).then(user => this.setState({user:user})); // 결과 데이터를 위에서 만든 user 변수에 저장
  }
  // shouldComponentUpdate(nextProbs, nextState){ // react가 제공하는 함수, 
  //   return nextState.user!= this.state.user; // this.state.user 의 user 변수가 변경이 되는 경우 component를 업데이트 하도록 설정
  // }
  componentDidMount(){ // 컴포넌트가 구성된 다음, 자동으로 수행되도록 react 컴포넌트가 기본적으로 제공하는 함수
    this._get(); // componentDidMount => 즉 컴포넌트가 실행되면 자동으로 내부 작업이 이루어지도록 함
  }
  render(){
    return (
      <body>
          <h1>here Managing Page</h1>
          {Object.keys(this.state.user).map(idx => {
            const user = this.state.user[idx];
            console.log(user);
            return (
              <div>
                <div>firebase에서 읽은 데이터</div>
                <div>id : {user.id}</div>
                <div>권한 : {user.author}</div>
                manage page 에 접속시, 현재 로그인된 ID 에 대한 session을 확인하여 작업을 진행
              </div>
            );
          })}
      </body>
    );
  }
}

export default Manage;
