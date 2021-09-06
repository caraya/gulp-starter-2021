var userData = {
  en: {
    chapter: 'Chapter',
    section: 'Section'
  },
  es: {
    chapter: 'Capítulo',
    section: 'Sección'
  }
};

/**
 * @name createElement
 * @param {string} elem
 * @param {string} lang
 * @param {string} content
 * @returns
 */
function createElement(root, lang, content) {
  var chapterContent = `${root}.${lang}.${content}`;
  return chapterContent;
}

console.log(createElement('userData', 'en', 'chapter'));
