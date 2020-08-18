import React from "react";
import "../sass/materialize.scss";
import "../firebase";
import "./Manage.css";
import "../App.css";
import { firestore } from "../firebase";
import Typography from "@material-ui/core/Typography"; 
import jQuery from "jquery";
import $ from 'jquery';
import { withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from 'material-ui/TextField'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ThemeConsumer } from "styled-components";
window.$ = window.jQuery = jQuery;

const url = "https://duggy-music.firebaseio.com";

const styles = theme => ({
  fab:{
    position: 'fixed',
    bottom: '20px',
    right: '20px'
  }
})

class Manage_information extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      sheet : this.props.desc,
      songNameList : [],
      songName : null,
      songUrl : null,
      songId : null,
      discription : 'Write discription this music!'
    };
  }

  _delete(id){
    console.log(this.state.songNameList);
    var i;
    var delete_id;
    
    firestore.collection(this.state.sheet).get()
    .then(res => {
      res.forEach(doc => {
        if(doc.get('songName') === id){
          firestore.collection(this.state.sheet).doc(doc.id).delete()
          .then(()=>{
            alert("삭제완료");
            window.location.reload();
          })
          .catch(error => {
            alert("삭제실패"+error);
            return;
          })
        }
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  handleDelete(id){
    this._delete(id);
  }

  componentDidMount(){

    firestore.collection(this.state.sheet).get().then(res => {

      var doclist = [];
      var doclist2 = [];
      var list = [];
      var idList = [];
  
      res.forEach(doc => {
        let songname = doc.get('songName');
        let songurl = '';
        songurl += doc.get('youtubeURL');
        let real_songurl = songurl.replace("watch?v=", "embed/");
  
        doclist.push(songname);
        doclist2.push(real_songurl);
        idList.push(doc.id);
        list.push(
        <li key = {songname}><ul id = "songName"><Grid item xs={8}>
        {songname}&nbsp;&nbsp;&nbsp;<Button variant="contained" color="primary" onClick={() => this.handleDelete(songname)}>삭제</Button></Grid></ul></li>)
      })
      this.setState({songNameList:list});
      this.setState({songName:doclist[0], songUrl : doclist2[0], songId : idList});
    })

  }

  render(){

    return(

      <ul class = "album_title_list" width = "100">
         {this.state.songNameList}
      </ul>
 
    );
  }

}

class Manage_read_album extends React.Component{

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      admin_album : {},
      mode: '',
    };

  }

  _get(){ 

    fetch(`${url}/album_num.json`).then(res => {
      if(res.status !== 200){
        throw new Error(res.statusText); 
      }
      return res.json(); 
    }).then(admin_album => this.setState({admin_album:admin_album})); 

  }

  
  componentDidMount(){
    this._get();
  }

  handleChange(event) {
    this.setState({mode: event.target.value});
    console.log(event.target.value);
  }

  render(){
  
    var lists = [];
    var data = this.state.admin_album;
    var i = 0;
    while( i < data.length){
      
      if (data[i].id != null) {
        lists.push(<li key = {data[i].id} ><a href = {"/manage"} value = {data[i].id} onClick = {this.handleChange} > {data[i].id}번 앨범 </a></li>)
      }
      i = i + 1;
    }

    return(
        <ul>
          {lists}
        </ul>
    );
  }
}



class Manage extends React.Component{

  constructor(){
    super();
    this.handlemodeChange = this.handlemodeChange.bind(this);
    this.state = {
      admin_album : {},
      album_information : {},
      mode: 'welcome',
      page: '1',

      words:{},
      dialog: false,
      information:'',
      upload_file_name:'',
      upload_file_type:'',

    }

  }

  _post(information) {

    firestore.collection(this.state.page + "Sheet").doc().set({
      songName: information.upload_file_name,
      youtubeURL: "aaaa",
    })
    .then(() => {
      window.location.reload();
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });

  }

  handlemodeChange = (mode) => {
    this.setState({mode: mode});
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState.admin_album != this.state.album_album;
  }

  componentDidMount(){

    $(document).ready(function($){
      $(".button-collapse").sidenav({
        menuWidth: 275
      });
      $('.collapsible').collapsible();
    });
    
  }

  handleDialogToggle = () => this.setState({
    dialog: !this.state.dialog
  })

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleSubmit = () => {

    const information = {
      upload_file_type : this.state.upload_file_type,
      upload_file_name : this.state.upload_file_name,
    }
    this.handleDialogToggle();
    if(!information.upload_file_name && !information.upload_file_type) return;
    this._post(information);
  }


  render(){

    var sheet = "Sheet";
    const {classes} = this.props;

    return (
      <body class ="wrapping">
        {/* <nav>
          <a href ="#" data-target = "slide-out" class = "sidenav-trigger show-on-large">
            <i class = " material-icons">menu</i></a>            
        </nav> */}
        
          <ul id ="slide-out" class="sidenav sidenav-fixed">
            <ul class="collapsible collapsible-expandable">

              <li><a class="collapsible-header">Song<i class="material-icons right">arrow_drop_down</i></a>
                <div class ="collapsible-body" >
                  <Manage_read_album onClick = {this.handlemodeChange}></Manage_read_album>
                </div>
              </li>
            
            </ul>
          </ul>

          <Manage_information desc = {this.state.page + sheet}></Manage_information>

          <MuiThemeProvider>
          <Fab color= "primary" className ={classes.fab} onClick={this.handleDialogToggle}><AddIcon/></Fab>
          <Dialog open={this.state.dialog} onClose = {this.handleDialogToggle}>
            <DialogTitle >파일 업로드</DialogTitle>
            <DialogContentText>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;다음 정보를 기입해 주십시오.
            </DialogContentText>
            <DialogContent>
              <TextField autofocus label = "파일타입" type ="text" name="upload_file_type" value={this.state.upload_file_type} onChange={this.handleValueChange} /><br />
              <TextField autofocus label = "파일이름" type ="text" name="upload_file_name" value={this.state.upload_file_name} onChange={this.handleValueChange} /><br />
            </DialogContent>
            <DialogActions>
              <Button variant ="contained" color="primary" onClick = {this.handleSubmit}>추가</Button>
              <Button variant ="outlined" color="primary" onClick ={this.handleDialogToggle}>닫기</Button>
            </DialogActions>
          </Dialog>
          </MuiThemeProvider>

      </body>
    );
  }
}

export default withStyles(styles)(Manage);

 {/* <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a> */}
