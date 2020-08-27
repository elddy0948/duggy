import React from "react";
import "../sass/materialize.scss";
import "../firebase";
import "./Manage.css";
import "../App.css";
import { firestore } from "../firebase";
import { storage } from "../firebase";
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from 'material-ui/TextField'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ThemeConsumer } from "styled-components";
import M from 'materialize-css';
window.$ = window.jQuery = jQuery;

const url = "https://duggy-music.firebaseio.com";

const styles = theme => ({
  fab:{
    position: 'fixed',
    bottom: '20px',
    right: '20px'
  },
  root: {
    '& > *': {
      margin: theme.spacing(3),
    },
  },
  input: {
    display: 'none',
  },
  scroll:{
    overflow : 'hidden',
  }
})

class Manage_information extends React.Component{

  constructor(props){ 
    super(props);
    this.state = {
      sheet : this.props.desc,
      sheet_type : this.props.type_val,
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

  _filedelete(id){

    console.log(id);
    var desertRef = storage.ref(`Music/${id + ".mp3"}`);
    desertRef.delete().then(function() {
    }).catch(function(error) {
    });
    
  }

  handleDelete(id){
    this._delete(id);
    this._filedelete(id);
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
        <li key = {songname}><ul id = "songName"><Grid item xs={8} container alignItems="flex-start" justify="flex-end" direction="row">
        {songname}&nbsp;&nbsp;&nbsp;<Button size="small"  variant="contained" color="secondary" onClick={() => this.handleDelete(songname)}>삭제
        </Button></Grid></ul></li>)
      })
      this.setState({songNameList:list});
      this.setState({songName:doclist[0], songUrl : doclist2[0], songId : idList});
    })

  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.desc !== prevProps.desc){
        this.setState({sheet:this.props.desc});
        this.setState({sheet_type: this.props.type_val});
        firestore.collection(this.props.desc).get().then(res => {

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
              <li key = {songname}><ul id = "songName"><Grid item xs={8} >
              {songname}&nbsp;&nbsp;&nbsp;<Button size="small" variant="contained" color="secondary" onClick={() => this.handleDelete(songname)}>삭제</Button></Grid></ul></li>)
            })
            this.setState({songNameList:list});
            this.setState({songName:doclist[0], songUrl : doclist2[0], songId : idList});
          })
    }
}
  render(){
   
    if(this.state.sheet_type == "sheet") {
      
      return(

      <ul class = "album_title_list" width = "100">
         {this.state.songNameList}
      </ul>
 
      );
    }

    else if(this.state.sheet_type == "score") {
      
      return(

      <ul class = "album_title_list" width = "100">
         score
      </ul>
 
      );
    }

    return(

      <ul class = "album_title_list" width = "100">
         welcome
      </ul>
 
      );
    }
}

class Manage extends React.Component{

  constructor(){
    super();
    this.state = {
      admin_album : [],
      admin_score :[],
      album_information : {},
      sheet : 'welcome',
      sheet_type : '',

      words:{},
      dialog: false,
      information:'',
      upload_file_name:'',
      upload_file_type:'',
      upload_file_infor: '',

      up_file: null,
      url: '',
      progress: 0,
      B_C: "primary",
      B_C2: "primary",
    }

    this.handleUploadChange = this.handleUploadChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }

  _post(information) {

    firestore.collection(this.state.sheet).doc().set({
      songName: information.upload_file_name,
      youtubeURL: information.upload_file_infor,
    })
    .then(() => {
      window.location.reload();
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });

  }

