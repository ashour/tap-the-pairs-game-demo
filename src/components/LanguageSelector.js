import React, { Component } from 'react';

import fetchLanguages from '../http/fetch-languages';

class LanguageSelector extends Component {
    state = {
        languages: {},
    }

    componentDidMount() {
        fetchLanguages()
            .then(languages => this.setState({ languages }))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="LanguageSelector">
                <label htmlFor="language">LANGUAGE</label>

                {' '}

                <select
                    id="language"
                    value={this.props.value}
                    onChange={e => this.props.onChange(e.target.value)}
                >
                    {Object.keys(this.state.languages).map(code => (
                        <option value={code} key={code}>
                            {this.state.languages[code]}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

export default LanguageSelector;
