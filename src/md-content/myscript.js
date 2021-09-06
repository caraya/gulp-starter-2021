/** eslint ecmaVersion: 6 */
// Insert an h2 element into the page
const content = document.documentElement.childNodes[2];

const header = document.createElement('h2');

header.innerHTML = 'This was inserted';

content.insertAdjacentElement('afterbegin', header);
