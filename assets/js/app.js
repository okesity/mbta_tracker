// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
import "phoenix_html";
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery; // Bootstrap requires a global "$" object.
import "bootstrap";
import _ from "lodash";


// class App extends Component {
//   render(){
//     return(<div className="fluid-container">
//     <Login></Login></div>);
//   }
// }

//ReactDOM.render(<App /> , document.getElementById('root'));



// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import root_init from "./root";

$(() => {
  let node = $('#root')[0];
  root_init(node);
});
