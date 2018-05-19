import React, { Component } from 'react';

import categories from '../config/categories';

class CategorySelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories,
        };
    }

    render() {
        return (
            <div className="CategorySelector">
                <label htmlFor="category">CATEGORY</label>

                {' '}

                <select
                    id="category"
                    value={this.props.value}
                    onChange={e => this.props.onChange(e.target.value)}
                >
                    {Object.keys(this.state.categories).map(filename => (
                        <option value={filename} key={filename}>
                            {this.state.categories[filename]}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

export default CategorySelector;
