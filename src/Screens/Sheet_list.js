import React from 'react';
import ReactDom from 'react-router-dom';
import firebase from '../firebase';
import {firestore} from '../firebase';
import "../sass/materialize.scss";
import '../App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Album_XSheet from './Album_XSheet';

import jQuery from "jquery";
import $ from "jquery";
window.$ = window.jQuery = jQuery;

class Sheet_list extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            SheetList : [],
            XSheetList : [],
        }
    }

    componentDidMount = () => {
        var list = [];
        var xsheet_list = [];
        var sheetlist = [];
        
        firestore.collection('SheetList').get()
        .then(res=>{
            res.forEach(doc => {
                list = doc.get('list');
                var i;
                for(i = 0; i<list.length; i++){
                var url = "#album-";
                url += list[i];
                var url2 = "album-";
                url2 += list[i];

                sheetlist.push(<li class = "tab col s2"><a class = "black-text" href={url}>{list[i]}</a></li>);
                xsheet_list.push(<div id = {url2} class = "col s12"><Album_XSheet url = {list[i]}/></div>)
                }

                this.setState({SheetList : sheetlist});
                this.setState({XSheetList : xsheet_list});
            })

            $(document).ready(function(){
                $(".tabs").tabs({
                    swipeable : true
                })
                $('#change_height').children().eq(1).css('height','650px');
                $('#tabs-swipe-demo').css('padding-top','0%');
            })

        })

        // $(document).on("ready", function(){
        //     $('.tabs').tabs({
        //       swipeable : true
        //     });
        //   })

    }

    render(){
        return(
            <div class = "row">
                <div class = "col s12" id = "change_height">
                    <ul id = "tabs-swipe-demo" class = "tabs">
                        {this.state.SheetList}
                    </ul>
                    {this.state.XSheetList}
                </div>
            </div>
        )
    }
}

export default Sheet_list;