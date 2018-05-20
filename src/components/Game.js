import React, { Component } from 'react';

import './Game.css';
import http from '../http';
import Header from './Header';
import Pair from '../models/Pair';
import TapThePairs from './TapThePairs';
import CategorySelector from './CategorySelector';
import LanguageSelector from './LanguageSelector';
import fetchTranslationsFromApi from '../http/fetch-translations';

class Game extends Component {
    state = {
        pairs: [],
        words: [],
        selectedLanguage: 'fr',
        selectedCategory: 'basics-1',
    }

    componentDidMount() {
        this.fetchWordsAndTranslations();
    }

    fetchWordsAndTranslations() {
        http.get(`/categories/${this.state.selectedCategory}.json`)
            .then(({ data: { words } }) => {
                this.setState({ words }, () => this.fetchTranslations());
            })
            .catch(error => console.log(error));
    }

    fetchTranslations() {
        fetchTranslationsFromApi(
            this.state.words,
            { from: 'en', to: this.state.selectedLanguage }
        )
        .then((translations) => {
            const pairs = this.state.words.map((word, i) =>
                new Pair(word, translations[i]));

            this.setState({ pairs });
        })
        .catch(error => console.log(error));
    }

    /**
     * @param {string} langCode
     */
    selectLanguage(langCode) {
        this.setState({ selectedLanguage: langCode }, () =>
            this.fetchTranslations());
    }

    /**
     * @param {string} category
     */
    selectedCategory(category) {
        this.setState({ selectedCategory: category }, () =>
            this.fetchWordsAndTranslations());
    }

    render() {
        return (
            <div className="Game">
                <Header />

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
