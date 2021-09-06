import axios from 'axios';

const access_token = sessionStorage.getItem('jwt_token');

const myAxios = axios.create({
  baseURL: 'http://rivendellweb.local',
  headers: {
    Authorization: `'Bearer ${access_token}';`,
  },
});

async function getJWT() {
  await axios
    .post('https://rivendellweb.local/wp-json/jwt-auth/v1/token', {
      username: 'username',
      password: 'password',
    })
    .then((res) => {
      console.log('Credentials: ', res.data);
      if (sessionStorage.getItem('jwt_token') === null) {
        sessionStorage.setItem('jwt_token', res.data.token);
      } else {
        sessionStorage.removeItem('jwt_token');
        sessionStorage.setItem('jwt_token');
      }
    })
    .catch((err) => {
      console.error(err.message);
    });
}

async function getRoot() {
  await myAxios
    .get('/wp-json/')
    .then((res) => {
      if (rest.status !== 200) {
        console.log('There was a problem completing your request');
      }
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

async function getIndex() {
  await axios
    .get('/wp-json/wp/v2/', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token'),
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

async function getPostCount() {
  await axios
    .head('/wp-json/wp/v2/posts/', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token'),
      },
    })
    .then((res) => {
      // console.log(res.headers);
      let totalPosts = res.headers['x-wp-total'];
      let totalPages = res.headers['x-wp-totalpages'];

      console.log(
        `there are ${totalPosts} posts divided in ${totalPages} pages`
      );
    })
    .catch((err) => {
      console.error(err);
    });
}

async function getTypes() {
  await axios
    .get('/wp-json/wp/v2/types/', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token'),
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getTypeBySlug(slugName = 'wp_block') {
  let singleType = `/wp-json/wp/v2/types/${slugName}`;

  await axios
    .get(singleType, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token'),
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getPosts(numberOfPosts = 10, page = 1) {
  await axios
    .get('/wp-json/wp/v2/posts/', {
      params: {
        per_page: numberOfPosts,
        page: page,
      },
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token'),
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getPostByID(postID) {
  await axios
    .get('/wp-json/wp/v2/posts/', {
      params: {
        id: postID,
      },
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token'),
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getPostBySlug(slugName = 'post-from-rest-api-2') {
  await axios
    .get('/wp-json/wp/v2/posts/', {
      params: {
        slug: slugName,
      },
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token'),
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getPages(numberOfPages = 10) {
  await axios
    .get('/wp-json/wp/v2/pages/', {
      params: {
        per_page: numberOfPages,
      },
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt_token'),
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function updatePost(postID = 790620) {
  await axios
    .put('wp-json/wp/v2/posts', {
      id: postID,
      title: 'Yes Another playful title',
    })
    .then((res) => {
      console.log(res.data);
    });
}

getJWT();
