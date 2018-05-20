import React, { Component } from 'react';

import './Header.css';
import logoImage from '../assets/Logo.svg';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <img src={logoImage} className="Header__logo"/>

                <div>
                    <p className="Header__lead">
                        Tap the Pairs is a word-matching game designed to help you learn a new
                        language. It's inspired by <a href="https://www.duolingo.com/">Duolingo's</a>
                        {' '}“Tap the pairs” minigame.
                    </p>

                    <p className="Header__info">
                        This game was made as a demo for a <a href="#">PhraseApp Blog article</a> and is
                        released under the <a href="https://github.com/ashour/tap-the-pairs-game-demo/blob/master/LICENSE">MIT license</a>.
                        It was made with <a href="https://reactjs.org/">React.</a> Check out the source code{' '}
                        <a href="https://github.com/ashour/tap-the-pairs-game-demo">on Github</a>.
                        Happy coding <code>:)</code>
                    </p>
                </div>
            </div>
        );
    }
}

export default Header;
