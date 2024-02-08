module.exports = (css)=> {

    while ((open = css.indexOf("/*")) !== -1 &&
        (close = css.indexOf("*/")) !== -1) {
        css = css.substring(0, open) + css.substring(close + 2);
    }

    let json = {};

    while (css.length > 0) {
        const lbracket = css.indexOf('{');
        const rbracket = css.indexOf('}');

        function toObject(array) {
            let ret = {};
            array.forEach(e => {
                const index = e.indexOf(':');
                const property = e.substring(0, index).trim();
                const value = e.substring(index + 1).trim();
                ret[property] = value;
            });
            return ret;
        }

        let declarations = css.substring(lbracket + 1, rbracket)
            .split(";")
            .map(e => e.trim())
            .filter(e => e.length > 0); 
        declarations = toObject(declarations);

        let selectors = css.substring(0, lbracket)
            .split(",")
            .map(selector => selector.trim());

        selectors.forEach(selector => {
            if (!json[selector]) json[selector] = {};
            Object.keys(declarations).forEach(key => {
                json[selector][key] = declarations[key];
            });
        });

        css = css.slice(rbracket + 1).trim();
    }
    
    return json;
}

function json2css(json) {
    return JSON.
    stringify(json,4).
    slice(1, JSON.stringify(json).length - 1).
    replace(new RegExp(',', 'gm'), '  ').
    replace(new RegExp('"', 'gm'), '').
    replace(/:{/ig, "{")
}
