import React, { Component } from 'react';

import './Game.css';
import http from '../http';
import Pair from '../models/Pair';
import GameHeader from './GameHeader';
import TapThePairs from './TapThePairs';
import CategorySelector from './CategorySelector';
import LanguageSelector from './LanguageSelector';
import fetchTranslations from '../http/fetch-translations';

class Game extends Component {
    state = {
        pairs: [],
        selectedLanguage: 'fr',
        selectedCategory: 'basics-1',
    }

    componentDidMount() {
        this.fetchTranslations();
    }

    fetchTranslations() {
        let _words = [];

        http.get(`/categories/${this.state.selectedCategory}.json`)
            .then(({ data: { words } }) => {
                _words = words;

                return fetchTranslations(words, {
                    from: 'en', to: this.state.selectedLanguage });
            })
            .then((translations) => {
                const pairs = _words.map((word, i) =>
                    new Pair(word, translations[i]));

                this.setState({ pairs });
            })
            .catch(error => console.log(error));
    }

    selectLanguage(langCode) {
        this.setState({ selectedLanguage: langCode }, () =>
            this.fetchTranslations());
    }

    selectedCategory(category) {
        this.setState({ selectedCategory: category }, () => this.fetchTranslations());
    }

    render() {
        return (
            <div className="Game">
                <GameHeader />

                <div className="Game__controls">
                    <h2 className="Game__controls__header">
                        What do you want to learn?
                    </h2>

                    <LanguageSelector
                        value={this.state.selectedLanguage}
                        onChange={langCode => this.selectLanguage(langCode)}
                    />

                    <CategorySelector
                        value={this.state.selectedCategory}
                        onChange={category => this.selectedCategory(category)}
                    />
                </div>

                <TapThePairs pairs={this.state.pairs} />
            </div>
        );
    }
}

export default Game;
