const ids = {};

export default function newid(prefix='id') {
    if (typeof ids[prefix] === 'undefined') {
        ids[prefix] = 0;
    }
    ids[prefix]++;

    return `${prefix}${ids[prefix]}`;
}
