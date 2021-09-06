// Menu Builder

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

fetch('menu-data.json')
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
    //console.log(data);
    // This is the data from JSON
    let projects = data.projects; // Get the results
    // Map uses the function on each member of the array
    return projects.map(function(project) {
      // capture the menu element
      let menu = document.getElementById('menu-container');
      // create the li element
      let li = createNode('li');
      // add class attribute
      li.setAttribute('class', 'menu-item-link');
      // create the anchor
      let anchor = createNode('a');
      // assing the href attribute  to the link
      anchor.href = `${project.url}`;
      // define the content for the li element
      let liContent = `${project.name}`;
      // add the content to the
      anchor.innerHTML = liContent;
      // append the anchor to the li element
      append(li, anchor);
      // append the li element to the menu
      append(menu, li);
      // //console log the li element to check it worked
      //console.log(li);
    })
  })
  .catch(error => {
    //console.log('there was a problem: ', error);
});
