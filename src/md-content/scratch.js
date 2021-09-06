promise.then(
  (result) => alert(result), // doesn't run
  (error) => alert(error) // shows error message after 1 second
);

promise
.then((result) => {
  alert(result);
})
.catch((error) => {
  alert(error);
})
