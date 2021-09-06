import axios from "axios";

// const rootURL = "http://rivendellweb.local";

/**
Axios toolkit for WordPress REST API

As I'm learning the deep workings of the WordPress REST API I'm also learning
how to use Axios as a replacement for Fetch. 

Fetch works just fine but Axios provides that extra sugar that, in my opinion makes it a better tool to work with.
*/

const myAxios = axios.create({
  baseURL: "http://rivendellweb.local",
  headers: {
    Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
  },
});

console.log(myAxios);
/**
@name getJWT
@description posts to the token generation endpoint to retrieve a JWT token and store it in session storage

In a production environment I would probably hide the username and password in environment variables or otherwise make them invisible to the script for security reasons. 

Once the token is creataed it's stored in session storage to make it easier  to retrieve when using it to authenticate other API calls we make. Because we're using JWT, you have to authenticate all API calls. It's tedious but it's safer
*/
async function getJWT() {
  await axios
    .post("/wp-json/jwt-auth/v1/token", {
      username: "carlos",
      password: "wcb1aP01!@",
    })
    .then((res) => {
      console.log("credentials: ", res.data.token);
      if (sessionStorage.getItem("jwt_token") === null) {
        sessionStorage.setItem("jwt_token", res.data.token);
      } else {
        sessionStorage.removeItem("jwt_token");
        sessionStorage.setItem("jwt_token");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

/**
@name getRoot
@description Return the root of the site's API. It is useful to research what routes the API offers, either natively or via plugins. 

These ar enot the routes we'll use in the rest of the code below, but could be used when working with these tools either inside WordPress or in a third-party tool
*/
async function getRoot() {
  await myAxios
    .get("/wp-json/")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

async function getIndex() {
  await axios
    .get("/wp-json/wp/v2/", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

async function getPageCount() {
  await axios
    .head("/wp-json/wp/v2/posts/", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
      },
    })
    .then((res) => {
      // console.log(res.headers);
      let totalPosts = res.headers["x-wp-total"];
      let totalPages = res.headers["x-wp-totalpages"];

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
    .get("/wp-json/wp/v2/types/", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getTypeBySlug(slugName = "wp_block") {
  let singleType = `/wp-json/wp/v2/types/${slugName}`;

  await axios
    .get(singleType, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getPosts(numberOfPosts = 10) {
  await axios
    .get("/wp-json/wp/v2/posts/", {
      params: {
        per_page: numberOfPosts,
      },
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
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
    .get("/wp-json/wp/v2/posts/", {
      params: {
        id: postID,
      },
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getPostBySlug(slugName = "post-from-rest-api-2") {
  await axios
    .get("/wp-json/wp/v2/posts/", {
      params: {
        slug: slugName,
      },
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
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
    .get("/wp-json/wp/v2/pages/", {
      params: {
        per_page: numberOfPages,
      },
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getPageByID(pageID) {
  let singlePage = `/wp-json/wp/v2/pages/${pageID}`;
  await axios
    .get(singlePage, {
      params: {
        id: pageID,
      },
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getPageBySlug(slugName = "sample-page") {
  await axios
    .get("/wp-json/wp/v2/pages/", {
      params: {
        slug: slugName,
      },
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt_token"),
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
    .put("wp-json/wp/v2/posts", {
      id: postID,
      title: "Yes Another playful title",
    })
    .then((res) => {
      console.log(res.data);
    });
}

getJWT();
