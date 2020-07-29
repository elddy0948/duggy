import React from 'react'

class Login_check extends React.Component{
    constructor(){
        super();
        this.state = {
          requestID : '',
          requestPW : ''
        };
    }
    
    _get(){
        var userInfo = {
            'userID' : this.state.requestID,
            'userPW' : this.state.requestPW
          }
        fetch('/Login_check',{
          method:'POST',
          body : JSON.stringify(userInfo),
          headers : {'Content-Type':'application/json'}
          }).then(res => res.json())
          .then(resData => {
              this.setState({requestID : '', requestPW : ''});
          })
    }

    componentDidMount(){
        this._get();
        console.log(this.userInfo);
    }

    render(){
        return(
            <div>test Login_check</div>
        )
    }
}

export default Login_check;