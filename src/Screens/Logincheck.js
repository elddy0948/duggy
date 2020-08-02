import React from 'react';

import firebase from "firebase/app";
import "firebase/auth";

import '../App.css';
import "../sass/materialize.scss";

import { BrowserRouter as Link } from "react-router-dom";
import {auth} from "../firebase";  

class LoginCheck extends React.Component{

    constructor(props){
        super(props);
    }
    
    render(){
        if(this.props.currentUser){
            return(
                <div>
                    <div onClick = {() => auth.signOut()}>Sign Out</div>
                </div>
            )
        }
        else{
            return(
                <li><Link to = "/login">LOGIN</Link></li>
            )
        }
    }
}

// const LoginCheck = ({currentUser}) => (
    
//     <div>
//         { currentUser ? <div onClick = {() => auth.signOut()}>SING OUT</div> : <Link to = "/login">LOGIN</Link> }
//     </div>
// )

export default LoginCheck;