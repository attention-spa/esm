export async function importRemoteJson(url: string){

    const urlType = typeof url;

    if (!url || urlType !== 'string')
        throw `Expected page to be a non-empty string, not ${urlType}.`;

    const { default: urlValue } = await import(url, { with: { type: 'json' } });

    return urlValue;

};
