/**
* Return a remote ESM [JSON module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with#json_modules_type_json).
* @arg url - Full URL of a remote JSON file.
*/
export async function remoteJsonImport(url: string){

    const urlType = typeof url;

    if (!url || urlType !== 'string')
        throw `Expected page to be a non-empty string, not ${urlType}.`;

    const { default: urlValue } = await import(url, { with: { type: 'json' } });

    return urlValue;

};
