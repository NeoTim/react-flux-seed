/**
 * @jsx React.DOM
 */
/**
 * Create by Drew 12/19/2014
 */

var React = require('react');

var Profile = React.createClass({
    render: function () {
        return (
            <div>
                <h2>
                    Profile Page
                </h2>
                <a href="/">Home</a>
            </div>
        );
    }
});

module.exports = Profile;