const url = require('url');

const users = {
  name: {
    name: 'name',
    age: '1',
  },
};

const qs = require('querystring');
// function to send a json object
const respondJSON = (request, response, status, object) => {
  // set status code and content type (application/json)
  response.writeHead(status, {
    'Content-Type': 'application/json',
  });
  // stringify the object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  response.write(JSON.stringify(object));
  // Send the response to the client
  response.end();
};

const getUsers = (request, response) => {
  let post = '';
  request.on('data', (chunk) => {
    post += chunk;
  });
  request.on('end', () => {
    post = qs.parse(post);
    if (post.field === '/getUsers') {
      if (post.method === 'get') {
        const responseJSON = {
          users,
        };

        respondJSON(request, response, 200, responseJSON);
      } else {
        const responseJSON = {

        };

        respondJSON(request, response, 200, responseJSON);
      }
    } else {
      const responseJSON = {

      };
      respondJSON(request, response, 404, responseJSON);
    }
  });
  // response.redirect('127.0.0.1:3000');
};

const addUser = (request, response) => {
  let post = '';
  request.on('data', (chunk) => {
    post += chunk;
  });
  request.on('end', () => {
    post = qs.parse(post);
    if (post.name === '' && post.age === '') {
      const responseJSON = {
        message: 'Name and age are both required.',
        id: 'addUserMissingParams',
      };
      // send our json with a success status code
      console.log('haha');
      respondJSON(request, response, 400, responseJSON);
    } else {
      let include = false;
      console.log(users);
      console.log(users[post.name]);
      if (users[post.name] !== undefined) {
        include = true;
      }
      if (include === true) {
        const responseJSON = {

        };
        respondJSON(request, response, 204, responseJSON);
      } else {
        const user = {
          name: post.name,
          age: post.age,
        };
        const {
          name,
        } = post;
        users[name] = user;
        // users.user = user;
        const responseJSON = {
          message: 'Create Successfully',
          title: 'Created',
        };
        console.log(users);
        respondJSON(request, response, 201, responseJSON);
      }
    }
  });
};

module.exports = {
  getUsers,
  addUser,
};
