/**
 * @jsx React.DOM
 */
/**
 * Created by Drew 12/18/2014
 */

var React = require('react');
var App = require('./App.jsx');

React.render(React.createElement(App, {history: true}), document.getElementById("App"));
