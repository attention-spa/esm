/**
* Return a remote ESM [JSON module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with#json_modules_type_json).
* @arg url - Full URL of a remote JSON file.
* @arg [importer] - A function that takes a JSON URL and returns a JSON value. Defaults to `fetch(urlToImport).then(res => res.json())`
*/
export async function remoteJsonImport(url: string, importer = async (urlToImport) => fetch(urlToImport).then(res => res.json())){

    const urlType = typeof url;
    const importerType = typeof importer;

    if (!url || urlType !== 'string')
        throw `Expected page to be a non-empty string, not ${urlType}.`;

    if(importerType !== 'function')
        throw `Expected importer to be a function, not ${importerType}.`;

    const jsonValue = await importer(url);
    
    return jsonValue;
};
