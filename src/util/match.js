export default function match(string, query) {
    try {
        if (new RegExp(query).exec(string)) {
            return true;
        }
    } catch(err) {}

    return false;
}
