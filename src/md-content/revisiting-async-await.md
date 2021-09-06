# Revisting async/await (again)

```js
async function asyncFetchGithubData(user) {
  const response = await fetch('`https://api.github.com/users/${user}`');

  const body = await response.json();

  console.log(body);
}
```

<https://www.javascriptjanuary.com/blog/an-introduction-to-async-await>
