import React, { Component } from 'react';

import categories from '../config/categories';

class CategorySelector extends Component {
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
                    {Object.keys(categories).map(filename => (
                        <option value={filename} key={filename}>
                            {categories[filename]}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

export default CategorySelector;
