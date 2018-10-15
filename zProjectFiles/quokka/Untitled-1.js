const fetch = require('node-fetch');

async function fetchCatAvatars(userId) {
  const response = await fetch(
    `http://catappapi.herokuapp.com/users/${userId}`
  );
  const user = await response.json();

  return await Promise.all(
    user.cats.map(async function(catId) {
      const response = await fetch(
        `http://catappapi.herokuapp.com/cats/${catId}`
      );
      const catData = await response.json();
      return catData.imageUrl;
    })
  );
}

const result = fetchCatAvatars(123);
result;
