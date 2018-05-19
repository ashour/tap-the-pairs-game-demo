import shuffle from 'lodash/shuffle';
import React, { Component } from 'react';

import Word from './Word';
import './TapThePairs.css';

class TapThePairs extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.pairs !== prevState.pairs) {
            return { pairs: nextProps.pairs, wordOrder: [] };
        }

        return null;
    }

    constructor(props) {
        super(props);

        this.state = {
            wordOrder: [],
            pairs: props.pairs,
            prevSelection: null,
        };
    }

    componentDidMount() {
        if (this.state.pairs.length > 0) {
            this.generateRandomWordOrder();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.pairs !== prevProps.pairs) {
            this.generateRandomWordOrder();
        }
    }

    /**
     * Generate the random order of words for the play round
     */
    generateRandomWordOrder() {
        const order = [];

        const wordCount = this.state.pairs.length * 2;

        for (let i = 1; i <= wordCount; i += 1) {
            order.push(i);
        }

        this.setState({ wordOrder: shuffle(order) });
    }

    /**
     * Get ordering for word in the current play round
     *
     * @param {number} pairIndex
     * @param {string} wordKey 'first' | 'second'
     */
    getOrder(pairIndex, wordKey) {
        const wordIndex = (pairIndex * 2) + (wordKey === 'first' ? 0 : 1);

        return this.state.wordOrder[wordIndex];
    }

    /**
     * @param {number} pairIndex
     * @param {string} wordKey 'first' | 'second'
     */
    attemptPairing(pairIndex, wordKey) {
        const { pairs } = this.state;
        let { prevSelection } = this.state;

        const pair = pairs[pairIndex];

        if (pair.completed) { return; }

        if (prevSelection &&
            prevSelection.pair[prevSelection.wordKey] === pair.get(wordKey)) {
            return;
        }

        pair.toggleSelected(wordKey);

        if (prevSelection === null) {
            // fresh start, new pairing attempt
            pairs.forEach((pair) => {
                pair.clearMismatch('first');
                pair.clearMismatch('second');
            });

            prevSelection = { pair, wordKey };
        } else {
            // we've attempted a pairing
            if (pair.other(wordKey).selected) {
                // success
                pair.markCompleted();
            } else {
                // oops, incorrect pairing
                prevSelection.pair.setMismatch(prevSelection.wordKey);

                pair.setMismatch(wordKey);
            }

            // start fresh on the next word selection
            prevSelection = null;
        }

        this.setState({ pairs, prevSelection });
    }

    render() {
        return (
            <div className="TapThePairs">
                <h2 className="TapThePairs__header">Tap (Or Click) Matching Pairs</h2>

                <div className="TapThePairs__words">
                    {this.state.pairs.map(({ first, second, completed }, i) => (
                        <React.Fragment key={`${first.word}-${second.word}`}>
                            <Word
                                word={first.word}
                                completed={completed}
                                selected={first.selected}
                                mismatched={first.mismatched}
                                order={this.getOrder(i, 'first')}
                                onClick={() => this.attemptPairing(i, 'first')}
                            />

                            <Word
                                word={second.word}
                                completed={completed}
                                selected={second.selected}
                                mismatched={second.mismatched}
                                order={this.getOrder(i, 'second')}
                                onClick={() => this.attemptPairing(i, 'second')}
                            />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    }
}

export default TapThePairs;
