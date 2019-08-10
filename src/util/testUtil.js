import jsdom from 'jsdom';


export const setUpDomEnvironment = () => {
    const { JSDOM } = jsdom;
    const DOM = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/' });
    const { window } = DOM;

    global.window = window;
    global.document = window.document;
    global.navigator = {
        userAgent: 'node.js',
    };
    copyProps(window, global);
}

const copyProps = (src, target) => {
    const props = Object.getOwnPropertyNames(src)
                    .filter(prop => typeof target[prop] === 'undefined')
                    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
    Object.defineProperties(target, props);
}