import React from 'react';
import ReactDom from 'react-router-dom';
import firebase from '../firebase';
import {firestore} from '../firebase';

class Sheet_list extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            SheetList : []
        }
    }

    componentDidMount = () => {
        var list = [];
        var sheetlist = [];
        firestore.collection('SheetList').get()
        .then(res=>{
            res.forEach(doc => {
                list = doc.get('list');
                var i;
                for(i = 0; i<list.length; i++){
                var url = "/album-";
                url += list[i];
                sheetlist.push(<li class = "li1"><a href={url}>{list[i]}</a></li>);
                }
                this.setState({SheetList : sheetlist});
            })
        })
    }

    render(){
        return(
            <ul class = "ul1">{this.state.SheetList}</ul>
        )
    }
}

export default Sheet_list;