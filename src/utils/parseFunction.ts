export function parseFunction(fn) {
    if (fn) {
        if (typeof fn === 'string') {
            return new Function(`return ${fn}`)();
        } else if (typeof fn === 'function') {
            return fn;
        } else {
            return new Function();
        }
    }
}
