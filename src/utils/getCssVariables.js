import componentsData from '../../custom-elements.json';

export function getCssVariables (tag, color, text) {
  const knobsGroupId = 'Css Variables';
  const element = componentsData.components.find(item => item.tag === tag);
  return element.styles.reduce((acc, style) => {
    const { name, docs } = style;
    const isColor = name.includes('color');
    let defaultValue = docs.substring(docs.indexOf('Default'), docs.length);
    defaultValue = defaultValue.replace('Default:', '').trim();
  
    if (isColor) {
      return `${acc} \n ${name}: ${color(name, defaultValue, knobsGroupId)};`;
    } else if (!defaultValue.includes('\\')) {
      return `${acc} \n ${name}: ${text(name, defaultValue, knobsGroupId)};`;
    }
    return acc;
  }, '');
}