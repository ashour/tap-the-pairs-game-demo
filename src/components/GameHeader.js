import React, { Component } from 'react';

import './GameHeader.css';
import logoImage from '../assets/Logo.svg';

class GameHeader extends Component {
    render() {
        return (
            <div className="GameHeader">
                <img src={logoImage} className="GameHeader__logo"/>

                <div>
                    <p className="GameHeader__lead">
                        Tap the Pairs is a word-matching game designed to help you learn a new
                        language. It's inspired by <a href="https://www.duolingo.com/">Duolingo's</a>
                        {' '}“Tap the pairs” minigame.
                    </p>

                    <p className="GameHeader__info">
                        This game was made as a demo for a <a href="#">PhraseApp Blog article</a> and is
                        released under the MIT license. It was made with <a href="https://reactjs.org/">React.</a>
                        {' '}Check out the source code <a href="#">on Github</a>. Happy coding {' '}
                        <code>:)</code>
                    </p>
                </div>
            </div>
        );
    }
}

export default GameHeader;
