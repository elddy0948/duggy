import React from "react";

import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Album, Login, Signup, Store, Home, Manage } from "./Screens";

import "./sass/materialize.scss";

class App extends React.Component{
  render(){
    return(
      <Router>
      <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo center">
            Duggy-Music
          </a>
          <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/album">ALBUM</Link>
            </li>
            <li>
              <Link to="/store">STORE</Link>
            </li>
          </ul>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <Link to="/login">LOGIN</Link>
            </li>
            <li>
              <Link to="/signup">SIGNUP</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Route exact path="/" component={Home} />
      <Route path="/album" component={Album} />
      <Route path="/store" component={Store} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/manage" component={Manage} />
    </Router>
    )
  };
}

// function App() {
//   return (
    // <Router>
    //   <nav>
    //     <div class="nav-wrapper">
    //       <a href="#" class="brand-logo center">
    //         Duggy-Music
    //       </a>
    //       <ul id="nav-mobile" class="left hide-on-med-and-down">
    //         <li>
    //           <Link to="/">HOME</Link>
    //         </li>
    //         <li>
    //           <Link to="/album">ALBUM</Link>
    //         </li>
    //         <li>
    //           <Link to="/store">STORE</Link>
    //         </li>
    //       </ul>
    //       <ul id="nav-mobile" class="right hide-on-med-and-down">
    //         <li>
    //           <Link to="/login">LOGIN</Link>
    //         </li>
    //         <li>
    //           <Link to="/signup">SIGNUP</Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </nav>
    //   <Route exact path="/" component={Home} />
    //   <Route path="/album" component={Album} />
    //   <Route path="/store" component={Store} />
    //   <Route path="/login" component={Login} />
    //   <Route path="/signup" component={Signup} />
    //   <Route path="/manage" component={Manage} />
    // </Router>
//   );
// }

export default App;
