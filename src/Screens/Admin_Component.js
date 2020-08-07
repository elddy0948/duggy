import React from 'react';
import jQuery from "jquery";
import $ from "jquery";
import {auth} from '../firebase';
import "../sass/materialize.scss";
import {BrowserRouter as Link} from "react-router-dom";
import {Manage} from "./Manage";
import '../App.css';

window.$ = window.jQuery = jQuery;

class Admin_Component extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        $(".nav-wrapper #nav-mobile .li2").hover(function(){{
            $(this).find(".ul2").stop().fadeToggle(300);
          }});
    }

    handler_signOut = () => {
        auth.signOut().then(()=>{
          window.location.href = "/";
        });
      }

    render(){
        var displayname = this.props.displayname;
        var admin_check = this.props.admintrue;
        if(admin_check){
          return(
            <li>
                  <li class = "li2" ><a>{displayname}</a>
                    <ul class = "ul2">
                      <li class = "li2"><a href="/manage"><i class = "material-icons left">settings</i>Setting</a></li>
                    </ul>
                  </li>
                  <li>
                    <a onClick = {this.handler_signOut}>Sign Out</a>
                  </li>
            </li>
          )
        }
        else{
          return(
            <li>
                  <li class = "li2" ><a class = "user-admin-view">{displayname}</a></li>
                  <li><a onClick = {this.handler_signOut}>Sign Out</a></li>
            </li>
          )
        }
    }
}

export default Admin_Component;