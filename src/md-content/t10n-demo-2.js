/**
 * @name i18n
 * @description Create localized strings
 * @param {String} template
 * @returns {string}
 */
function i18n(template) {
  for (var
    info = i18n.db[i18n.locale][template.join('\x01')],
    out = [info.t[0]],
    i = 1, length = info.t.length; i < length; i++
  ) out[i] = arguments[1 + info.v[i - 1]] + info.t[i];
  return out.join('');
}
i18n.locale = 'en';
i18n.db = {};

i18n.set = locale => (tCurrent, ...rCurrent) => {
  const key = tCurrent.join('\x01');
  let db = i18n.db[locale] || (i18n.db[locale] = {});
  db[key] = {
    t: tCurrent.slice(),
    v: rCurrent.map((value, i) => i)
  };
  const config = {
    for: other => (tOther, ...rOther) => {
      db = i18n.db[other] || (i18n.db[other] = {});
      db[key] = {
        t: tOther.slice(),
        v: rOther.map((value, i) => rCurrent.indexOf(value))
      };
      return config;
    }
  };
  return config;
};

i18n.set('en') `Hello ${'name'}`
  .for('de') `Hallo ${'name'}`
  .for('it') `Ciao ${'name'}`
  .for('sp') `Hola ${'name'}`;

// default
i18n`Hello ${'World'}`;
// "Hello World"

// we switch to German
i18n.locale = 'de';
// but we still write in English
i18n`Hello ${'World'}`;
// "Hallo World"

i18n.locale = 'it';
i18n`Hello ${'World'}`;
// Ciao World

i18n.locale = 'sp';
i18n`Hello ${'World'}`;
// Hola World
