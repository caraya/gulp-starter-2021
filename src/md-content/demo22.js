fetch(
  'https://i0.wp.com/rivendellweb.net/blog/wp-content/uploads/2017/12/afs.png?w=730&ssl=1'
)
  .then(response => {
    if (response.ok) {
      return response.blob();
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .then(myBlob => {
    let objectURL = URL.createObjectURL(myBlob);
    let myImage = document.createElement('img');
    myImage.src = objectURL;
    document.body.appendChild(myImage);
  })
  .catch(error => {
    console.log(
      'There has been a problem with your fetch operation: ',
      error.message
    );
  });
