/**
 * @param {Object<string>} params
 * @return {URLSearchParams}
 */
export default function getURLSearchParams(params) {
    const urlSearchParams = new URLSearchParams();

    for (const name in params) {
        urlSearchParams.append(name, params[name]);
    }

    return urlSearchParams;
}
