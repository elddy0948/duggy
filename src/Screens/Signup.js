import React from "react";

class Signup extends React.Component{
  render(){
    return (
      <body>
        <div class="container">
          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="col s3" />
                <div class="input-field col s6">
                  <input
                    placeholder="FirstName"
                    id="firstName"
                    type="text"
                    class="validate"
                  ></input>
                </div>
                <div class="col s3" />
              </div>
              <div class="row">
                <div class="col s3" />
                <div class="input-field col s6">
                  <input
                    placeholder="LastName"
                    id="lastName"
                    type="text"
                    class="validate"
                  ></input>
                </div>
                <div class="col s3" />
              </div>
            </form>
          </div>
        </div>
      </body>
    );
  }
}

export default Signup;