  _alblum_plus(page2, page){

    firestore.collection('SheetList').get()
    .then(res =>{
      res.forEach(doc => {
        var list = doc.get('list');
        var list2 = doc.get('score_list');
        list.push(page);
        list2.push(page2);
        firestore.collection('SheetList').doc('list').set({
          list: list,
          score_list: list2
        })
        .then(() => {
          window.location.reload();
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      })
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState.admin_album != this.state.album_album;
  }

  componentDidMount(){

     //side-nav sheet-list
     firestore.collection('SheetList').get()
     .then(res => {
       res.forEach(doc => {
         var sheetlist = [];
         var score_album_list =[];
         var list = doc.get('list');
         var list2 = doc.get('score_list');
         var i;
    
         list.forEach(e => {
           sheetlist.push(<li><a href = "#" onClick = {() => this.sheet_change(e)}>{e[0]+"번째 앨범"}</a></li>)
         });

         list2.forEach(e => {
          score_album_list.push(<li><a href = "#" onClick = {() => this.sheet_change2(e)}>{e[0]+"번째 앨범"}</a></li>)
        });
 
         this.setState({admin_album : sheetlist});
         this.setState({admin_score : score_album_list});
       })

       // side-nav jquery
       $(document).ready(function(){
         $(".button-collapse").sidenav({
           menuWidth: 275
         });
         $('.collapsible').collapsible();
       });
     })

   }
 
   sheet_change(sheetnum){
     this.setState({sheet : sheetnum, sheet_type : "sheet"});
  }

  sheet_change2(sheetnum){
    this.setState({sheet : sheetnum, sheet_type : "score"});
 }

  handleDialogToggle = () => {
    this.setState({
    dialog: !this.state.dialog,
    up_file: '',
    B_C2: "primary",
    progress: 0,
    })
    if(this.state.up_file == ''){
      this.setState({B_C: "primary"});
    }
}

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handletypechange = (e) =>{
    this.setState({upload_file_type: e.target.value});
  }

  handleSubmit = () => {

    var val = this.state.admin_album.length;
    var temp = 0;
    temp = parseInt(val);
    temp++;
    val = String(temp);
    var val2 = val;
    val = val + "Score";
    val2 = val2 + "Sheet";
    const information = {
      upload_file_type : this.state.upload_file_type,
      upload_file_name : this.state.upload_file_name,
      upload_file_infor : this.state.upload_file_infor,
    }
    this.handleDialogToggle();
    if(information.upload_file_type == "album") this._alblum_plus(val, val2);
    else if(!information.upload_file_name && !information.upload_file_type && !information.upload_file_infor && !information.upload_file) return;
    else if (information.upload_file_type == "song") this._post(information);
    else if(information.upload_file_type == "score");
  }

  handleUploadChange = e => {
    console.log(e.target.files);
    if(e.target.files[0]){
      const up_file = e.target.files[0];
      this.setState(() => ({up_file}));
      this.setState({B_C: "secondary"});
    }
  };

  handleUpload = e => {

    const {up_file} = this.state;
    console.log(up_file);
    const uploadTask = storage.ref(`Music/${up_file.name}`).put(up_file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if(progress == 100) {
          this.setState({B_C2: "secondary"});
          this.setState({progress});
        }
        this.setState({progress});
      },
      error =>{
        console.log(error);
      },
      () => {
        storage.ref('Music')
        .child(up_file.name)
        .getDownloadURL()
        .then(url => {
            this.setState({B_C: "primary"});
            console.log(url);
            console.log("success");
            this.setState({up_file: ''});
        });

      }
    )
  }

  render(){

    const {classes} = this.props;
    return (
      <body class ="wrapping">
        {/* <nav>
          <a href ="#" data-target = "slide-out" class = "sidenav-trigger show-on-large">
            <i class = " material-icons">menu</i></a>            
        </nav> */}
        
        <ul id ="slide-out" class="sidenav sidenav-fixed">
            <ul class="collapsible collapsible-expandable">

              <li>
                <a class="collapsible-header">Song<i class="material-icons right">arrow_drop_down</i></a>
                <div class = "collapsible-body">
                  {this.state.admin_album}
                </div>
              </li>

              <li>
                <a class="collapsible-header">Score<i class="material-icons right">arrow_drop_down</i></a>
                <div class = "collapsible-body">
                  {this.state.admin_score}
                </div>
              </li>
            
            </ul>
          </ul>

          <Manage_information desc = {this.state.sheet} type_val = {this.state.sheet_type}></Manage_information>

          {

          this.state.sheet != "welcome" ?
          <MuiThemeProvider>
          <Fab color= "primary" className ={classes.fab} onClick={this.handleDialogToggle}><AddIcon/></Fab>
          <Dialog open={this.state.dialog} onClose = {this.handleDialogToggle}>
            <DialogTitle >파일 업로드</DialogTitle>
            <DialogContentText>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;다음 정보를 기입해 주십시오.
            </DialogContentText>
            
            <DialogContent className ={classes.scroll}>
              <InputLabel>파일타입</InputLabel>
              <Select
                autoFocus
                val={this.props.value}
                onChange={this.handletypechange}
              >
                <MenuItem value="album">앨범</MenuItem>
                <MenuItem value="song">곡</MenuItem>
                <MenuItem value="score">악보</MenuItem>
              </Select><br /><br />
            </DialogContent>

              {
              (this.state.upload_file_type == "album") ?
              <div>
              </div>
              :
              (this.state.upload_file_type == "song") ?
              <DialogContent className ={classes.scroll}>
              <InputLabel>파일이름</InputLabel>
              <TextField autofocus type ="text" name="upload_file_name" value={this.state.upload_file_name} onChange={this.handleValueChange} /><br /><br />
              <InputLabel>URL</InputLabel>
              <TextField autofocus type ="text" name="upload_file_infor" value={this.state.upload_file_infor} onChange={this.handleValueChange} /><br /><br />

              <div className={classes.root}>
              <progress value ={this.state.progress} max = "100" /> <br/>
               <input
                accept="audio/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange = {this.handleUploadChange}
               />
                <label htmlFor="contained-button-file" >
                <Button variant="contained" color="primary" component="span"> Choose </Button>
                </label>
                <Button variant="contained" color={this.state.B_C} component="span" onClick = {this.handleUpload}> Upload </Button>
              </div>
              </DialogContent>
              :
              
              (this.state.upload_file_type == "score") ?
              <DialogContent className ={classes.scroll}>
              <InputLabel>파일이름</InputLabel>
              <TextField autofocus type ="text" name="upload_file_name" value={this.state.upload_file_name} onChange={this.handleValueChange} /><br /><br />
              <InputLabel>기타정보</InputLabel>
              <TextField autofocus type ="text" name="upload_file_infor" value={this.state.upload_file_infor} onChange={this.handleValueChange} /><br /><br />

              <div className={classes.root}>
              <progress value ={this.state.progress} max = "100" /> <br/>
               <input
                accept=".pdf"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange = {this.handleUploadChange}
               />
                <label htmlFor="contained-button-file" >
                <Button variant="contained" color="primary" component="span"> Choose </Button>
                </label>
                <Button variant="contained" color={this.state.B_C} component="span" onClick = {this.handleUpload}> Upload </Button>
              </div>
              </DialogContent>
              :
              <div>
              </div>
              }

            <DialogActions>
              <Button variant ="contained" color={this.state.B_C2} onClick = {this.handleSubmit}>추가</Button>
              <Button variant ="outlined" color="primary" onClick ={this.handleDialogToggle}>닫기</Button>
            </DialogActions>
          </Dialog>
          </MuiThemeProvider>
          :
          <div></div>
          }

      </body>
    );
  }
}

export default withStyles(styles)(Manage);

 {/* <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a> */}
