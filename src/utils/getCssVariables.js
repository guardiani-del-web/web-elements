import checkboxData from '../../custom-elements.json';

export function getCssVariables (tag, color, text) {
    const element = checkboxData.components.find(item => item.tag === tag);
    return element.styles.reduce((acc, style) => {
        const { name, docs } = style;
        const isColor = name.includes('color');
        let defaultValue = docs.substring(docs.indexOf('Default'), docs.length);
        defaultValue = defaultValue.replace('Default:', '').trim();
      
        if (isColor) {
          return `${acc} \n ${name}: ${color(name, defaultValue)};`;
        } else if (!defaultValue.includes('\\')) {
          return `${acc} \n ${name}: ${text(name, defaultValue)};`;
        }
        return acc;
    }, '');
}