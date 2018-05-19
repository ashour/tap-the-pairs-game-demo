class Pair {
    /**
     * @param {string} first
     * @param {string} second
     */
    constructor(first, second) {
        this.first = { word: first, selected: false, mismatched: false };
        this.second = { word: second, selected: false, mismatched: false };

        this.completed = false;
    }

    /**
     * Retrieve a word
     *
     * @param {string} key 'first' | 'second'
     * @return {Object}
     */
    get(key) {
        return this[key];
    }

    /**
     * Toggle the selected state of a word
     *
     * @param {string} key 'first' | 'second'
     */
    toggleSelected(key) {
        this[key].selected = !this[key].selected;
    }

    /**
     * Get the other word in the pair
     *
     * @param {string} key 'first' | 'second'
     * @return {Object}
     */
    other(key) {
        if (key === 'first') { return this.second; }

        return this.first;
    }

    /**
     * Mark this pair as successfully completed
     */
    markCompleted() {
        this.clearMismatch('first');
        this.clearMismatch('second');

        this.completed = true;
    }

    /**
     * Mark word as mistmatched to a word in a different pair
     *
     * @param {string} key 'first' | 'second'
     */
    setMismatch(key) {
        this[key].mismatched = true;
        this[key].selected = false;
    }

    /**
     * Clear the mistmatch state of this word
     *
     * @param {string} key 'first' | 'second'
     */
    clearMismatch(key) {
        this[key].mismatched = false;
    }
}

export default Pair;