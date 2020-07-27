import React from "react";
import "../sass/materialize.scss";

function Login() {
  return (
    <body>
      <div class="container">
        <div class="row" />
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="col s3" />
              <div class="input-field col s6">
                <input
                  placeholder="Email"
                  id="email"
                  type="email"
                  class="validate"
                />
              </div>
              <div class="col s3" />
            </div>
            <div class="row">
              <div class="col s3" />
              <div class="input-field col s6">
                <input
                  placeholder="Password"
                  id="password"
                  type="password"
                  class="validate"
                />
              </div>
              <div class="col s3" />
            </div>
            <div class="row">
              <div class="col s4" />
              <div class="col s4">
                <button
                  class="waves-effect waves-light btn-large col s12"
                  type="submit"
                  name="action"
                >
                  로그인
                </button>
              </div>
              <div class="col s4" />
            </div>
          </form>
        </div>
      </div>
    </body>
  );
}
export default Login;
