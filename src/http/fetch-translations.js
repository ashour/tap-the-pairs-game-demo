import http from './index';
import translationApiKey from '../config/translation-api-key';

/**
 * @param {Array<string>} sources
 * @param {Object} options
 * @param {string} [options.from='en']
 * @param {string} options.to
 * @returns {Promise<Array<string>>}
 */
export default function fetchTranslations(sources, options) {
    const opt = { ...options };

    if (!opt.from) { opt.from = 'en' };

    const requests = sources.map(source => http.postWithFormUrlEncoded(
        'https://translate.yandex.net/api/v1.5/tr.json/translate',
        {
            key: translationApiKey,
            lang: `${opt.from}-${opt.to}`,
            text: source,
        },
    ));

    return Promise.all(requests)
        .then(responses => responses.map(r => r.data))
        .then(translationObjects => translationObjects.map(t => t.text[0]));
}
