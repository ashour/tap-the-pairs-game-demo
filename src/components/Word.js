import React, { PureComponent } from 'react';

import './Word.css';

class Word extends PureComponent {
    static defaultProps = {
        order: undefined,
    }

    getStateClasses() {
        const classes = [];

        if (this.props.selected) { classes.push('Word--selected'); }

        if (this.props.completed) {classes.push('Word--completed'); }

        if (this.props.mismatched) {classes.push('Word--mismatched'); }

        return classes.join(' ');
    }

    render() {
        return (
            <span
                style={{ order: this.props.order }}
                onClick={() => this.props.onClick()}
                className={`Word ${this.getStateClasses()}`}
            >
                {this.props.word}
            </span>
        );
    }
}

export default Word;
