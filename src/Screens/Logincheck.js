import React from 'react';

import firebase from "firebase/app";
import "firebase/auth";

import { BrowserRouter as Link } from "react-router-dom";

class LoginCheck extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            signing : false,
            email : ''
        }
    }

    _get(){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              //var email = user.email;
                this.state({email:user.email, signing : true});
            }
            else {
                this.state({email:'', signing : false});
            }
        });
    }
    shouldComponentUpdate(nextProbs, nextState){ // react가 제공하는 함수, 
        return nextState.user!== this.state.user; // this.state.user 의 user 변수가 변경이 되는 경우 component를 업데이트 하도록 설정
    }
    async componentDidMount(){
        await this._get();
    }

    render(){
        // if(this.state.signing !== false){
        //     console.log("로그인 되있는 상태");
        //     console.log(this.state.email, this.state.signing);
        //     return(
        //         <Link to = "/mypage">{this.state.email}</Link>
        //     )
        // }
        // else{
        //     console.log("로그인 안되있는 상태");
        //     console.log(this.state.email, this.state.signing);
        //     return(
        //         <Link to = "/login">LOGIN</Link>
        //     )
        // }
        return(
            <Link to = "/login">LOGIN</Link>
        )
    }
}


export default LoginCheck;