/**
 * @jsx React.DOM
 */
/**
 * Created by Drew 12/17/2014
 */

var React = require('react'),
    RouterMixin = require('react-mini-router').RouterMixin,
    Home = require('./components/Home.jsx'),
    Profile = require('./components/Profile.jsx');

var App = React.createClass({
    mixins: [
        RouterMixin
    ],

    routes: {
        '/': 'home',
        '/profile': 'profile'
    },

    render: function () {
        console.log('App.render');
        return (
            <div>
              {this.renderCurrentRoute()}
            </div>
        );
    },

    home: function () {
        console.log('App.home');
        return React.createElement(Home);
    },

    profile: function () {
        console.log('App.profile');
        return React.createElement(Profile);
    },

    notFound: function (path) {
        return (
            <div>Path not found: {path}</div>
        );
    }
});

module.exports = App;