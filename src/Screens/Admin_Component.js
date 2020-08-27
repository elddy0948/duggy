import React from 'react';
import jQuery from "jquery";
import $ from "jquery";
import {auth} from '../firebase';
import "../sass/materialize.scss";
import {BrowserRouter as Link} from "react-router-dom";
import {Manage} from "./Manage";
import '../App.css';
import {firestore} from '../firebase';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -8,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

window.$ = window.jQuery = jQuery;

class Admin_Component extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          size : null
        }
    }

    componentDidMount(){

      if(auth.currentUser !== null){
        firestore.collection("Users").get().then(res => {
          res.forEach(doc => {
            if(doc.get("Email") === auth.currentUser.email){
              var cnt = 0;
              let cartsheet = [];
              let cartscore = [];
              cartsheet = doc.get("cart_sheet");
              cartscore = doc.get("cart_score");
              cnt += cartsheet.length + cartscore.length;
              this.setState({size : cnt});
            }
          })
        })
      }

      $("#nav-mobile .li2").hover(function(){{
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
                  <li class = "li2" ><a class = "black-text">{displayname}</a>
                    <ul class = "ul2">
                      <li class = "li2"><a href="/manage" id = "settingBtn"class = "black-text"><i id = "settingIcons"class = "material-icons left">settings</i>Setting</a></li>
                    </ul>
                  </li>
                  <li>
                    <a class = "black-text" onClick = {this.handler_signOut}>Sign Out</a>
                  </li>
            </li>
          )
        }
        else{
          return(
            <li>
                {/* <li class = "li2"><a id = "cartApp" class = "collection-item" href = "/cart">cart<span class = "new badge">{this.state.size}</span></a></li> */}
                <li class = "li2">
                  <a href = "/cart">
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={this.state.size} color="secondary">
                        <ShoppingCartIcon />
                      </StyledBadge>
                    </IconButton>
                  </a>
                </li>
                <li class = "li2" ><a class = "black-text">{displayname}</a></li>
                <li><a class = "black-text" onClick = {this.handler_signOut}>Sign Out</a></li>
            </li>
          )
        }
    }
}

export default Admin_Component;