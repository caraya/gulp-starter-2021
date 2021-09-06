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
var defaultLang = 'en';
var currentLang = `userData.${defaultLang}`;

var h1Elem = `<h1>
                ${currentLang.chapter} 73
              </h1>`;

document.body.insertAdjacentHTML('afterbegin', h1Elem);
