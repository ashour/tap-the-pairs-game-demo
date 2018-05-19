import orderBy from 'lodash/orderBy';
import React, { Component } from 'react';

import fetchLanguages from '../http/fetch-languages';

class LanguageSelector extends Component {
    state = {
        languages: [],
    }

    componentDidMount() {
        fetchLanguages()
            .then((languages) => {
                const sorted = orderBy(languages, 'name');

                this.setState({ languages: sorted });
            })
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
                    {this.state.languages.map(({ code, name }) => (
                        <option value={code} key={code}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

export default LanguageSelector;
