/** @jsx React.DOM*/
/**
 * Created by Andrew Laiff on 11.07.14.
 */
'use strict';

var React = require('react/addons');

function createIcon(type) {
    var iconType = type;
    return React.createClass({
        render: function () {
            var type = iconType || this.props.type;
            var cs = React.addons.classSet;
            var classes = {
                'fa': true,
                'fa-spin': this.props.spin,
                'fa-fw': this.props.fixedWidth,
                'fa-li': this.props.li,
                'fa-border': this.props.border
            };
            classes['fa-' + type] = type;
            classes['fa-' + this.props.size] = this.props.size;
            classes['fa-rotate-' + this.props.rotate] = this.props.rotate;
            classes['fa-flip-' + this.props.flip] = this.props.flip;
            classes['fa-stack-' + this.props.stack] = this.props.stack;
            classes['fa-align-' + this.props.align] = this.props.align;

            var className = cs(classes) + " " + (this.props.className || '');

            return (
                <i className={className}>this.props.children</i>
                );
        }
    });
}

var IconStack = React.createClass({
    render: function () {
        var cs = React.addons.classSet;
        var classes = {
            'fa-stack': true
        }
        classes['fa-' + this.props.size] = this.props.size;

        var className = cs(classes) + " " + (this.props.className || '');

        return (
            <span className={className}>this.props.children</span>
            );
    }
});

var Ul = React.createClass({
    render: function () {
        var cs = React.addons.classSet;
        var classes = {
            'fa-ul': true
        }
        var className = cs(classes) + " " + (this.props.className || '');

        return (
            <ul className={className}>this.props.children</ul>
            );
    }
});

var Icon = createIcon();

var Animate = React.createClass({
    getInitialState: function () {
        return {
            childCount: 0,
            child: <span />
        };
    },
    componentWillMount: function () {
        if (this.props.children) {
            this.timer = setInterval(function () {
                var newChild = this.state.childCount + 1;
                if (this.props.children.length <= newChild) {
                    newChild = 0;
                }
                this.setState({
                    childCount: newChild,
                    child: this.props.children[newChild]
                });
            }.bind(this), this.props.interval || 1000);

            this.setState({
                child: this.props.children[0]
            });
        }
    },
    componentWillUnmount: function () {
        clearInterval(this.timer);
    },
    render: function () {
        return this.state.child;
    }
});

module.exports = {
    Icon: Icon,
    Ul: Ul,
    IconStack: IconStack,
    Animate: Animate
};