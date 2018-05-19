import startsWith from 'lodash/startsWith';

import http from './index';
import translationApiKey from '../config/translation-api-key';

/**
 * @param {string} [from = 'en']
 * @returns {Promise<Array>}
 */
export default function fetchLanguages(from = 'en', options) {
    return http.postWithFormUrlEncoded(
        'https://translate.yandex.net/api/v1.5/tr.json/getLangs',
        {
            key: translationApiKey,
            ui: from,
        },
    )
    .then(response => response.data)
    .then(({ dirs, langs }) => {
        // Translation languages that the API supports
        // translating _to_ given our _from_ language.
        const supportedToLanguages = [];

        // Supported directions e.g. from English to Spanish
        // represented as 'en-es'.
        dirs.filter(dir => startsWith(dir, `${from}-`))
            // 'en-es' becomes 'es'
            .map(supported => supported.split('-')[1])
            // 'es' becomes { code: 'es', name: 'Spansish' }
            .map(code => supportedToLanguages.push({ code, name: langs[code] }));

        return Promise.resolve(supportedToLanguages);
    });
}
