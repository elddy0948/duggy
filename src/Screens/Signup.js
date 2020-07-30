import React from "react";
import '../App.css';

class Signup extends React.Component{



  render(){
    return (
      <body>
        <h5 id = "SignUpTitle">Join Duggy-Music</h5>
        <h3 id = "SignUpTitle2">Create your account</h3>
        <div class="container" id = "SignUpBody">
          <div class="row">

            <form class="col s12">

            <div class="row">
                <div class="col s3" />
                <div class="input-field col s6" id = "SignUpinput">
                  {/* <font color = "gray">UserName</font>&nbsp;<font color = "red">*</font> */}
                  이게 userName이 위로 안올라가 씨바! 좀 고쳐봐 씨바!
                  <input
                    placeholder=""
                    id="userName"
                    type="text"
                    class="validate"/>
                    <label for = "userName">UserName</label>
                </div>
                <div class="col s3" />
              </div>
              
              <div class="row">
                <div class="col s3" />
                <div class="input-field col s6" id = "SignUpinput">
                <font color = "gray">UserID</font>&nbsp;<font color = "red">*</font>
                  <input
                    placeholder="Write Sign Up ID"
                    id="userID"
                    type="text"
                    class="validate"/>
                </div>
                <div class="col s3" />
              </div>
            
              <div class="row">
                <div class="col s3" />
                <div class="input-field col s6" id = "SignUpinput">
                <font color = "gray">Password</font>&nbsp;<font color = "red">*</font>
                  <input
                    placeholder="Write password"
                    id="password"
                    type="password"
                    class="validate"/>
                </div>
                <div class="col s3" />
              </div>

              <div class="row" id = "SignUpBtn">
                <div class="col s4" />
                <div class="col s4">
                  <button
                    class="waves-effect waves-light btn-large col s12"
                    type = "submit"
                    > create! </button>
                </div>
                <div class="col s4" />
              </div>

            </form>

          </div>
        </div>
      </body>
    );
  }
}

export default Signup;
